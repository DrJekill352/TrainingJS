import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {GameOfLife} from './game-of-life';
import {GameSphereComponent} from './game-sphere/game-sphere.component';
import {AliveCell} from './alive-cell'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private _gameOfLife: GameOfLife = new GameOfLife();
  private _gameSphere: GameSphereComponent = new GameSphereComponent();

  private _newAliveCells: any = null;
  private _aliveCells: AliveCell[] = [];

  constructor() {
  }

  ngOnInit() {
    debugger;
    this._gameOfLife.aliveCellsObservable.subscribe(aliveCells => {
      this._aliveCells = aliveCells;
    });

    this._gameSphere.aliveCellCoordinate().subscribe((newAliveCells) => {
      this._newAliveCells = newAliveCells;
    });
  }

  public gameStep() {
    console.log(this._aliveCells);
    console.log(this._newAliveCells);

    this.updateCellsUpdateStatus();
    this._gameOfLife.updateCells();
    this._gameSphere.updateSphereCell();
  }

  public get aliveCells(): AliveCell[] {
    return this._aliveCells;
  }

  private updateCellsUpdateStatus(): void {
    let bornCells: AliveCell[] = this._newAliveCells.fill(x => {
      let bornCell = this._aliveCells.find(cell => cell.coordinateX == x.coordinateX &&
      cell.coordinateY == x.coordinateY);
      if (bornCell !== undefined) {
        return true;
      }
    });
    for (let bornCell of bornCells) {
      this._gameOfLife.toggleCellLiveState(bornCell.coordinateX, bornCell.coordinateY);
    }

    let deadCells: AliveCell[] = this._aliveCells.filter(x => {
      let deadCell: AliveCell = this._newAliveCells.find(cell => {
        cell.coordinateX == x.coordinateX && cell.coordinateY == x.coordinateY
      });
      if (deadCell === undefined) {
        return true;
      }
    });
    for (let deadCell of deadCells) {
      this._gameOfLife.toggleCellLiveState(deadCell.coordinateX, deadCell.coordinateY);
    }
  }
}
