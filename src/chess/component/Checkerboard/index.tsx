// import FiveToe from "./fiveToe"
// import ThreeToe from "./threeToe"
import React, {useEffect, useState} from 'react';
import { calculateWinner } from '../../../tools/calculateWinner';
interface BoardProps {
    isFive: boolean,
}

const Checkerboard:React.FC<BoardProps> = ({isFive}) => {
  const initSquares = Array.from({length: isFive ? 15 : 3}, ()=>new Array(isFive ? 15 : 3).fill(''))
  const [boardSize, setBoardSize] = useState(3) //棋盘大小
//   const [boardStyle, setBoatdStyle] = useState('')//棋子类型
  
  const [squares, setSquares] = useState(initSquares)
  const [history, setHistory] = useState([initSquares])//历史步骤

  const [times, setTimes] = useState(0);//走的次数
  const [nextUser, setNextUser] = useState('')//下一个玩家
  const [winner, setWinner] = useState('')//赢家


  const resetGame = () => {//重新开始游戏
    setWinner('')
    setTimes(0)
    setSquares(initSquares)
    setHistory(initSquares)
  }

  const jumpToStep = (step:number) => {//跳到指定步骤
    setSquares(history[step])
    setTimes(step)
    setWinner('')
  }

  const handleClick = (rowIndex: number, colIndex: number, winner: string)=> {//鼠标点击事件
    if(winner) return
    let item = squares[rowIndex][colIndex];
    if (item !== '')return
    if (times % 2 === 0) {
        item = isFive ?'black' : 'X';
        setNextUser(isFive ? 'White' : 'O')
    } else {
        item = isFive ? 'white' : 'O';
        setNextUser(isFive ? 'Black' : 'X')
    }
    const newSquares = squares.map((row, rIndex) =>
      row.map((col, cIndex) =>
        rIndex === rowIndex && cIndex === colIndex ? item : col
      )
    );
    newSquares[rowIndex][colIndex] = item;

    const newHistory = history.slice(0, times + 1)
    setHistory([...newHistory, newSquares])

    setTimes(times + 1);
    setSquares(newSquares);

    const gameWinner = calculateWinner(newSquares, isFive ? 5 : 3)
    if(gameWinner) {
      setWinner(gameWinner)
    } else if(times === (isFive ? 224 : 8)){
      setWinner('Draw')
    }
  }

  useEffect(()=>{
    setBoardSize(isFive ? 15 : 3)
    // setBoatdStyle(isFive ? 'Black' : 'X')
    setNextUser(isFive ? 'Black' : 'X')
  },[isFive, setBoardSize])

  return (
    <div>
      <div className="historyBox">
        <div className="mb-20">
          <label>跳转到步骤：</label>
          <select onChange={(e)=>jumpToStep(Number(e.target.value))} value={times} name="selectHistory">
            {history.map((_, index) => (
              <option key={index} value={index}>第 {index} 步</option>
            ))}
          </select>
        </div>
      </div>
      <div className="gameBoard flex-cc">
        <table style={{border: '1px solid #000', borderCollapse: 'collapse', backgroundColor: 'lightgray'}}>
            <tbody>
              {
                squares.map((row, rowIndex) => {
                  return <tr key={rowIndex}>
                  {
                    row.map((col, colIndex) => {
                      return <td key={colIndex}
                                style={{border: '1px solid #000', width:  `${350 / boardSize}px`, height: `${350 / boardSize}px`}}
                                onClick={()=>handleClick( rowIndex, colIndex, winner)}
                      >
                        {(col === 'white' || col === 'black' )?
                          <div
                            style={{
                              width: '100%',
                              height: '100%',
                              backgroundColor: col,
                              borderRadius: '50%',
                              position: "relative",
                            }}></div>
                          : <div className='fs-30'>{col}
                            </div>}
                      </td>
                    })
                  }
                </tr>
                })
              }
            </tbody>
        </table>
      </div>
      {winner && (
            <div className="mb-20 mt-20">{winner === 'Draw' ? '平局' : `${winner} 胜利！`}<button onClick={resetGame}>重新开始</button></div>
      )}
      {!winner && <div className="flex-cc mt-20">下一个玩家： {nextUser}</div>}
    </div>
  )
}
export default Checkerboard