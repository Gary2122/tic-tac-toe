import React, { useEffect, useState } from "react";
import "../../css/threeToe.css"
import { calculateWinner } from "../../tools/calculateWinner";
const ThreeToe:React.FC = () => {
    const initSquares = Array.from({ length: 3 }, () => new Array(3).fill(''));
    const [squares, setSquares] = useState(initSquares);
    const [times, setTimes] = useState(0); // 记录玩家回合
    const [winner, setWinner] = useState(''); // 存储赢家 ('X' 或 'O')
    const [nextUser, setNextUser] = useState('X')
    const [history, setHistory] = useState([initSquares]); // 用于存储历史记录

    // 跳转到历史步骤
    const jumpToStep = (step: number) => {
        setSquares(history[step]);
        setTimes(step);
        setWinner(''); 
    };

    // 重置游戏
    const resetGame = () => {
        setSquares(initSquares);
        setTimes(0);
        setWinner('');
        setNextUser('X')
        setHistory([initSquares]);
    };
    // 点击事件，玩家落子
    const handleClick = (rowIndex:number, colIndex:number, winner:string) => {
        if (squares[rowIndex][colIndex] || winner) return;
        const newSquares = squares.map(row => [...row]); // 深拷贝棋盘
        newSquares[rowIndex][colIndex] = times % 2 === 0 ? 'X' : 'O'; 

        const newHistory = history.slice(0, times + 1); // 保留当前步骤之前的历史
        setHistory([...newHistory, newSquares]);

        setSquares(newSquares);
        setTimes(times + 1);
        const gameWinner = calculateWinner(newSquares, 3)
        if (gameWinner) {
            setWinner(gameWinner);
        } else if (times === 8) {
            setWinner('Draw');
        }
    };
    useEffect(()=>{
        setNextUser(times % 2 === 0 ? 'X' : 'O')
    },[times, setNextUser])
    return (
        <div >
            <div className="mb-20">
                <label>跳转到步骤：</label>
                <select onChange={(e) => jumpToStep(Number(e.target.value))} value={times}>
                {history.map((_, index) => (
                    <option key={index} value={index}>
                    第 {index} 步
                    </option>
                ))}
                </select>
            </div>
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
                                                onClick={() => handleClick(rowIndex, colIndex, winner)}
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
            {winner && (
                <div className="mb-20">
                    {winner === 'Draw' ? '平局！' : `${winner} 胜利！`}
                    <button onClick={resetGame}>重新开始</button>
                </div>
            )}
            <div className="flex-cc mt-20">下一个玩家： {nextUser}</div>
        </div>
    );
};
export default ThreeToe