import { getPoint } from './../components/WhiteBoard/WhiteBoardUtils';
import { Point } from './../model/Point';
import { AbstractShape } from "./AbstractShape";

export class Rectangle extends AbstractShape {

  constructor(x1: number, x2: number, y1: number, y2: number, generator: any) {
    super(x1, x2, y1, y2, generator);
  }
  public generate = () => {
    return this.generator.rectangle(this.x1, this.y1, this.x2 -this.x1, this.y2 - this.y1);
  };


  public isWithinElement = (point:Point)=>{
    const minX = Math.min(this.x1, this.x2);
    const maxX = Math.max(this.x1, this.x2);
    const minY = Math.min(this.y1, this.y2);
    const maxY = Math.max(this.y1, this.y2);
    return point.x > minX && point.x < maxX && point.y > minY && point.y < maxY;
  }

  public moveElement = (movePoint:Point)=>{
    const point2 = getPoint(movePoint.x +(this.x2  - this.x1),this.y2 + Math.round(movePoint.y - this.y1));

    this.setX1(movePoint.x);
    this.setY1(movePoint.y);
    this.setX2(point2.x);
    this.setY2(point2.y);

    // this.generate();

    return this;
  }
}
