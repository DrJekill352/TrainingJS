import {Cell} from './cell'

export class GameField {

  private _cells: Cell[] = [];

  constructor() {
    this.initField();
    this.searchAdjacentCells();
  }

  public get cells(): Cell[] {
    return this._cells;
  }

  public set cells(cells:Cell[]){
    this._cells = cells;
  }

  private initField() {
    for (let i = 0; i <= 18; i++) {
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
    const maxCoordinateX: number = 36;
    const minCoordinateX: number = 0;
    const maxCoordinateY: number = 18;
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

      if (coordinateX === maxCoordinateX) {
        fifthAdjacentCellCoordinateX = betweenCellsHalfDistance;
        secondAdjacentCellCoordinateX = betweenCellsHalfDistance;
        thirdAdjacentCellCoordinateX = betweenCellsHalfDistance;
      }

      if (coordinateX === minCoordinateX) {
        fourthAdjacentCellCoordinateX = maxCoordinateX - betweenCellsHalfDistance;
        fifthAdjacentCellCoordinateX = maxCoordinateX - betweenCellsDistance;
        sixthAdjacentCellCoordinateX = maxCoordinateX - betweenCellsHalfDistance;
      }

      if (coordinateY === maxCoordinateY) {
        firstAdjacentCellCoordinateY = minCoordinateY;
        sixthAdjacentCellCoordinateY = minCoordinateY;

        firstAdjacentCellCoordinateX = coordinateX + betweenCellsDistance;
        sixthAdjacentCellCoordinateX = coordinateX - betweenCellsDistance;

        if (coordinateX === maxCoordinateX) {
          firstAdjacentCellCoordinateX = minCoordinateX + betweenCellsDistance;
        }

        if (coordinateX === minCoordinateX) {
          sixthAdjacentCellCoordinateX = maxCoordinateX - betweenCellsDistance;
        }
      }

      if (coordinateY === minCoordinateY) {
        thirdAdjacentCellCoordinateY = maxCoordinateY;
        fourthAdjacentCellCoordinateY = maxCoordinateY;

        thirdAdjacentCellCoordinateX = coordinateX + betweenCellsDistance;
        fourthAdjacentCellCoordinateX = coordinateX - betweenCellsDistance;

        if (coordinateX === maxCoordinateX) {
          thirdAdjacentCellCoordinateX = minCoordinateX + betweenCellsDistance;
        }

        if (coordinateX === minCoordinateX) {
          fourthAdjacentCellCoordinateX = maxCoordinateX - betweenCellsDistance;
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

  public toggleCellLiveState(coordinateX: number, coordinateY: number): void {
    let selectCell: Cell = this._cells.find(c => c.coordinateX === coordinateX && c.coordinateY === coordinateY);
    if (selectCell == undefined) {
      throw new Error(); //TODO придумать текст ошибки
    } else {
      selectCell.toggleLiveState();
    }
  }
}
