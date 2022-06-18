import React, { useMemo, useState } from 'react'
import { ShapeEnum } from '../constants/ShapeEnum';
type ShapesProviderContextType = {
    shapeName:string | null,
    setShapeName:React.Dispatch<React.SetStateAction<string | null>> | null; 
}
export const ShapeInfoProviderContext = React.createContext<ShapesProviderContextType>({
    shapeName:null,
    setShapeName:null
})
export const ShapeInfoProvider = (props:{children: React.ReactNode}) => {

  const [shapeName , setShapeName] = useState<string | null>(null);

  const shapeContext = useMemo(()=>({shapeName , setShapeName}),[shapeName, setShapeName])

  return (
    <ShapeInfoProviderContext.Provider value = {shapeContext}>
        {props.children}
    </ShapeInfoProviderContext.Provider>
  )
}
