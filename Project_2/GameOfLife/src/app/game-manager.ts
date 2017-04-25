import {Cell} from './cell'

export class GameManager {
  constructor() {
  }

  public getModifiedField(cells: Cell[]): Cell[] {
    for (let index = 0; index < cells.length; index++) {
      if (cells[index].isAlive === true) {
        let isAlive = this.checkAliveCell(cells[index]);
        if (isAlive === false) {
          cells[index].changeLiveState();
        }
      } else {
        let isBorn = this.checkDeadCell(cells[index]);
        if (isBorn === true) {
          cells[index].changeLiveState();
        }
      }
    }
    return cells;
  }

  private checkDeadCell(cell: Cell): boolean {
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

  private checkAliveCell(cell: Cell): boolean {
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
