import React, { useEffect, useMemo, useState } from 'react';
import { Shape } from '../model/Shape';
type ShapesProviderContextType = {
    shapes:Shape[];
    setShapes:React.Dispatch<React.SetStateAction<Shape[]>> | null
}
export const ShapesDataProviderContext = React.createContext<ShapesProviderContextType>({
    shapes:[],
    setShapes:null
})
export const ShapesDataProvider = (props:{children: React.ReactNode}) => {

  const [shapes , setShapes] = useState<Shape[]>([]);

  
  useEffect(()=>{

    const fetchShapes = async()=>{
      const response = await fetch("http://localhost:3000/shapes");
      const data = await response.json();
      setShapes(data);
    }
    fetchShapes();

  },[])

  const shapesDataContext = useMemo(()=>({shapes , setShapes}),[shapes, setShapes])

  return (
    <ShapesDataProviderContext.Provider value = {shapesDataContext}>
        {props.children}
    </ShapesDataProviderContext.Provider>
  )
}