import { Point } from './../model/Point';
import { ShapesType } from './../constants/ShapeEnum';
import { IShape } from './../shapes-impl/IShape';
import { Rectangle } from '../shapes-impl/Rectangle';
import { ShapeEnum } from "../constants/ShapeEnum";
import { Line } from '../shapes-impl/Line';


export type ShapesMetaData= {
    [Property in ShapesType]?: IShape;
};

export const getShapesToImplMapper = (point1:Point,point2:Point, generator: any):ShapesMetaData=>{

    const shapesToImplMapper = {
        [ShapeEnum.Rectangle]:new Rectangle(point1.x, point2.x, point1.y, point2.y, generator),
        [ShapeEnum.Line]:new Line(point1.x, point2.x, point1.y, point2.y, generator)
    }


    return shapesToImplMapper;

}