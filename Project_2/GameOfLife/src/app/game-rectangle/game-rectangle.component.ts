import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { AliveCell } from '../alive-cell';
import * as d3 from 'd3';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'game-rectangle',
  templateUrl: './game-rectangle.component.html',
  styleUrls: ['./game-rectangle.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameRectangleComponent implements OnInit {
  private _aliveCellsSubject: Subject<AliveCell[]> = new Subject<AliveCell[]>();

  constructor() {
  }

  ngOnInit() {
    this.drawRectangle();
  }

  private drawRectangle(): void {
    let projection: any = d3.geoOrthographic();
    let path: any = d3.geoPath().projection(projection);
    let sphereElement: any = d3.select('game-rectangle');
    let points: any[] = this.points;
    let hexsPoints: any[] = [];

    sphereElement.append('svg')
      .attr('class', 'game-rectangle--rectangle');

    let svg: any = d3.select('svg');

    for (let i = 0; i < points.length; i += 1) {
      hexsPoints.push(this.getHexPolygon(points[i]));
    }

    svg.append('g')
      .attr('class', 'game-rectangle--rectangle-polygons')
      .selectAll('path')
      .data(hexsPoints)
      .enter()
      .append('path')
      .attr("d", (p) => {
        return this.getHexSvgPath(p);
      })

    if (document.querySelector('.game-rectangle--rectangle-polygons') != null) {
      document.querySelector('.game-rectangle--rectangle-polygons').addEventListener('click', this.onSelectCell);
    }
  }

  private get points(): any[] {
    let points: any[] = [];

    for (let i = 20; i <= 500; i += 30) {
      if ((i / 10) % 2 == 0) {
        for (let j = 20; j < 1100; j += 30) {
          let point: any = { x: j, y: i };
          points.push(point);
        }
      } else {
        let d = 0;
        for (let j = 35; j < 1100; j += 30) {
          let point: any = { x: j, y: i };
          points.push(point);
        }
      }
    }
    return points;
  }

  private getHexPolygon(centerPoint): any {
    let hexSideLenght: number = 19;
    let normalLineLenght: number = Math.sqrt(3) * (18 / 2);

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

  private getHexSvgPath(poligon): string {
    let firstPointCoordinateX: number = poligon.coordinates[0][0][0];
    let firstPointCoordinateY: number = poligon.coordinates[0][0][1];

    let secondPointCoordinateX: number = poligon.coordinates[0][1][0];
    let secondPointCoordinateY: number = poligon.coordinates[0][1][1];

    let thirdPointCoordinateX: number = poligon.coordinates[0][2][0];
    let thirdPointCoordinateY: number = poligon.coordinates[0][2][1];

    let fourthPointCoordinateX: number = poligon.coordinates[0][3][0];
    let fourthPointCoordinateY: number = poligon.coordinates[0][3][1];

    let fifthPointCoordinateX: number = poligon.coordinates[0][4][0];
    let fifthPointCoordinateY: number = poligon.coordinates[0][4][1];

    let sixthPointCoordinateX: number = poligon.coordinates[0][5][0];
    let sixthPointCoordinateY: number = poligon.coordinates[0][5][1];
    let pathString: string = `M${firstPointCoordinateX} ${firstPointCoordinateY} L${secondPointCoordinateX} ${secondPointCoordinateY} L${thirdPointCoordinateX} ${thirdPointCoordinateY} L${fourthPointCoordinateX} ${fourthPointCoordinateY} L${fifthPointCoordinateX} ${fifthPointCoordinateY} L${sixthPointCoordinateX} ${sixthPointCoordinateY} Z`;
    return pathString;
  }

  private onSelectCell(event): void {
    let cell: any = event.target;
    let poligons: Element = document.querySelector('.game-rectangle--rectangle-polygons');
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
    let selectCellNumber: any = svgPathElements.findIndex(p => {
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
        if (coordinateX == 0.5 && coordinateY == 5 || coordinateX == 35.5 && coordinateY == 5) {
        }
        let aliveCell: AliveCell = new AliveCell(coordinateX, coordinateY);
        aliveCells.push(aliveCell);
      }
    }
    this._aliveCellsSubject.next(aliveCells);
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
      let numberPathElement = aliveCell.coordinateY * ROW_HEX_COUNT + Math.floor(aliveCell.coordinateX);
      let pathElement = svgPathElements[numberPathElement];

      pathElement.style.fill = 'black';
    }
  }
}
