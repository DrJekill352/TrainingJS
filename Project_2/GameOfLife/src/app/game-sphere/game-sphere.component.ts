import {Component, OnInit, ViewEncapsulation, Input} from '@angular/core';
import {AliveCell} from '../alive-cell';
import * as d3 from "d3";
import {Observable} from 'rxjs'

@Component({
  selector: 'app-game-sphere',
  templateUrl: './game-sphere.component.html',
  styleUrls: ['./game-sphere.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class GameSphereComponent implements OnInit {

  @Input('aliveCells') _aliveCells: AliveCell[];

  private _projection: any = d3.geoOrthographic();
  private _path: any = d3.geoPath().projection(this._projection);
  private _svg: any;

  private _selectCellCoordinateX: number;
  private _selectCellCoordinateY: number;

  constructor() {
    this.drawSphere();
    // this.moveSphere();
  }

  ngOnInit() {
  }

  private drawSphere() {
    let projection: any = d3.geoOrthographic();
    let path: any = d3.geoPath().projection(projection);

    let sphereElement: any = d3.select('app-game-sphere');
    sphereElement.append('svg')
      .attr('class', 'app-sphere');

    this._svg = d3.select('svg');

    let points: any[] = this.points;
    let hexsPoints: any[] = [];

    for (let i = 0; i < points.length; i += 1) {
      hexsPoints.push(this.getHexPoint(points[i]));
    }

    this._svg.append('path')
      .attr('class', 'app-sphere--sphere')
      .datum({type: "Sphere"})
      .attr('d', path);

    this._svg.append('g')
      .attr('class', 'polygons')
      .selectAll('path')
      .data(hexsPoints)
      .enter()
      .append('path')
      .attr('d', path);

    if (document.querySelector('.polygons') != null) {
      document.querySelector('.polygons').addEventListener('click', this.onSelectCell);
    }
  }

  private getHexPoint(centerPoint) {
    let hexSideLenght: number = 6.4;
    let normalLineLenght: number = Math.sqrt(3) * (6 / 2);

    var point1: number[] = [centerPoint.x + normalLineLenght, centerPoint.y + (hexSideLenght / 2)];

    var point2: number[] = [centerPoint.x + normalLineLenght, centerPoint.y - (hexSideLenght / 2)];

    var point3: number[] = [centerPoint.x, centerPoint.y - hexSideLenght];

    var point4: number[] = [centerPoint.x - normalLineLenght, centerPoint.y - (hexSideLenght / 2)];

    var point5: number[] = [centerPoint.x - normalLineLenght, centerPoint.y + (hexSideLenght / 2)];

    var point6: number[] = [centerPoint.x, centerPoint.y + hexSideLenght];

    return {
      type: "Polygon",
      coordinates: [[point6, point1, point2, point3, point4, point5, point6]]
    }
  }

  private get points(): any[] {
    let points: any[] = [];
    for (let i = -80; i <= 80; i += 10) {
      if ((i / 10) % 2 == 0) {
        for (let j = 0; j < 360; j += 10) {
          let point: any = {x: j, y: i};
          points.push(point);
        }
      } else {
        let d = 0;
        for (let j = 5; j < 360; j += 10) {
          let point: any = {x: j, y: i};
          points.push(point);
        }
      }
    }
    return points;
  }

  public moveSphere(): void {
    d3.interval((elapsed) => {
      this._projection.rotate([elapsed / 150, 0]);
      this._svg.selectAll('path')
        .attr('d', this._path);
    }, 20);
  }

  private onSelectCell(event) {
    let cell = event.target;
    let poligons = document.querySelector(".polygons");
    this._svg = d3.select('svg');

    if (cell != poligons) {
      if (cell.style.fill === "black") {
        cell.style.fill = "white";
      } else {
        cell.style.fill = "black";
      }
    }

    let svgGElement = this._svg.select('g');
    let svgPathElements = svgGElement.selectAll('path').nodes();
    let selectCellNumber = svgPathElements.findIndex(p => {
      if (p == cell) {
        return true;
      }
    });
    console.log(selectCellNumber);
    let coordinateX: number = 0;
    let ROW_HEX_COUNT: number = 36;
    for (let index = 0; index <= selectCellNumber; index += ROW_HEX_COUNT) {
      coordinateX++;
    }

    let magicNumber: number = coordinateX * ROW_HEX_COUNT;
    let coordinateY = selectCellNumber - magicNumber + ROW_HEX_COUNT;
    if (coordinateY < 0) {
      coordinateY += ROW_HEX_COUNT;
    }
    coordinateX--;

    this._selectCellCoordinateX = coordinateX;
    this._selectCellCoordinateY = coordinateY;
  }

  public getSelectCellCoordinate(): Observable<any>{
    if(this._selectCellCoordinateX || this._selectCellCoordinateY){//TODO add normal chack

    let selectCellCoordinate: any = {
      x: this._selectCellCoordinateX,
      y: this._selectCellCoordinateY
    };

    let selectCellCoordinateObservable: Observable<any> = Observable.of(selectCellCoordinate);
    return selectCellCoordinateObservable;

    }else{
      throw new Error(); //TODO add message
    }
  }
}
