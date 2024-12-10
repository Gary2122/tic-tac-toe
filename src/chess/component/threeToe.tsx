import React, { useEffect, useState } from "react";
import "../../css/threeToe.css"
import { calculateThreeWinner } from "../../tools/calculateWinner";
interface ThreeToeProps {
    sendValueFromThree:(value: string) => void,
    sendWinnerValue:(value: string) => void
}
const ThreeToe:React.FC<ThreeToeProps> = ({sendValueFromThree, sendWinnerValue}) => {
    const initSquares = Array.from({ length: 3 }, () => new Array(3).fill(''));
    const [squares, setSquares] = useState(initSquares);
    const [times, setTimes] = useState(0); // 记录玩家回合
    const [winner, setWinner] = useState(''); // 存储赢家 ('X' 或 'O')
    const [history, setHistory] = useState([initSquares]); // 用于存储历史记录

    // 跳转到历史步骤
    const jumpToStep = (step: number) => {
        setSquares(history[step]);
        setTimes(step);
        setWinner(''); // 恢复时清空赢家
        sendWinnerValue('');
    };

    // 重置游戏
    const resetGame = () => {
        setSquares(initSquares);
        setTimes(0);
        setWinner('');
        sendWinnerValue('')
        setHistory([initSquares]);
    };
    // 点击事件，玩家落子
    const handleClick = (rowIndex:number, colIndex:number) => {
        if (squares[rowIndex][colIndex]) return;

        const newSquares = squares.map(row => [...row]); // 深拷贝棋盘
        newSquares[rowIndex][colIndex] = times % 2 === 0 ? 'X' : 'O'; 
        sendValueFromThree(times % 2 === 0 ? 'O' : 'X')

        const newHistory = history.slice(0, times + 1); // 保留当前步骤之前的历史
        setHistory([...newHistory, newSquares]);

        setSquares(newSquares);
        setTimes(times + 1);

        const winner = calculateThreeWinner(squares)
        if (winner) {
            setWinner(winner);
        } else if (times === 8) {
            setWinner('Draw');
        }
    };


    useEffect(()=>{
        if(winner !== '')
            sendWinnerValue( winner && winner === 'Draw' ? '平局' : winner )
    },[winner, sendWinnerValue])
    return (
        <div >
            <div>
            <label>跳转到步骤：</label>
        <select onChange={(e) => jumpToStep(Number(e.target.value))} value={times}>
          {history.map((_, index) => (
            <option key={index} value={index}>
              第 {index} 步
            </option>
          ))}
        </select>
            </div>
            {winner && (
                <div className="mb-20">
                    {winner === 'Draw' ? '平局！' : `${winner} 胜利！`}
                    <button onClick={resetGame}>重新开始</button>
                </div>
            )}
            <table style={{ border: '1px solid #000', borderCollapse: 'collapse', background: 'lightgray' }}>
                <tbody>
                    {
                        squares.map((row, rowIndex) => {
                            return <tr key={rowIndex}>
                                {
                                    row.map((col, colIndex) => {
                                        return (
                                            <td
                                                key={colIndex}
                                                className="threeToe_td cursor-pointer"
                                                style={{ border: '1px solid #000', width: '100px', height: '100px', textAlign: 'center', verticalAlign: 'middle', fontSize: '24px' }}
                                                onClick={() => handleClick(rowIndex, colIndex)}
                                            >
                                                {col}
                                            </td>
                                        );
                                    })
                                }
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};
export default ThreeToe