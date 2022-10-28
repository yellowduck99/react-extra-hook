import Board from'./Board';
import { useState } from 'react';


const Game = () => {

    let [history, setHistory] = useState([{
        squares:Array(9).fill(null),
        moves:''
    }])
    let [xIsNext, setXIsNext] = useState(true)
    let [stepNum, setStepNum] = useState(0)
    let [toggle, setToggle] = useState(true)

    const handleClick = (i) => {
        
        const myHistory = history.slice(0,stepNum+1)
        const current = myHistory[myHistory.length - 1]
        let squares = current.squares.slice()
        let winner = calculateWinner(squares)
        // if win or button alreay clicked
        if (winner.winner||squares[i]) {
            
            return
        }
        squares[i] = xIsNext ? 'X' : 'O'
        let move = getMoves(i)
        setHistory(myHistory.concat([{squares:squares,moves:move}]))
        setXIsNext(!xIsNext)
        setStepNum(myHistory.length)

    }

    const jumpTo = (step) => {
        setStepNum(step)
        setXIsNext((step % 2) === 0) 
    }

    const current = history[stepNum]
    const winner = calculateWinner(current.squares)
    const moves = history.map((step,move) => {
        const desc = move ? 'Go to move # ' + move +step.moves: 'Go to game start';
        return(
            <li key={move} >
                <button className={move === stepNum ? 'bold' : ''} 
                onClick={() => {jumpTo(move)}} >{desc}</button>
            </li>
        )
    })
    let status = stepNum >= 9 ? 'No one win' : winner.winner ? 'Winner: ' 
    + winner.winner : 'Next player: ' + (xIsNext? 'X':'O'); 



    return (
        <div className="game">
            <div className="game-board">
                <Board 
                    squares={current.squares}
                    onClick={(i) => {handleClick(i)}}
                    winningSquares={winner.winningSquares}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <button onClick={() => {setToggle(!toggle)}} >toggle</button>
                <ol>{toggle ? moves : moves.reverse()}</ol>
            </div>
        </div>
    );
}
  
export default Game

const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return ({
                winner:squares[a],
                winningSquares:lines[i]
            });
        }
    }
    return ({
        winner:null,
        winningSquares: []
    });
}

const getMoves = (i) => {
    const steps = [
        '(0,0)','(0,1)','(0,2)',
        '(1,0)','(1,1)','(1,2)',
        '(2,0)','(2,1)','(2,2)'
    ]
    return(steps[i])
}