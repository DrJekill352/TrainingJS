import {Cell} from './cell';
import {GameField} from './game-field';

export class GameOfLife {

  private _field: GameField = new GameField();

  constructor() {
  }

  public get fieldCells(): Cell[] {
    return this._field.cells;
  }

  public checkUpdateField(): void {
    setInterval(() => {
      this._field.cells = this.updateCells(this._field.cells);
    }, 100);
  }

  private updateCells(cells: Cell[]): Cell[] {
    for (let index = 0; index < cells.length; index++) {
      if (cells[index].isAlive === true) {
        let isAlive = this.isDieCell(cells[index]);
        if (isAlive === false) {
          cells[index].toggleLiveState();
        }
      } else {
        let isBorn = this.isBornCell(cells[index]);
        if (isBorn === true) {
          cells[index].toggleLiveState();
        }
      }
    }
    return cells;
  }

  private isBornCell(cell: Cell): boolean {
    let adjacentCells: Cell[] = cell.adjacentCells;
    let countAliveCells: number = 0;

    for (let index = 0; index < adjacentCells.length; index++) {
      if (adjacentCells[index].isAlive == true) {
        countAliveCells++;
      }
    }

    if (countAliveCells === 3) {
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

    if (countAliveCells < 2 && countAliveCells > 3) {
      return false;
    } else {
      return true;
    }
  }
}
