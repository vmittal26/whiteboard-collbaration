import { useContext } from "react";
import styled from "styled-components/macro";
import { ShapeInfoProviderContext } from "../../provider/ShapeInfoProvider";
import { ShapesDataProviderContext } from "../../provider/ShapesDataProvider";

export const ImgStyled = styled.img<{isHighlighted:boolean}>`
  width: 1.2rem;
  background-color:${p => p.isHighlighted ?'gray':'white'};
  margin: auto;
  margin-bottom: 0.5rem;
  padding:0.2rem;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;

export const ImageWrapper = styled.div`
  background-color: white;
  border-radius: 0.2rem;
  padding: 0.2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const ToolBarWrapper = styled.div`
  
  background-color: #a9a9a999;
  height: 100%;
  width: 100%;
  padding: 0 0.2rem;
  text-align: center;
`;

export const ToolBar = () => {
  const { shapes } = useContext(ShapesDataProviderContext);
  const { shapeName , setShapeName } = useContext(ShapeInfoProviderContext);

  const onShapeClick  = (shapeName:string)=>{
    setShapeName?.(shapeName);
  }

  return (
    <ToolBarWrapper>
      <ImageWrapper>
        {shapes.map((shape) => (
          <ImgStyled  isHighlighted = {shape.name === shapeName}onClick ={()=>onShapeClick(shape.name)}key ={shape.id} src={`${shape.path}.svg`} alt={`${shape.name}`} />
        ))}
      </ImageWrapper>
    </ToolBarWrapper>
  );
};
