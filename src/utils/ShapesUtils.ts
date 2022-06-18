import { Point } from "../model/Point";

export const distance = (a:Point, b:Point) => Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));