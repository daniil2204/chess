import { Cell } from "../cell"
import { Colors } from "../colors"
import { FigureNames, Figures } from "./figures"
import blackLogo from "../../assets/black-bishop.png"
import whiteLogo from "../../assets/white-bishop.png"

export class Bishop extends Figures{
    constructor(color:Colors,cell:Cell){
        super(color,cell);
        this.logo = color === Colors.WHITE ? whiteLogo : blackLogo;
        this.name = FigureNames.BISHOP; 
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target)) {
            return false;
        }
        if (!this.cell.isEmptyDiagonal(target)) {
            return false;
        }
        return true;
    }
}