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

  public isSphere: boolean = true;
  public isView: boolean = false;

  constructor() {

  }

  ngOnInit() {
    this._gameOfLife.aliveCellsObservable.subscribe(aliveCells => {
      this._aliveCells = aliveCells;
    });

    this._gameSphere.aliveCell.subscribe((nextGenerationAliveCells) => {
      this._nextGenerationAliveCells = nextGenerationAliveCells;
    });

    this.isView = this.getIsView();
  }

  private getIsView(): boolean {
    if (document.documentElement.clientWidth < 600) {
      return false;
    } else {
      return true;
    }
  }

  public checkIsView(event): void {
    let width: number = event.target.innerWidth;
    if (width < 600) {
      this.isView = false;
    } else {
      this.isView = true;
    }
  }

  public gameStep(): void {
    this._gameSphere.gameStep();
    this._gameRectangle.gameStep();
    this._gameOfLife.nextGenerationAliveCells = this._nextGenerationAliveCells;
    this._gameOfLife.gameStep();
    this._gameRectangle.drawAliveCells(this._aliveCells);
    this._gameSphere.drawAliveCells(this._aliveCells);
  }

  public gameRun(): void {
    this._isRun = true;
    let work = d3.interval(() => {
      if (this._isRun === false) {
        work.stop();
      }
      this.gameStep();
    }, 1000);
  }

  public switchShape(): void {
    this.isSphere = !this.isSphere;

    this._gameSphere.gameStep();
    this._gameRectangle.gameStep();
    this._gameOfLife.nextGenerationAliveCells = this._nextGenerationAliveCells;
    this._gameOfLife.checkAliveCells();
  }

  public gameStop(): void {
    this._isRun = false;
  }
}
