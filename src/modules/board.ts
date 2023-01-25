import { FigureNames } from "./figures/figures";

import { Cell } from "./cell";
import { Colors } from "./colors";
import { Bishop } from "./figures/bishop";
import { Figures } from "./figures/figures";
import { Knight } from "./figures/khight";
import { King } from "./figures/king";
import { Pawn } from "./figures/pawn";
import { Queen } from "./figures/queen";
import { Rook } from "./figures/rook";




export class Board {
    cells: Cell[][] = [];
    lostBlackFigures:Figures[] = [];
    lostWhiteFigures:Figures[] = [];

    public initCells() {
        for (let y = 0; y < 8; y++) {
            const row:Cell[] = [];
            for (let x = 0; x < 8; x++) {
                if ((y + x) % 2 !== 0) {
                    row.push(new Cell(this,x,y,Colors.BLACK,null));//Black
                }else{
                    row.push(new Cell(this,x,y,Colors.WHITE,null))//white
                }
            }
            this.cells.push(row);
        }
    }


    public highlightCells(selectedCell:Cell | null){
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i];
            for (let j = 0; j < row.length; j++) {
                const target = row[j];
                target.available = !!selectedCell?.figure?.canMove(target);
                if (target.available) {
                    if (target.figure?.name === FigureNames.KING) {
                        alert('Check and mate')
                    }
                }
            }
            
        }
    }

    public getCopyBoard():Board{
        const newBoard = new Board();
        newBoard.lostWhiteFigures = this.lostWhiteFigures;
        newBoard.lostBlackFigures = this.lostBlackFigures;
        newBoard.cells = this.cells;
        return newBoard;
    }

    private addPawns(){
        for (let i = 0; i < 8; i++) {
            new Pawn(Colors.BLACK,this.getCell(i,1)) 
            new Pawn(Colors.WHITE,this.getCell(i,6)) 
        }
    }

    private addKnigts(){
        new Knight(Colors.BLACK,this.getCell(1,0)) 
        new Knight(Colors.BLACK,this.getCell(6,0)) 
        new Knight(Colors.WHITE,this.getCell(1,7)) 
        new Knight(Colors.WHITE,this.getCell(6,7))
    }

    private addKings(){
        new King(Colors.BLACK,this.getCell(4,0)) 
        new King(Colors.WHITE,this.getCell(4,7)) 

    }

    private addBishops(){
        new Bishop(Colors.BLACK,this.getCell(2,0)) 
        new Bishop(Colors.BLACK,this.getCell(5,0)) 
        new Bishop(Colors.WHITE,this.getCell(2,7)) 
        new Bishop(Colors.WHITE,this.getCell(5,7))
    }

    private addQueen(){
        new Queen(Colors.BLACK,this.getCell(3,0)) 
        new Queen(Colors.WHITE,this.getCell(3,7)) 
    }

    private addRooks(){
        new Rook(Colors.BLACK,this.getCell(0,0)) 
        new Rook(Colors.BLACK,this.getCell(7,0)) 
        new Rook(Colors.WHITE,this.getCell(0,7)) 
        new Rook(Colors.WHITE,this.getCell(7,7))
    }

    public getCell(x: number, y:number){
        return this.cells[y][x]
    }

    public addFigures() {
        this.addPawns();
        this.addKnigts();
        this.addQueen();
        this.addKings();
        this.addBishops();
        this.addRooks();
    }
}
