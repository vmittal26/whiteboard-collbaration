import { Point } from "./../model/Point";
import { distance } from "../utils/ShapesUtils";
import { AbstractShape } from "./AbstractShape";

export class Line extends AbstractShape {
  public moveElement = (c: Point) => {


    return this;
  };
  constructor(x1: number, x2: number, y1: number, y2: number, generator: any) {
    super(x1, x2, y1, y2, generator);
  }
  public generate = () => {
    return this.generator.line(this.x1, this.y1, this.x2, this.y2);
  };

  public isWithinElement = (c: Point) => {
    const a = { x: this.x1, y: this.y1 };
    const b = { x: this.x2, y: this.y2 };
    const offset = distance(a, b) - (distance(a, c) + distance(b, c));
    return Math.abs(offset) < 1;
  };
}
