import { Point } from './../model/Point';
import { IShape } from "./IShape";

export abstract class AbstractShape implements IShape{

    protected x1:number = 0;
    protected x2:number = 0;
    protected y1:number = 0;
    protected y2:number = 0;
    protected generator:any;

    constructor(x1:number, x2: number , y1:number , y2:number,generator:any){
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
        this.generator = generator;
    }
    abstract generate: () => any;
    abstract isWithinElement:(c: Point)=>boolean;
    abstract moveElement:(c:Point)=>this;
    
    public getPoint1 = ()=> ({ x: this.x1, y:this.y1});
    public getPoint2 = ()=> ({ x: this.x2, y:this.y2});

    public setX1 = (x1:number)=>{
        this.x1 =x1;
    }

    public getX1 = ()=>{
        return this.x1;
    }

    public setY1 = (y1:number)=>{
        this.y1 =y1;
    }

    public getY1 = ()=>{
        return this.y1;
    }

    public setX2 = (x2:number)=>{
        this.x2 =x2;
    }

    public getX2 = ()=>{
        return this.x2;
    }
    public setY2 = (y2:number)=>{
        this.y2 =y2;
    }

    public getY2 = ()=>{
        return this.y2;
    }

    public getGenerator =()=>{
        return this.generator;
    }
    
}