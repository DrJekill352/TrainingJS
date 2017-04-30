export class AliveCell {
  private _coordinateX: number;
  private _coordinateY: number;

  constructor(coordinateX: number, coordinateY: number){
    this._coordinateX = coordinateX;
    this._coordinateY = coordinateY;
  }
  
  public get coordinateX():number{
    return this._coordinateX;
  }
  
  public get coordinateY():number{
    return this._coordinateY;
  }
}
