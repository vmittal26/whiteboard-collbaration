import { IShape } from './../../shapes-impl/IShape';
import { ShapeEnum } from "../../constants/ShapeEnum";
import { Point } from "../../model/Point";
import { getShapesToImplMapper } from "../../shapes-metadata/ShapesMetadata";
import { ElementData } from "./../../model/ElementsData";
import { v4 as uuid } from "uuid";

export const createElement = (
  point1: Point,
  point2: Point,
  shapeEnum: ShapeEnum,
  generator: any
): ElementData | null => {
  const shapesImplMetaData = getShapesToImplMapper(point1, point2, generator);

  if (shapeEnum != null) {
    const shapeImpl = shapesImplMetaData[shapeEnum];
    const element = shapeImpl?.generate();
    return { id: uuid(), point1, point2, element, shapeEnum, shapeImpl };
  } else {
    return null;
  }
};
export const getNewElementsOnDraw = (
  shape: string,
  point1: Point,
  point2: Point,
  shapeEnum: ShapeEnum,
  generator: any,
  elements: ElementData[]
) => {
  if (shape === shapeEnum) {
    const newElementData = createElement(point1, point2, shapeEnum, generator);
    if (newElementData != null) {
      const newElementsData = elements.map((elementData, index) => {
        if (index === elements.length - 1) {
          return newElementData;
        } else {
          return elementData;
        }
      });
      return newElementsData;
    }
  }
};

export const findElementData = (
    elementsData: ElementData[],
    point: Point,
  ) => {
    return elementsData?.find(elementData=> elementData?.shapeImpl?.isWithinElement(point));
  };

export const findElementDataForPoint = (
  elementData: ElementData,
  point: Point
) => {
  return elementData?.shapeImpl?.isWithinElement(point);
};
export const updatElementPositionAndReturnElements = (
  movePoint: Point,
  elementData:ElementData[],
  movingElement: ElementData,
  generator:any
): ElementData[] => {
  const newElementsData = elementData.map((elementData) => {
    if (elementData.id === movingElement.id) {
        const newElement = elementData.shapeImpl!.moveElement(movePoint);
        const shapesImplMetaData = getShapesToImplMapper(newElement.getPoint1(), newElement.getPoint2(), generator);
        const shapeImpl = shapesImplMetaData[elementData.shapeEnum];
        const element = shapeImpl?.generate();
        return { ...elementData, element};
    } else {
      return elementData;
    }
  });
  return newElementsData;
};

export const getPoint = (x: number, y: number) => ({ x, y });
