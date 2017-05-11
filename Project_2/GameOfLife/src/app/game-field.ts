import {Cell} from './cell'

export class GameField {

  private _cells: Cell[] = [];

  constructor() {
    this.initField();
    this.searchAdjacentCells();
  }

  private initField() {
    for (let i = 0; i <= 16; i++) {
      if (i % 2 == 0) {
        for (let j = 0; j < 36; j++) {
          let cell = new Cell(j, i);
          this._cells.push(cell);
        }
      } else {
        for (let j = 0.5; j < 36; j++) {
          let cell = new Cell(j, i);
          this._cells.push(cell);
        }
      }
    }
  }

  private searchAdjacentCells() {
    const betweenCellsDistance: number = 1;
    const betweenCellsHalfDistance: number = 0.5;
    const maxACoordinateX: number = 35;
    const maxBCoordinateX: number = 35.5;
    const minACoordinateX: number = 0;
    const minBCoordinateX: number = 0.5;
    const maxCoordinateY: number = 16;
    const minCoordinateY: number = 0;

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

      if (coordinateX === maxACoordinateX || coordinateX === maxBCoordinateX) {

        if (coordinateX === maxACoordinateX) {
          firstAdjacentCellCoordinateX = maxBCoordinateX;
          secondAdjacentCellCoordinateX = minACoordinateX;
          thirdAdjacentCellCoordinateX = maxBCoordinateX;
        } else {
          firstAdjacentCellCoordinateX = minACoordinateX;
          secondAdjacentCellCoordinateX = minBCoordinateX;
          thirdAdjacentCellCoordinateX = minACoordinateX;
        }
      }

      if (coordinateX === minACoordinateX || coordinateX === minBCoordinateX) {
        if (coordinateX === minACoordinateX) {
          fourthAdjacentCellCoordinateX = maxBCoordinateX;
          fifthAdjacentCellCoordinateX = maxACoordinateX;
          sixthAdjacentCellCoordinateX = maxBCoordinateX;
        } else {
          fourthAdjacentCellCoordinateX = minACoordinateX;
          fifthAdjacentCellCoordinateX = maxBCoordinateX;
          sixthAdjacentCellCoordinateX = minACoordinateX;
        }
      }

      if (coordinateY === maxCoordinateY) {
        firstAdjacentCellCoordinateY = minCoordinateY;
        sixthAdjacentCellCoordinateY = minCoordinateY;

        firstAdjacentCellCoordinateX = coordinateX + betweenCellsDistance;
        sixthAdjacentCellCoordinateX = coordinateX - betweenCellsDistance;

        if (coordinateX === maxACoordinateX) {
          firstAdjacentCellCoordinateX = minACoordinateX + betweenCellsDistance;
        }

        if (coordinateX === minACoordinateX) {
          sixthAdjacentCellCoordinateX = maxACoordinateX - betweenCellsDistance;
        }
      }

      if (coordinateY === minCoordinateY) {
        thirdAdjacentCellCoordinateY = maxCoordinateY;
        fourthAdjacentCellCoordinateY = maxCoordinateY;

        thirdAdjacentCellCoordinateX = coordinateX + betweenCellsDistance;
        fourthAdjacentCellCoordinateX = coordinateX - betweenCellsDistance;

        if (coordinateX === maxACoordinateX) {
          thirdAdjacentCellCoordinateX = minACoordinateX + betweenCellsDistance;
        }

        if (coordinateX === minACoordinateX) {
          fourthAdjacentCellCoordinateX = maxACoordinateX - betweenCellsDistance;
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

      this._cells[i].addAdjacentCell(firstAdjacentCell);
      this._cells[i].addAdjacentCell(secondAdjacentCell);
      this._cells[i].addAdjacentCell(thirdAdjacentCell);
      this._cells[i].addAdjacentCell(fourthAdjacentCell);
      this._cells[i].addAdjacentCell(fifthAdjacentCell);
      this._cells[i].addAdjacentCell(sixthAdjacentCell);
    }
  }

  public get cells(): Cell[] {
    return this._cells;
  }

  public set cells(cells: Cell[]) {
    this._cells = cells;
  }

  public toggleCellLiveState(coordinateX: number, coordinateY: number): void {
    let selectCell: Cell = this._cells.find(c => c.coordinateX === coordinateX && c.coordinateY === coordinateY);
    if (selectCell == undefined) {
      throw new Error("Value not find");
    } else {
      selectCell.toggleLiveState();
    }
  }
}
