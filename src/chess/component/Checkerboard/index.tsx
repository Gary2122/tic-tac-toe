import React, { useEffect, useState } from 'react';
import { calculateWinner } from '../../../tools/calculateWinner';
import GameInfo from './component/GameInfo';
import Square from './component/Square';

interface BoardProps {
    toeSize: number;
    boardSize: number;
}

const Checkerboard: React.FC<BoardProps> = ({ boardSize, toeSize }) => {
    const initSquares = Array.from({ length: boardSize }, () =>
        new Array(boardSize).fill('')
    );

    const [squares, setSquares] = useState(initSquares);
    const [history, setHistory] = useState([initSquares]); //历史步骤

    const [times, setTimes] = useState(0); //走的次数
    const [curRowIndex, setCurRowIndex] = useState(0);
    const [curColIndex, setCurColIndex] = useState(0);
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
        const gameWinner = calculateWinner(history[step], toeSize);
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
        setCurColIndex(colIndex);
        setCurRowIndex(rowIndex);
        const newHistory = history.slice(0, times + 1);
        setHistory([...newHistory, newSquares]);

        setTimes(times + 1);
        setSquares(newSquares);

        const gameWinner = calculateWinner(newSquares, toeSize);
        if (gameWinner) {
            setWinner(gameWinner);
        } else if (times === boardSize * boardSize - 1) {
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
            <div
                className="gameBoard grid gap-0"
                style={{
                    gridTemplateColumns: `repeat(${boardSize}, ${350 / boardSize}px)`,
                    gridTemplateRows: `repeat(${boardSize}, ${350 / boardSize}px)`,
                }}
            >
                {squares.flat().map((value, index) => {
                    const rowIndex = Math.floor(index / boardSize);
                    const colIndex = index % boardSize;

                    return (
                        <Square
                            key={`${rowIndex}-${colIndex}`}
                            value={value}
                            isCur={
                                rowIndex === curRowIndex &&
                                colIndex === curColIndex
                            }
                            squareClick={() =>
                                handleClick(rowIndex, colIndex, winner)
                            }
                            size={350 / boardSize}
                        />
                    );
                })}
            </div>
            <GameInfo
                nextUser={nextUser}
                winner={winner}
                resetGame={resetGame}
            ></GameInfo>
        </div>
    );
};
export default Checkerboard;
