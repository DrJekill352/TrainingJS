import {Cell} from './cell';
import {GameField} from './game-field';
import {AliveCell} from './alive-cell';
import {Observable, Subject} from 'rxjs';

export class GameOfLife {
  private _field: GameField = new GameField();
  private _aliveCellsSubject: Subject<AliveCell[]> = new Subject<AliveCell[]>();

  constructor() {
  }

  public get aliveCellsObservable(): Observable<AliveCell[]> {
    return this._aliveCellsSubject;
  }

  private updateAliveCells(cells: Cell[]): void {
    let aliveCells: AliveCell[] = [];

    for (let cell of cells) {
      if (cell.isAlive) {
        let aliveCell: AliveCell = new AliveCell(cell.coordinateX, cell.coordinateY);
        aliveCells.push(aliveCell);
      }
    }
    debugger;
    this._aliveCellsSubject.next(aliveCells);
  }

  public updateCells(): void {
    debugger;
    let cell: Cell[] = this._field.cells;
    for (let index = 0; index < cell.length; index++) {
      if (cell[index].isAlive === true) {
        let isAlive = this.isDieCell(cell[index]);
        if (isAlive === false) {
          cell[index].toggleLiveState();
        }
      } else {
        let isBorn = this.isBornCell(cell[index]);
        if (isBorn === true) {
          cell[index].toggleLiveState();
        }
      }
    }
    this.updateAliveCells(cell);
  }

  public toggleCellLiveState(coordinateX: number, coordinateY: number): void {
    let cell: Cell = this._field.cells.find(c => c.coordinateX === coordinateX && c.coordinateY === coordinateY);
    cell.toggleLiveState();
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
}
