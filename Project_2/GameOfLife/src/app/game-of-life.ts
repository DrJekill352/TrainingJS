import {Cell} from './cell';
import {GameField} from './game-field';
import {AliveCell} from './alive-cell';
import {Observable, Subject} from 'rxjs';

export class GameOfLife {
  private _field: GameField = new GameField();
  private _aliveCellsSubject: Subject<AliveCell[]> = new Subject<AliveCell[]>();

  constructor() {
  }

  private updateAliveCells(cells: Cell[]): void {
    let aliveCells: AliveCell[] = [];

    for (let cell of cells) {
      if (cell.isAlive) {
        let aliveCell: AliveCell = new AliveCell(cell.coordinateX, cell.coordinateY);
        aliveCells.push(aliveCell);
      }
    }
    this._aliveCellsSubject.next(aliveCells);
  }

  private isBornCell(cell: Cell): boolean {
    let adjacentCells: Cell[] = cell.adjacentCells;
    let countAliveCells: number = 0;

    for (let index = 0; index < adjacentCells.length; index++) {
      if (adjacentCells[index].isAlive == true) {
        countAliveCells++;
      }
    }


    if (countAliveCells === 2) {
      return true;
    } else {
      return false;
    }
  }

  private isDieCell(cell: Cell): boolean {
    let adjacentCells: Cell[] = cell.adjacentCells;
    let countAliveCells: number = 0;

    for (let index = 0; index < adjacentCells.length; index++) {
      if (adjacentCells[index].isAlive == true) {
        countAliveCells++;
      }
    }

    if (countAliveCells !== 2) {
      return false;
    } else {
      return true;
    }
  }

  public updateCells(): void {
    let cells: Cell[] = this._field.cells;
    let updateCellsNumber: number[] = [];
    for (let index = 0; index < cells.length; index++) {

      if (cells[index].isAlive === false) {
        let isBorn = this.isBornCell(cells[index]);
        if (isBorn === true) {
          updateCellsNumber.push(index);
        }
      } else {
        let isDie = this.isDieCell(cells[index]);
        if (isDie === true) {
          updateCellsNumber.push(index);
        }
      }
    }

    for (let index = 0; index < updateCellsNumber.length; index++) {
      cells[updateCellsNumber[index]].toggleLiveState();
    }

    this._field.cells = cells;
    this.updateAliveCells(cells);
  }

  public toggleCellLiveState(coordinateX: number, coordinateY: number): void {
    let cell: Cell = this._field.cells.find(c => c.coordinateX === coordinateX && c.coordinateY === coordinateY);
    cell.toggleLiveState();
  }

  public get aliveCellsObservable(): Observable<AliveCell[]> {
    return this._aliveCellsSubject;
  }

}
