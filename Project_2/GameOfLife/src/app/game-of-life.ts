  import {Cell} from './cell';
import {GameField} from './game-field';
import {AliveCell} from './alive-cell';
import {Observable, Subject} from 'rxjs';

export class GameOfLife {
  private _field: GameField = new GameField();
  private _aliveCellsSubject: Subject<AliveCell[]> = new Subject<AliveCell[]>();
  private _aliveCells: AliveCell[] = [];
  private _nextGenerationAliveCells: AliveCell[];

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
    this._aliveCells = aliveCells;
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

    if (countAliveCells === 2) {
      return false;
    } else {
      return true;
    }
  }

  private updateCells(nextGenerationAliveCells): void {
    let bornCells: AliveCell[] = nextGenerationAliveCells.filter(x => {
      let bornCell = this._aliveCells.find(cell => cell.coordinateX == x.coordinateX &&
      cell.coordinateY == x.coordinateY);
      if (bornCell === undefined) {
        return true;
      }
    });

    let deadCells: AliveCell[] = this._aliveCells.filter((x: AliveCell) => {
      let deadCell: boolean = nextGenerationAliveCells.find(cell => {
        cell.coordinateX == x.coordinateX && cell.coordinateY == x.coordinateY
      });
      if (deadCell !== undefined) {
        return true;
      }
    });
    if (bornCells) {
      for (let bornCell of bornCells) {
        if (bornCell.coordinateX == 0 && bornCell.coordinateY == 5 || bornCell.coordinateX == 35.5 && bornCell.coordinateY == 5) {
        }
        this._field.toggleCellLiveState(bornCell.coordinateX, bornCell.coordinateY);
      }
    }
    if (deadCells) {
      for (let deadCell of deadCells) {
        this._field.toggleCellLiveState(deadCell.coordinateX, deadCell.coordinateY);
      }
    }
  }


  public gameStep(): void {
    this.updateCells(this._nextGenerationAliveCells);

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

  public checkAliveCells():void{
    this.updateCells(this._nextGenerationAliveCells);
    let cells: Cell[] = this._field.cells;
    this.updateAliveCells(cells);
  }

  public set nextGenerationAliveCells(nextGenerationAliveCells) {
    this._nextGenerationAliveCells = nextGenerationAliveCells;
  }

  public get aliveCellsObservable(): Observable<AliveCell[]> {
    return this._aliveCellsSubject;
  }
}
