import Square from './Square';

const Board = (props) => {

    let {squares,onClick,winningSquares} = props
    
    const isWinSqr = (i) => {
        return winningSquares.includes(i) ? true : false

    }

    const renderSquare = (i) => {
        return(
            <Square key={i} value={squares[i]}
            onClick={() => {onClick(i)}}
            isWinSqr={isWinSqr(i)}
            />
        )
    }

    const renderRow = (offset) => {
        let row = []
        for (let i = offset; i <= offset + 2; i++) {
            row = row.concat([renderSquare(i)])
        }
        return (<div className="board-row" >{row}</div>);
    }
    
    const renderBoard = () => {
        let board = []
        for (let i = 0;i<7;i+=3) {
            board = board.concat([<div key={i} >{renderRow(i)}</div>])
        }
        return board
    }

    return (
        <div>
            {renderBoard()}
        </div>
    );

}

export default Board

