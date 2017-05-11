import { Component, ViewEncapsulation, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AliveCell } from '../alive-cell';

import * as d3 from 'd3';
import { Observable, Subject } from 'rxjs/Rx';

@Component({
  selector: 'game-sphere',
  templateUrl: './game-sphere.component.html',
  styleUrls: ['./game-sphere.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameSphereComponent implements OnInit {
  private _aliveCellsSubject: Subject<AliveCell[]> = new Subject<AliveCell[]>();
  private _isMove: boolean = false;
  private _elapsed: number = 0;
  private _direction: Direction = Direction.RIGHT;

  constructor() {
  }

  ngOnInit() {
    this.drawSphere();
  }

  private drawSphere(): void {
    let projection: any = d3.geoOrthographic();
    let path: any = d3.geoPath().projection(projection);
    let sphereElement: any = d3.select('.game-sphere--sphere');
    let points: any[] = this.points;
    let hexsPoints: any[] = [];

    sphereElement.append('svg')
      .attr('class', 'sphere');

    let svg: any = d3.select('svg');

    for (let i = 0; i < points.length; i += 1) {
      hexsPoints.push(this.getHexPolygon(points[i]));
    }

    svg.append('path')
      .attr('class', 'sphere--sphere')
      .datum({ type: 'Sphere' })
      .attr('d', path);

    svg.append('g')
      .attr('class', 'sphere--sphere-polygons')
      .selectAll('path')
      .data(hexsPoints)
      .enter()
      .append('path')
      .attr('d', path);

    if (document.querySelector('.sphere--sphere-polygons') != null) {
      document.querySelector('.sphere--sphere-polygons').addEventListener('click', this.onSelectCell);
    }
  }

  private getHexPolygon(centerPoint): any {
    let hexSideLenght: number = 6.4;
    let normalLineLenght: number = Math.sqrt(3) * (6 / 2);

    var point1: number[] = [centerPoint.x + normalLineLenght, centerPoint.y + (hexSideLenght / 2)];

    var point2: number[] = [centerPoint.x + normalLineLenght, centerPoint.y - (hexSideLenght / 2)];

    var point3: number[] = [centerPoint.x, centerPoint.y - hexSideLenght];

    var point4: number[] = [centerPoint.x - normalLineLenght, centerPoint.y - (hexSideLenght / 2)];

    var point5: number[] = [centerPoint.x - normalLineLenght, centerPoint.y + (hexSideLenght / 2)];

    var point6: number[] = [centerPoint.x, centerPoint.y + hexSideLenght];

    return {
      type: 'Polygon',
      coordinates: [[point6, point1, point2, point3, point4, point5, point6]]
    }
  }

  private get points(): any[] {
    let points: any[] = [];

    for (let i = -80; i <= 80; i += 10) {
      if ((i / 10) % 2 == 0) {
        for (let j = 0; j < 360; j += 10) {
          let point: any = { x: j, y: i };
          points.push(point);
        }
      } else {
        let d = 0;
        for (let j = 5; j < 360; j += 10) {
          let point: any = { x: j, y: i };
          points.push(point);
        }
      }
    }
    return points;
  }

  private onSelectCell(event): void {
    let cell: any = event.target;
    let poligons: Element = document.querySelector('.sphere--sphere-polygons');
    let svg: any = d3.select('svg');

    if (cell != poligons) {
      if (cell.style.fill === 'black') {
        cell.style.fill = 'white';
      } else {
        cell.style.fill = 'black';
      }
    }

    let svgGElement: any = svg.select('g');
    let svgPathElements: any[] = svgGElement.selectAll('path').nodes();

    let selectCellNumber: number = svgPathElements.findIndex(p => {
      if (p == cell) {
        return true;
      }
    });
  }

  private updateAliveCells(): void {
    let svg: any = d3.select('svg');
    let svgGElement: any = svg.select('g');
    let svgPathElements: any[] = svgGElement.selectAll('path').nodes();
    const ROW_HEX_COUNT: number = 36;
    let aliveCells: AliveCell[] = [];

    for (let i = 0; i < svgPathElements.length; i++) {
      if (svgPathElements[i].style.fill === 'black') {
        let coordinateY: number = 0;
        for (let index = 0; index <= i; index += ROW_HEX_COUNT) {
          coordinateY++;
        }
        let magicNumber: number = coordinateY * ROW_HEX_COUNT;
        let coordinateX = i - magicNumber + ROW_HEX_COUNT;
        if (coordinateX < 0) {
          coordinateX += ROW_HEX_COUNT;
        }
        coordinateY--;

        if (coordinateY % 2 == 1) {
          coordinateX += 0.5;
        }

        let aliveCell: AliveCell = new AliveCell(coordinateX, coordinateY);
        aliveCells.push(aliveCell);
      }
    }
    this._aliveCellsSubject.next(aliveCells);
  }

  public runMoveSphere(): void {
    this._isMove = true;
    let svg: any = d3.select('svg');
    let projection: any = d3.geoOrthographic();
    let path: any = d3.geoPath().projection(projection);

    let move: any = d3.interval((elapsed) => {
      if (this._isMove == false) {
        move.stop();
      }
      projection.rotate([this._elapsed / 150, 0]);
      svg.selectAll('path')
        .attr('d', path);
      if (this._direction === Direction.RIGHT) {
        this._elapsed += 50;
      } else {
        this._elapsed -= 50;
      }
    }, 50);
  }

  public stopMoveSphere(): void {
    this._isMove = false;
  }

  public reverseMoveSphere(): void {
    if (this._direction === Direction.RIGHT) {
      this._direction = Direction.LEFT;
    } else {
      this._direction = Direction.RIGHT;
    }
  }

  public get aliveCell(): Observable<AliveCell[]> {
    return this._aliveCellsSubject;
  }

  public gameStep(): void {
    this.updateAliveCells();
    this.clearSphereField();
  }

  public clearSphereField(): void {
    let svg: any = d3.select('svg');
    let svgGElement: any = svg.select('g');
    let svgPathElements: any[] = svgGElement.selectAll('path').nodes();

    for (let i = 0; i < svgPathElements.length; i++) {
      svgPathElements[i].style.fill = 'white';
    }
  }

  public drawAliveCells(aliveCells: AliveCell[]): void {
    let svg: any = d3.select('svg');
    let svgGElement: any = svg.select('g');
    let svgPathElements: any[] = svgGElement.selectAll('path').nodes();
    const ROW_HEX_COUNT: number = 36;

    for (let aliveCell of aliveCells) {
      let numberPathElement: number = aliveCell.coordinateY * ROW_HEX_COUNT + Math.floor(aliveCell.coordinateX);
      let pathElement: any = svgPathElements[numberPathElement];

      pathElement.style.fill = 'black';
    }
  }
}

enum Direction {
  LEFT,
  RIGHT
}
