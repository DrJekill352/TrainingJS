export class Cell {
  private _coordinateX: number;
  private _coordinateY: number;
  private _isAlive: boolean = false;

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

  public changeLiveState() {
    this._isAlive = !this._isAlive;
  }
}
