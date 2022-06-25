import { Point } from './../model/Point';
export interface IShape{
    generate:()=>any;
    isWithinElement:(c: Point) => boolean;
    moveElement:(c:Point)=>this;

    getPoint1:()=>Point;
    getPoint2:()=>Point;
    setOffsetX:(offSetX:number)=>void;
    setOffsetY:(offSetY:number)=>void;
};