import { useEffect } from "react";
import { Figures } from "../modules/figures/figures";
import { FigureNames } from "../modules/figures/figures";



interface LostFiguresProps{
    title:string;
    figures:Figures[];
    setGameOver: (gameOver:boolean) => void
    setStartGame: (gameStart:boolean) => void
}


const LostFigures = ({title,figures,setGameOver,setStartGame}:LostFiguresProps) => {
    useEffect(() => {
        figures.forEach(figure => {
            if (figure.name === FigureNames.KING) {
                setGameOver(true);
                setStartGame(false);
            }
        })
    },[figures.length])

    return (
        <div className="lost">
            <h3>{title}</h3>
            {figures.map(figure => 
                <div key={figure.id}>
                    {figure.name}
                    {figure.logo && <img width={20} height={20} src={figure.logo} alt="/"/>}
                </div>)}
        </div>
    )
}

export default LostFigures;