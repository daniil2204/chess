import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Colors } from "../modules/colors";
import { Player } from "../modules/player";

interface TimerProps{
    currentPlayer:Player | null;
    restart:() => void;
    time:number;
    gameStart:boolean
    setStartGame: (gameStart:boolean) => void;
}

const Timer = ({currentPlayer,restart,time,setStartGame,gameStart} : TimerProps) => {
    const[whiteTime,setWhiteTime] = useState(time);
    const[blackTime,setBlackTime] = useState(time);
    const timer = useRef<null | ReturnType<typeof setInterval>>()

    useEffect(() => {
        if (gameStart) {
            startTimer();
        }else{
            handlerStop();
            setWhiteTime(time);
            setBlackTime(time);
        }
    },[currentPlayer,gameStart])

    if (whiteTime === 0) {
        alert('Player black win')
        setWhiteTime(time);
        setBlackTime(time);
        restart();
    }
    if (blackTime === 0) {
        alert('Player white win')
        setWhiteTime(time);
        setBlackTime(time);
        restart();
    }

    function startTimer() {
        if (timer.current) {
            clearInterval(timer.current)
        }
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer;
        timer.current = setInterval(callback,1000);
    }

    function decrementWhiteTimer() {
        setWhiteTime(whiteTime => whiteTime - 1);
    }

    function decrementBlackTimer() {
        setBlackTime(blackTime => blackTime - 1);
    }

    const handlerRestart = () => {
        setWhiteTime(time);
        setBlackTime(time);
        restart();
    }

    const handlerStart = () => {
        setStartGame(true)
    }

    const handlerStop = () => {
        setStartGame(false)
        if (timer.current) {
            clearInterval(timer.current)
        }
    }

    return(
        <div>
            <div>
                <button className="button" style={{backgroundColor: "green",color:'white',margin:'10px'}} onClick={!gameStart ? handlerStart : handlerStop}>
                   {!gameStart ?
                   "Start Game":
                   "Stop Game"}
                </button>
                <button className="button" style={{backgroundColor: "green",color:'white',margin:'10px'}} onClick={handlerRestart}>
                    Restart
                </button>
            </div>
            <h2>White - {whiteTime}</h2>
            <h2>Black - {blackTime}</h2>
            <Link to='/'>
                <button className="button" style={{backgroundColor: "green",color:'white',margin:'10px'}}>Back to menu</button>
            </Link>
        </div>
    )
}

export default Timer;