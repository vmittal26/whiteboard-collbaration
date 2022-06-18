import { useContext, useEffect, useState } from 'react';
import rough from 'roughjs/bundled/rough.esm';
import styled from 'styled-components/macro';
import { ShapeEnum } from '../../constants/ShapeEnum';
import { ShapeInfoProviderContext } from '../../provider/ShapeInfoProvider';

export const CanvasWrapper = styled.canvas`
  width:100%;
  height:100%;
  padding:0 0.2rem;

`
export interface ElementData{
  x1:number;
  y1:number;
  x2:number;
  y2:number;
  element:any;
}
const generator = rough.generator();

export const WhiteBoard = () => {
  const { shapeName } = useContext(ShapeInfoProviderContext);
  const [elements , setElements]  = useState<ElementData[]>([]);
  const [drawing , setDrawing] = useState(false);
  const createElement = (x1:number  , y1:number , x2:number, y2:number , shape:string)=>{
    switch(shape){
      case ShapeEnum.Line:{
        const element = generator.line(x1 , y1 , x2 , y2);
        // generator.fillRect(x1 , y1 , x2 , y2);
        return {x1 , y1 , x2, y2 , element}
      }

      case ShapeEnum.Rectangle:{
        const element = generator.rectangle(x1 , y1 , x2-x1 , y2-y1);
        return {x1 , y1 , x2, y2 , element};
      }
    }
    
  }

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

  useEffect(() => {
   
    
  },[]);

  const onMouseMove = (event:React.MouseEvent<HTMLCanvasElement>)=>{
    if(!drawing){
      return;
    }

    if(elements.length > 0){
      const {x1 , y1} = elements[elements.length -1];
      const newElementData = createElement(x1 , y1 ,event.clientX , event.clientY ,shapeName);
      if(newElementData!=null){
       const newElementsData = elements.map((elementData, index)=>{
         if(index === elements.length - 1){
          return newElementData;
         }else{
          return elementData
         }
       });
       setElements(newElementsData)
      }
    }
   
  }

  const onMouseDown = (event:React.MouseEvent<HTMLCanvasElement>)=>{
    setDrawing(true);
    const newElementData = createElement(event.clientX , event.clientY ,event.clientX , event.clientY, shapeName);
    if(newElementData !=null){
      setElements((prevElements:ElementData[])=>[...prevElements , newElementData ])
    }
  }
  const onMouseUp = (_event:React.MouseEvent<HTMLCanvasElement>)=>{
    setDrawing(false);

  }
  
  return (
    <CanvasWrapper
      id="canvas"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      width={window.innerWidth}
      height={window.innerHeight}
    ></CanvasWrapper>
  );
}
