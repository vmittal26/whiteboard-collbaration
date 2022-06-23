import { ElementData } from './ElementsData';
export interface Client{
    socketId:number;
    userName:string;
    elementsData?:ElementData[]

}