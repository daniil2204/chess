import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';

import BoardComponent from './components/boardComponent';

import './App.css'
import { Board } from './modules/board';
import { Player } from './modules/player';
import { Colors } from './modules/colors';
import StartPage from './components/startPage';
import LostFigures from './components/lostFigures';
import Timer from './components/timer';



const App = () => {

  const[board,setBoard] = useState<Board>(new Board())
  const[whitePlayer,setWhitePlayer] = useState(new Player(Colors.WHITE)) 
  const[blackPlayer,setBlackPlayer] = useState(new Player(Colors.BLACK)) 
  const[currentPlayer,setCurrentPlayer] = useState<Player | null>(null);
  const[gameTime,setGameTime] = useState<number>(300);
  const[gameStart,setGameStart] = useState(false);
  const[gameOver,setGameOver] = useState(false);



  useEffect(() => {
    const time = localStorage.getItem('gameTime') !== null ? localStorage.getItem('gameTime') : null;
    if (typeof time === 'string') {
      setGameTime(+time);
    }
    restart();
    setCurrentPlayer(whitePlayer);
  },[])


  if (gameOver) {
    restart();
    setGameOver(false);
  }

  function restart() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
    setCurrentPlayer(whitePlayer);
  }
  function swapPlayer() {
    setCurrentPlayer(currentPlayer?.color !== Colors.WHITE ? whitePlayer : blackPlayer);
  }

  return (
    <Router>
        <Routes>
          <Route path='/' element={
            <div className='app'>
              <StartPage 
                setGameTime={setGameTime}/>
            </div>}/>
          <Route path='/chess' element={
            <div className='app'>
            <Timer 
              currentPlayer={currentPlayer}
              restart={restart}
              time={gameTime}
              setStartGame={setGameStart}
              gameStart={gameStart}/>
            <BoardComponent 
              board={board} 
              setBoard={setBoard}
              currentPlayer={currentPlayer}
              swapPlayer={swapPlayer}
              gameStart={gameStart}/>
              <div>
                <LostFigures 
                    title="White Figure"
                    figures={board.lostWhiteFigures}
                    setGameOver={setGameOver}
                    setStartGame={setGameStart}/>
                <LostFigures 
                  title="Black Figure"
                  figures={board.lostBlackFigures}
                  setGameOver={setGameOver}
                  setStartGame={setGameStart}/>
              </div>
            </div>
          }/>
        </Routes>
    </Router>
  );
};

export default App;
