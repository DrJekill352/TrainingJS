import {Component, ViewEncapsulation} from '@angular/core';
import {GameOfLife} from './game-of-life';
import {GameSphereComponent} from './game-sphere/game-sphere.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  private _gameOfLife:GameOfLife = new GameOfLife();
  private _gameSphere: GameSphereComponent = new GameSphereComponent();

  constructor(){
  }

  public gameStep(){
    this._gameOfLife.updateCells();
  }
}
