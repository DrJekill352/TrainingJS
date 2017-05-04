import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {GameOfLife} from './game-of-life';
import {GameSphereComponent} from './game-sphere/game-sphere.component';
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

  private _nextGenerationAliveCells: AliveCell[] = [];
  private _aliveCells: AliveCell[] = [];

  private _isRun: boolean = false;

  constructor() {
  }

  ngOnInit() {
    this._gameOfLife.aliveCellsObservable.subscribe(aliveCells => {
      this._aliveCells = aliveCells;
    });

    this._gameSphere.aliveCell.subscribe((newAliveCells) => {
      this._nextGenerationAliveCells = newAliveCells;
    });
    this.gameStep();
  }


  public gameStep() {
    this._gameSphere.gameStep();
    this._gameOfLife.nextGenerationAliveCells = this._nextGenerationAliveCells;
    this._gameOfLife.gameStep();
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

  public gameStop() {
    this._isRun = false;
  }

  public runMoveSphere(): void {
    this._gameSphere.runMoveSphere();
  }

  public stopMoveSphere(): void {
    this._gameSphere.stopMoveSphere();
  }

  public reverseMoveSphere(): void {
    this._gameSphere.reverseMoveSphere();
  }
}
