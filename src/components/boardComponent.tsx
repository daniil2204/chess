import React, { useEffect, useState } from "react";
import { Board } from "../modules/board";
import { Cell } from "../modules/cell";
import { Player } from "../modules/player";
import CellComponent from "./cellComponent";

interface BoardProps{
    board:Board;
    setBoard: (board:Board) => void;
    currentPlayer:Player | null;
    swapPlayer:() => void;
    gameStart:boolean;
}


const BoardComponent = ({board,setBoard,currentPlayer,swapPlayer,gameStart} : BoardProps) => {
    const[selectedCell,setSelectedCell] = useState<Cell | null>(null);

    useEffect(() => {
        highlightCells();
    },[selectedCell])

    const click = (cell:Cell) => {
        if (gameStart) {
            if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
                selectedCell.moveFigure(cell);
                swapPlayer();
                setSelectedCell(null);
            }else{
                if (cell.figure?.color === currentPlayer?.color) {
                    setSelectedCell(cell);
                }
            } 
        }      
    }

    const highlightCells = () => {
        board.highlightCells(selectedCell);
        updateBoard();
    }


    const updateBoard = () => {
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
    }


    return(
        <div>
            <h2>Current Player {currentPlayer?.color}</h2>
            <div className="board"> 
                {board.cells.map((row,index) => 
                    <React.Fragment key={index}>
                        {row.map(cell => 
                            <CellComponent 
                                click = {click}
                                cell={cell}
                                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                                key={cell.id}
                            
                            />
                        )}
                    </React.Fragment>
                )}
            </div>
        </div>
    )
}
export default BoardComponent;