import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {GameOfLife} from './game-of-life';
import {GameSphereComponent} from './game-sphere/game-sphere.component';
import {AliveCell} from './alive-cell';
import * as d3 from "d3";

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
    this._gameOfLife.aliveCellsObservable.subscribe(aliveCells => {
      this._aliveCells = aliveCells;
    });

    this._gameSphere.aliveCell.subscribe((newAliveCells) => {
      this._newAliveCells = newAliveCells;
    });
  }

  public gameStep() {
    this._gameSphere.updateSphereCell();
    this.updateCellsUpdateStatus();
    this._gameOfLife.updateCells();
    this._gameSphere.drawAliveCells(this._aliveCells);
    console.log("ok")
  }

  public gameRun() {
    d3.interval((elapsed) => {
      this.gameStep();
    },1000);
  }

  public get aliveCells(): AliveCell[] {
    return this._aliveCells;
  }

  private updateCellsUpdateStatus(): void {

    let bornCells: AliveCell[] = this._newAliveCells.filter(x => {
      let bornCell = this._aliveCells.find(cell => cell.coordinateX == x.coordinateX &&
      cell.coordinateY == x.coordinateY);
      if (bornCell === undefined) {
        return true;
      }
    });

    let deadCells: AliveCell[] = this._aliveCells.filter(x => {
      let deadCell: AliveCell = this._newAliveCells.find(cell => {
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
        this._gameOfLife.toggleCellLiveState(bornCell.coordinateX, bornCell.coordinateY);
      }
    }
    if (deadCells) {
      for (let deadCell of deadCells) {
        this._gameOfLife.toggleCellLiveState(deadCell.coordinateX, deadCell.coordinateY);
      }
    }
  }
}
