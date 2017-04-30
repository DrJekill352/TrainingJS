export class Cell {
  private _coordinateX: number;
  private _coordinateY: number;
  private _isAlive: boolean = false;
  private _adjacentCells: Cell[] = [];

  constructor(coordinateX: number, coordinateY: number) {
    this._coordinateX = coordinateX;
    this._coordinateY = coordinateY;
  }

  public get coordinateX(): number {
    return this._coordinateX;
  }

  public get coordinateY(): number {
    return this._coordinateY;
  }

  public get isAlive(): boolean {
    return this._isAlive;
  }

  public toggleLiveState() {
    this._isAlive = !this._isAlive;
  }

  public addAdjacentCell(adjacentCell: Cell): void {
    if (this._adjacentCells.length >= 6) {
      throw new Error();//TODO add massege
    } else {
      this._adjacentCells.push(adjacentCell);
    }
  }

  public  get adjacentCells(): Cell[] {
    return this._adjacentCells;
  }
}

