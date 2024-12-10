import React, { useState } from "react"
import { calculateFiveWinner } from "../../tools/calculateWinner";
const FiveToe:React.FC = ()=>{
    const initSquares = Array.from({length: 15},
        () => new Array(15).fill(''));
      const [squares, setSquares] = useState(initSquares);
      const [times, setTimes] = useState(0);
      const [winner, setWinner] = useState('')
      const [history, setHistory] = useState([initSquares])
      const [nextUser, setNextUser] = useState('black')

      const resetGame = () => { //重新开始游戏
        setWinner('')
        setTimes(0)
        setNextUser('black')
        setSquares(initSquares)
        setHistory([initSquares])
      }

      const jumpToStep = (step:number) => {
        setSquares(history[step])
        setTimes(step)
        setWinner('')
        setNextUser(step % 2 === 0 ? 'black' : 'white')
      }
    const handleClick = (event: React.MouseEvent<HTMLTableCellElement>, rowIndex: number, colIndex: number, winner: string)=> {//鼠标点击事件
      if(winner) return
      let item = squares[rowIndex][colIndex];
      if (item !== '')return
      const clickedElement = event.target as HTMLTableCellElement;
      const rect = clickedElement.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const width = clickedElement.getBoundingClientRect().width;
      const height = clickedElement.getBoundingClientRect().height;
      const left = x / width;
      const top = y / height;
      
      if (left < 0.5 && top < 0.5) { // 左上
          if (rowIndex > 0) {
          rowIndex--;
          }
          if (colIndex > 0) {
          colIndex--;
          }
      }
      if (left < 0.5 && top > 0.5) { // 左下
          if (colIndex > 0) {
          colIndex--;
          }
      }
      if (left > 0.5 && top < 0.5) { // 右上
          if (rowIndex > 0) {
          rowIndex--;
          }
      }

      if (times % 2 === 0) {
          item = 'black';
          setNextUser('white')
      } else {
          item = 'white';
          setNextUser('black')
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

      const gameWinner = calculateFiveWinner(newSquares)
      if(gameWinner) {
        setWinner(gameWinner)
      } else if(times === 224){
        setWinner('Draw')
      }
    }
    return (
        <div>
          <div className="mb-20"><label>跳转到步骤：</label> <select onChange={(e)=>jumpToStep(Number(e.target.value))} value={times} name="" id="">
          {history.map((_, index) => (
            <option key={index} value={index}>
              第 {index} 步
            </option>
          ))}
            </select></div>
      <table style={{border: '1px solid #000', borderCollapse: 'collapse', backgroundColor: 'lightgray'}}>
        <tbody>
        {
          squares.map((row, rowIndex) => {
            return <tr key={rowIndex}>
              {
                row.map((col, colIndex) => {
                  return <td key={colIndex}
                            style={{border: '1px solid #000', width: '20px', height: '20px'}}
                            onClick={(event)=>handleClick(event, rowIndex, colIndex, winner)}
                  >
                    {(col === 'white' || col === 'black' )?
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          backgroundColor: col,
                          borderRadius: '50%',
                          position: "relative",
                          right: "-50%",
                          bottom: "-50%"
                        }}></div>
                      : col}
                  </td>
                })
              }
            </tr>
          })
        }
        </tbody>
      </table>
      {winner && (
            <div className="mb-20">{winner === 'Draw' ? '平局' : `${winner} 胜利！`}<button onClick={resetGame}>重新开始</button></div>
      )}
      <div className="flex-cc">下一个玩家： {nextUser}</div>
    </div>
    )
}
export default FiveToe