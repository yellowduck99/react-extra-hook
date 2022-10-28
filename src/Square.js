const Square = (props) => {
    let {value, onClick,isWinSqr} = props
    let isWin = isWinSqr?'winSquare':''
    return (
        <button className={"square "+isWin}
            onClick={onClick}
        >
            { value }
        </button>
    );
}

export default Square

