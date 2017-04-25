import {Cell} from './cell'
import {isUndefined} from "util";

export class GameField {

  private _cells: Cell[] = [];

  constructor() {
    this.initField();
    this.searchAdjacentCells();
  }

  private initField() {
    for (let i = -80; i <= 80; i += 10) {
      if ((i / 10) % 2 == 0) {
        for (let j = 0; j <= 360; j += 10) {
          let cell = new Cell(j, i);
          this._cells.push(cell);
        }
      } else {
        for (let j = 5; j <= 360; j += 10) {
          let cell = new Cell(j, i);
          this._cells.push(cell);
        }
      }
    }
  }

  private searchAdjacentCells() {
    let betweenCellsDistance: number = 10;
    let betweenCellsHalfDistance: number = 5;

    for (let i = 0; i < this._cells.length; i++) {
      let coordinateX: number = this._cells[i].coordinateX;
      let coordinateY: number = this._cells[i].coordinateY;

      let firstAdjacentCell: Cell;
      let secondAdjacentCell: Cell;
      let thirdAdjacentCell: Cell;
      let fourthAdjacentCell: Cell;
      let fifthAdjacentCell: Cell;
      let sixthAdjacentCell: Cell;

      let firstAdjacentCellCoordinateX = coordinateX + betweenCellsHalfDistance;
      let firstAdjacentCellCoordinateY = coordinateY + betweenCellsDistance;

      let secondAdjacentCellCoordinateX = coordinateX + betweenCellsDistance;
      let secondAdjacentCellCoordinateY = coordinateY;

      let thirdAdjacentCellCoordinateX = coordinateX + betweenCellsHalfDistance;
      let thirdAdjacentCellCoordinateY = coordinateY - betweenCellsDistance;

      let fourthAdjacentCellCoordinateX = coordinateX - betweenCellsHalfDistance;
      let fourthAdjacentCellCoordinateY = coordinateY - betweenCellsDistance;

      let fifthAdjacentCellCoordinateX = coordinateX - betweenCellsDistance;
      let fifthAdjacentCellCoordinateY = coordinateY;

      let sixthAdjacentCellCoordinateX = coordinateX - betweenCellsHalfDistance;
      let sixthAdjacentCellCoordinateY = coordinateY + betweenCellsDistance;

      if (coordinateX === 360) {
        fifthAdjacentCellCoordinateX = betweenCellsHalfDistance;
        secondAdjacentCellCoordinateX = betweenCellsHalfDistance;
        thirdAdjacentCellCoordinateX = betweenCellsHalfDistance;
      }

      if (coordinateX === 0) {
        fourthAdjacentCellCoordinateX = 355;
        fifthAdjacentCellCoordinateX = 350;
        sixthAdjacentCellCoordinateX = 355;
      }

      if (coordinateY === 80) {
        firstAdjacentCellCoordinateY = -80;
        sixthAdjacentCellCoordinateY = -80;

        firstAdjacentCellCoordinateX = coordinateX + betweenCellsDistance;
        sixthAdjacentCellCoordinateX = coordinateX - betweenCellsDistance;

        if (coordinateX === 360) {
          firstAdjacentCellCoordinateX = 10;
        }

        if (coordinateX === 0) {
          sixthAdjacentCellCoordinateX = 350;
        }
      }

      if (coordinateY === -80) {
        thirdAdjacentCellCoordinateY = 80;
        fourthAdjacentCellCoordinateY = 80;

        thirdAdjacentCellCoordinateX = coordinateX + betweenCellsDistance;
        fourthAdjacentCellCoordinateX = coordinateX - betweenCellsDistance;

        if (coordinateX === 360) {
          thirdAdjacentCellCoordinateX = 10;
        }

        if (coordinateX === 0) {
          fourthAdjacentCellCoordinateX = 350;
        }
      }


      firstAdjacentCell = this._cells.find(c => c.coordinateX === firstAdjacentCellCoordinateX &&
      c.coordinateY === firstAdjacentCellCoordinateY);

      secondAdjacentCell = this._cells.find(c => c.coordinateX === secondAdjacentCellCoordinateX &&
      c.coordinateY === secondAdjacentCellCoordinateY);

      thirdAdjacentCell = this._cells.find(c => c.coordinateX === thirdAdjacentCellCoordinateX &&
      c.coordinateY === thirdAdjacentCellCoordinateY);

      fourthAdjacentCell = this._cells.find(c => c.coordinateX === fourthAdjacentCellCoordinateX &&
      c.coordinateY === fourthAdjacentCellCoordinateY);

      fifthAdjacentCell = this._cells.find(c => c.coordinateX === fifthAdjacentCellCoordinateX &&
      c.coordinateY === fifthAdjacentCellCoordinateY);

      sixthAdjacentCell = this._cells.find(c => c.coordinateX === sixthAdjacentCellCoordinateX &&
      c.coordinateY === sixthAdjacentCellCoordinateY);

      this._cells[i].addNewAdjacentCell(firstAdjacentCell);
      this._cells[i].addNewAdjacentCell(secondAdjacentCell);
      this._cells[i].addNewAdjacentCell(thirdAdjacentCell);
      this._cells[i].addNewAdjacentCell(fourthAdjacentCell);
      this._cells[i].addNewAdjacentCell(fifthAdjacentCell);
      this._cells[i].addNewAdjacentCell(sixthAdjacentCell);
    }
  }

  public get cells(): Cell[] {
    return this._cells;
  }

  public changeCell(coordinateX: number, coordinateY: number): void {
    let selectCell: Cell = this._cells.find(c => c.coordinateX === coordinateX && c.coordinateY === coordinateY);
    if (selectCell == null) { // TODO
      throw new Error(); //TODO
    } else {
      selectCell.changeLiveState();
    }
  }

  private checkChangeCells(): void {

  }
}
