export enum ShapeEnum{
    Circle="Circle",
    Rectangle= "Rectangle",
    Line = "Line",
    Square = "Square"
}

export type ShapesType = keyof typeof ShapeEnum;