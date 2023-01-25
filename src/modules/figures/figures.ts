import { Colors } from "../colors";
import logo from '../../assets/black-king.png'
import { Cell } from "../cell";


export enum FigureNames{
    FIGURE = "Figure",
    KING = "King",
    KNIGHT = "Knight",
    PAWN = "Pawn",
    QUEEN = "Queen",
    ROOK = "Rook",
    BISHOP = "Bishop",
}

export class Figures{
    color: Colors;
    logo: typeof logo | null;
    cell: Cell;
    name: FigureNames;
    id:number;


    constructor(color:Colors,cell:Cell){
        this.color = color;
        this.cell = cell;
        this.cell.figure = this;
        this.logo = null;
        this.name = FigureNames.FIGURE;
        this.id = Math.random();
    }



    canMove(target:Cell):boolean{
        if (target.figure?.color === this.color) {
            return false;
        }
        return true;
    }
    moveFigure(target:Cell){}
}