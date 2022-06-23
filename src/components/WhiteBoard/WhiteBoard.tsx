import { useContext, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import rough from 'roughjs/bundled/rough.esm';
import styled from 'styled-components/macro';
import { getShapeEnumForShape } from '../../constants/ShapeEnum';
import { ElementData } from '../../model/ElementsData';
import { ShapeInfoProviderContext } from '../../provider/ShapeInfoProvider';
import { createElement, findElementData, getNewElementsOnDraw, getPoint, updatElementPositionAndReturnElements } from './WhiteBoardUtils';
import { useGetSocket } from '../../hooks/useGetSocket';
import { ClientInfoProviderContext } from '../../provider/ClientInfoProvider';
import { IShape } from '../../shapes-impl/IShape';
export const CanvasWrapper = styled.canvas`
  width:100%;
  height:100%;
  padding:0 0.2rem;
`
const generator = rough.generator();
const socket = io("localhost:5000");

export const WhiteBoard = () => {

  const functionMap = useRef(new Map<string ,IShape>()).current;
  const {activeClients}= useContext(ClientInfoProviderContext);  
  
  const { shapeName , setShapeName} = useContext(ShapeInfoProviderContext);
  const [elementsData , setElementsData]  = useState<ElementData[]>([]);
  const [drawing , setDrawing]  = useState(false);
  const [moving , setMoving]= useState(false);
  const {clients, socket, userName , roomId} = useGetSocket(setElementsData);
  const [elementMoving , setMovingElement]= useState<ElementData | undefined>(undefined);


  const pushElementsToServer = (elementsData:ElementData[] | undefined, userName:string, roomId:string | undefined)=>{

    socket?.emit("on-newelements" , {  elementsData, userName , roomId});
  }

  useEffect(
    ()=>{
      const canvas  = document.getElementById("canvas") as HTMLCanvasElement;
      const context = canvas.getContext("2d");
      const roughCanvas = rough.canvas(canvas);
      context?.clearRect(0, 0 ,canvas.width, canvas.height );
      if(elementsData!=null && elementsData.length> 0 ){
        elementsData.forEach((elementData:ElementData)=> 
        
           {
            elementData.shapeImpl = functionMap.get(elementData.id);
            roughCanvas.draw(elementData.element)
           })
      }

    },
  [elementsData])

  const onMouseMove = (event:React.MouseEvent<HTMLCanvasElement>)=>{ 
    if(moving && elementMoving!=null){

      const movePoint = getPoint(event.clientX, event.clientY);
      const newElementsData = updatElementPositionAndReturnElements(movePoint,elementsData,elementMoving,generator);
      pushElementsToServer(newElementsData, userName, roomId);
     }

   if(drawing && shapeName!=null){
      if(elementsData.length > 0){
        const {point1} = elementsData[elementsData.length -1];
        const point2 = getPoint(event.clientX , event.clientY)
           const newElementsData =  getNewElementsOnDraw(shapeName,point1 , point2 , getShapeEnumForShape(shapeName) , generator, elementsData);
          pushElementsToServer(newElementsData, userName, roomId);
          }
         
   }
 
    }  

  const onMouseDown = (event:React.MouseEvent<HTMLCanvasElement>)=>{
    if(shapeName ==null ){

      const movePoint = getPoint(event.clientX, event.clientY);
      const newElementMoving= findElementData(elementsData, movePoint);
      setMovingElement(newElementMoving);
      setMoving(true);
      return;
    }

    const point1 = getPoint(event.clientX, event.clientY);
    const point2 = getPoint(event.clientX, event.clientY);
    const newElementData = createElement(point1 ,point2, getShapeEnumForShape(shapeName), generator);
    if(newElementData !=null){
      functionMap.set(newElementData?.id ,newElementData.shapeImpl!);
      const newElementsData = elementsData.concat(newElementData);
      setDrawing(true);
      setMovingElement(undefined);
      setMoving(false);
      pushElementsToServer(newElementsData, userName, roomId);
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
