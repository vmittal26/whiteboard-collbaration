export enum ShapeEnum{
    Circle="Circle",
    Rectangle= "Rectangle",
    Line = "Line",
    Square = "Square"
}

export type ShapesType = keyof typeof ShapeEnum;

export const getShapeEnumForShape = (shape:string)=>{

    switch(shape){
        case ShapeEnum.Circle:{
            return ShapeEnum.Circle
        }

        case ShapeEnum.Rectangle:{
            return ShapeEnum.Rectangle
        }

        case ShapeEnum.Line:{
            return ShapeEnum.Line
        }
        case ShapeEnum.Square:{
            return ShapeEnum.Square
        }

        default:
            throw new Error("Invalid shape")

    }
}