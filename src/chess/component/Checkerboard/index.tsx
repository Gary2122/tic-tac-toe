import React, { useEffect, useState } from 'react';
import { calculateWinner } from '../../../tools/calculateWinner';
interface BoardProps {
    boardSize: number;
}

const Checkerboard: React.FC<BoardProps> = ({ boardSize }) => {
    const initSquares = Array.from({ length: boardSize }, () =>
        new Array(boardSize).fill('')
    );

    const [squares, setSquares] = useState(initSquares);
    const [history, setHistory] = useState([initSquares]); //历史步骤

    const [times, setTimes] = useState(0); //走的次数
    const [nextUser, setNextUser] = useState(''); //下一个玩家
    const [winner, setWinner] = useState(''); //赢家

    const resetGame = () => {
        //重新开始游戏
        setWinner('');
        setTimes(0);
        setSquares(initSquares);
        setHistory([initSquares]);
    };

    const jumpToStep = (step: number) => {
        //跳到指定步骤
        setSquares(history[step]);
        setTimes(step);
        setWinner('');
        const gameWinner = calculateWinner(
            history[step],
            boardSize !== 3 ? 5 : 3
        );
        if (gameWinner) {
            setWinner(gameWinner);
        }
    };

    useEffect(() => {
        if (boardSize !== 3) setNextUser(times % 2 === 0 ? 'Black' : 'White');
        else setNextUser(times % 2 === 0 ? 'X' : 'O');
    }, [times, boardSize]);
    const handleClick = (
        rowIndex: number,
        colIndex: number,
        winner: string
    ) => {
        //鼠标点击事件
        if (winner) return;
        let item = squares[rowIndex][colIndex];
        if (item !== '') return;
        if (times % 2 === 0) {
            item = boardSize !== 3 ? 'black' : 'X';
        } else {
            item = boardSize !== 3 ? 'white' : 'O';
        }
        const newSquares = squares.map((row, rIndex) =>
            row.map((col, cIndex) =>
                rIndex === rowIndex && cIndex === colIndex ? item : col
            )
        );
        newSquares[rowIndex][colIndex] = item;

        const newHistory = history.slice(0, times + 1);
        setHistory([...newHistory, newSquares]);

        setTimes(times + 1);
        setSquares(newSquares);

        const gameWinner = calculateWinner(newSquares, boardSize !== 3 ? 5 : 3);
        if (gameWinner) {
            setWinner(gameWinner);
        } else if (times === (boardSize !== 3 ? 224 : 8)) {
            setWinner('Draw');
        }
    };

    return (
        <div>
            <div className="historyBox">
                <div className="mb-20">
                    <label>跳转到步骤：</label>
                    <select
                        onChange={(e) => jumpToStep(Number(e.target.value))}
                        value={times}
                        name="selectHistory"
                    >
                        {history.map((_, index) => (
                            <option key={index} value={index}>
                                第 {index} 步
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="gameBoard flex-cc">
                <table
                    style={{
                        border: '1px solid #000',
                        borderCollapse: 'collapse',
                        backgroundColor: 'lightgray',
                    }}
                >
                    <tbody>
                        {squares.map((row, rowIndex) => {
                            return (
                                <tr key={rowIndex}>
                                    {row.map((col, colIndex) => {
                                        return (
                                            <td
                                                key={colIndex}
                                                style={{
                                                    border: '1px solid #000',
                                                    width: `${350 / boardSize}px`,
                                                    height: `${350 / boardSize}px`,
                                                }}
                                                onClick={() =>
                                                    handleClick(
                                                        rowIndex,
                                                        colIndex,
                                                        winner
                                                    )
                                                }
                                            >
                                                {col === 'white' ||
                                                col === 'black' ? (
                                                    <div
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            backgroundColor:
                                                                col,
                                                            borderRadius: '50%',
                                                            position:
                                                                'relative',
                                                        }}
                                                    ></div>
                                                ) : (
                                                    <div className="fs-30">
                                                        {col}
                                                    </div>
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {winner && (
                <div className="mb-20 mt-20">
                    {winner === 'Draw' ? '平局' : `${winner} 胜利！`}
                    <button onClick={resetGame}>重新开始</button>
                </div>
            )}
            {!winner && (
                <div className="flex-cc mt-20">
                    下一个玩家： <div className="w-20">{nextUser}</div>
                </div>
            )}
        </div>
    );
};
export default Checkerboard;
