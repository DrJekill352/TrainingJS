import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {GameOfLife} from './game-of-life';
import {GameSphereComponent} from './game-sphere/game-sphere.component';
import {GameRectangleComponent} from './game-rectangle/game-rectangle.component'
import {AliveCell} from './alive-cell';
import * as d3 from "d3";

@Component({
  selector: 'app-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  private _gameOfLife: GameOfLife = new GameOfLife();
  private _gameSphere: GameSphereComponent = new GameSphereComponent();
  private _gameRectangle: GameRectangleComponent = new GameRectangleComponent();

  private _nextGenerationAliveCells: AliveCell[] = [];
  private _aliveCells: AliveCell[] = [];

  private _isRun: boolean = false;
  private _isSphere: boolean = true;

  constructor() {
  }

  ngOnInit() {
    this._gameOfLife.aliveCellsObservable.subscribe(aliveCells => {
      this._aliveCells = aliveCells;
    });

    this._gameSphere.aliveCell.subscribe((nextGenerationAliveCells) => {
      this._nextGenerationAliveCells = nextGenerationAliveCells;
    });
  }


  public gameStep() {
    this._gameSphere.gameStep();
    this._gameRectangle.gameStep();
    this._gameOfLife.nextGenerationAliveCells = this._nextGenerationAliveCells;
    this._gameOfLife.gameStep();
    this._gameRectangle.drawAliveCells(this._aliveCells);
    this._gameSphere.drawAliveCells(this._aliveCells);
  }

  public gameRun() {
    this._isRun = true;
    let work = d3.interval(() => {
      if (this._isRun === false) {
        work.stop();
      }
      this.gameStep();
    }, 1000);
  }

  public switchShape() {
    this._isSphere = !this._isSphere;

    this._gameSphere.gameStep();
    this._gameRectangle.gameStep();
    this._gameOfLife.nextGenerationAliveCells = this._nextGenerationAliveCells;
    this._gameOfLife.checkAliveCells();
    this._gameRectangle.drawAliveCells(this._aliveCells);
    this._gameSphere.drawAliveCells(this._aliveCells);
  }

  public gameStop() {
    this._isRun = false;
  }

}
