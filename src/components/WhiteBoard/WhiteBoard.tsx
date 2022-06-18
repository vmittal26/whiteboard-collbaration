import { useContext, useEffect, useState } from 'react';
import rough from 'roughjs/bundled/rough.esm';
import styled from 'styled-components/macro';
import { getShapeEnumForShape } from '../../constants/ShapeEnum';
import { ElementData } from '../../model/ElementsData';
import { ShapeInfoProviderContext } from '../../provider/ShapeInfoProvider';
import { createElement, findElementData, getNewElementsOnDraw, getPoint, updatElementPositionAndReturnElements } from './WhiteBoardUtils';
export const CanvasWrapper = styled.canvas`
  width:100%;
  height:100%;
  padding:0 0.2rem;
`
const generator = rough.generator();

export const WhiteBoard = () => {

  const { shapeName , setShapeName} = useContext(ShapeInfoProviderContext);
  const [elements , setElements]  = useState<ElementData[]>([]);
  const [drawing , setDrawing]  = useState(false);
  const [moving , setMoving]= useState(false);

  const [elementMoving , setMovingElement]= useState<ElementData | undefined>(undefined);

  useEffect(
    ()=>{
      const canvas  = document.getElementById("canvas") as HTMLCanvasElement;
      const context = canvas.getContext("2d");
      const roughCanvas = rough.canvas(canvas);
      context?.clearRect(0, 0 ,canvas.width, canvas.height );
      if(elements.length> 0 ){
        elements.forEach(({element}:ElementData)=> roughCanvas.draw(element))
      }
    },
  [elements])

  const onMouseMove = (event:React.MouseEvent<HTMLCanvasElement>)=>{ 



    if(moving && elementMoving!=null){

      const movePoint = getPoint(event.clientX, event.clientY);
      const newElementsData = updatElementPositionAndReturnElements(movePoint,elements,elementMoving,generator);
      setElements(newElementsData ?? []);
     }

   if(drawing && shapeName!=null){
      if(elements.length > 0){
        const {point1} = elements[elements.length -1];
        const point2 = getPoint(event.clientX , event.clientY)
           const newElementsData =  getNewElementsOnDraw(shapeName,point1 , point2 , getShapeEnumForShape(shapeName) , generator, elements);
           setElements(newElementsData ?? []);
          }

   }
 
    }  

  const onMouseDown = (event:React.MouseEvent<HTMLCanvasElement>)=>{
    if(shapeName ==null ){

      const movePoint = getPoint(event.clientX, event.clientY);
      const newElementMoving= findElementData(elements, movePoint);
      setMovingElement(newElementMoving);
      setMoving(true);

      return;
    }

    const point1 = getPoint(event.clientX, event.clientY);
    const point2 = getPoint(event.clientX, event.clientY);
    const newElementData = createElement(point1 ,point2, getShapeEnumForShape(shapeName), generator);
    if(newElementData !=null){
      setElements((prevElements:ElementData[])=>[...prevElements , newElementData ]);
      setDrawing(true);
      setMovingElement(undefined);
      setMoving(false);
    }
  }
  const onMouseUp = (_event:React.MouseEvent<HTMLCanvasElement>)=>{
    setShapeName?.(null);// set selected shape to null
    setDrawing(false);
    setMovingElement(undefined);
;  }
  
  return (
    <CanvasWrapper
      id="canvas"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      width={window.innerWidth}
      height={window.innerHeight}
    >
    </CanvasWrapper>
  );
}
