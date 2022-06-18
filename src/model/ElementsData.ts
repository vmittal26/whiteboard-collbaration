import { Point } from './Point';
import { IShape } from './../shapes-impl/IShape';
import { ShapeEnum } from "../constants/ShapeEnum";

export interface ElementData{
    id:string;
    point1:Point;
    point2:Point;
    element:any;
    shapeEnum:ShapeEnum;
    shapeImpl?:IShape;
  }