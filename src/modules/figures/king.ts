import { Cell } from "../cell"
import { Colors } from "../colors"
import { FigureNames, Figures } from "./figures"
import blackLogo from "../../assets/black-king.png"
import whiteLogo from "../../assets/white-king.png"

export class King extends Figures{
    constructor(color:Colors,cell:Cell){
        super(color,cell);
        this.logo = color === Colors.WHITE ? whiteLogo : blackLogo;
        this.name = FigureNames.KING; 
    }

    canMove(target: Cell): boolean {

        const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1;

        if (!super.canMove(target)) {
            return false;
        }

       
        if((target.y === this.cell.y - 1 && target.x === this.cell.x) 
        || target.y === this.cell.y + 1 && target.x === this.cell.x){
            return true
        }

        if((target.x === this.cell.x - 1 && target.y === this.cell.y) 
        || target.x === this.cell.x + 1 && target.y === this.cell.y){
            return true
        }
        return false;
    }
}