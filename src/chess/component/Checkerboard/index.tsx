import React, { useCallback, useEffect, useState } from 'react';
import { calculateWinner } from '../../../tools/calculateWinner';
import GameInfo from './component/GameInfo';
import Square from './component/Square';

interface BoardProps {
    toeSize: number;
    boardSize: number;
}
/**
 * 棋盘部分
 */
const Checkerboard: React.FC<BoardProps> = React.memo(
    ({ boardSize, toeSize }: BoardProps) => {
        const initSquares = Array.from({ length: boardSize }, () =>
            new Array(boardSize).fill('')
        );

        const [squares, setSquares] = useState(initSquares);
        const [history, setHistory] = useState([initSquares]);
        const [times, setTimes] = useState(0);
        const [curRowIndex, setCurRowIndex] = useState(0);
        const [curColIndex, setCurColIndex] = useState(0);
        const [nextUser, setNextUser] = useState('');
        const [winner, setWinner] = useState('');

        /**
         * 重置游戏
         */
        const resetGame = () => {
            setWinner('');
            setTimes(0);
            setSquares(initSquares);
            setHistory([initSquares]);
        };

        /**
         * 跳转到指定步骤
         */
        const jumpToStep = (step: number) => {
            setSquares(history[step]);
            setTimes(step);
            setWinner('');
            const gameWinner = calculateWinner(history[step], toeSize);
            if (gameWinner) {
                setWinner(gameWinner);
            }
        };

        useEffect(() => {
            if (boardSize !== 3)
                setNextUser(times % 2 === 0 ? 'Black' : 'White');
            else setNextUser(times % 2 === 0 ? 'X' : 'O');
        }, [times, boardSize]);
        /**
         * 鼠标点击事件
         */
        const handleClick = useCallback(
            (rowIndex: number, colIndex: number, winner: string) => {
                // 鼠标点击事件
                if (winner) return;
                let item = squares[rowIndex][colIndex];
                if (item !== '') return;
                if (times % 2 === 0) {
                    item = boardSize !== 3 ? 'black' : 'X';
                } else {
                    item = boardSize !== 3 ? 'white' : 'O';
                }
                const newSquares = squares.map((row, rIndex) =>
                    row.map((col, cIndex) => {
                        return rIndex === rowIndex && cIndex === colIndex
                            ? item
                            : col; // 确保返回值
                    })
                );
                const gameWinner = calculateWinner(newSquares, toeSize);
                newSquares[rowIndex][colIndex] = item;
                setSquares(newSquares);
                setCurColIndex(colIndex);
                setCurRowIndex(rowIndex);
                // const newHistory = history.slice(0, times + 1);
                // setHistory([...newHistory, newSquares]);
                setHistory((prevHistory) => [
                    ...prevHistory.slice(0, times + 1),
                    newSquares,
                ]);
                setTimes((preTimes) => preTimes + 1);

                if (gameWinner) {
                    setWinner(gameWinner);
                } else if (times === boardSize * (boardSize - 1)) {
                    setWinner('Draw');
                }
            },
            [boardSize, squares, times, toeSize, winner]
        );

        return (
            <div>
                <div className="historyBox">
                    <div className="mb-20">
                        <label>跳转到步骤：</label>
                        <select
                            onChange={(event) =>
                                jumpToStep(Number(event.target.value))
                            }
                            value={times}
                            name="selectHistory"
                        >
                            {history.map((__, index) => (
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
                                squareClick={useCallback(
                                    () =>
                                        handleClick(rowIndex, colIndex, winner),
                                    [handleClick, rowIndex, colIndex]
                                )}
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
    }
);
export default Checkerboard;
