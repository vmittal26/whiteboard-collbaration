import { getPoint } from './../components/WhiteBoard/WhiteBoardUtils';
import { Point } from './../model/Point';
import { AbstractShape } from "./AbstractShape";

export class Rectangle extends AbstractShape {

  constructor(x1: number, x2: number, y1: number, y2: number, generator: any) {
    super(x1, x2, y1, y2, generator);

    this.moveElement = this.moveElement;
    this.isWithinElement = this.isWithinElement;
  }
  public generate = () => {
    return this.generator.rectangle(this.x1, this.y1, this.x2 -this.x1, this.y2 - this.y1);
  };


  public isWithinElement = (point:Point)=>{
    const minX = Math.min(this.x1, this.x2);
    const maxX = Math.max(this.x1, this.x2);
    const minY = Math.min(this.y1, this.y2);
    const maxY = Math.max(this.y1, this.y2);
    const isPresent =  point.x > minX && point.x < maxX && point.y > minY && point.y < maxY;
   return isPresent;
  }

  public moveElement = (movePoint:Point)=>{
    const width = this.x2 - this.x1;
    const height = this.y2 - this.y1;

    const point1 = getPoint((movePoint.x - this.offSetX), (movePoint.y -this.offSetY));
    const point2 = getPoint((movePoint.x - this.offSetX) +(width), (movePoint.y -this.offSetY) + height)

    this.setX1(point1.x);
    this.setY1(point1.y);
    this.setX2(point2.x);
    this.setY2(point2.y);

    // this.generate();

    return this;
  }
}
