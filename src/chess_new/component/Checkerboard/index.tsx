import React, { useCallback, useEffect, useState } from 'react';
import { calculateWinner } from '../../../tools/calculateWinner';
import { chessConfig } from '../../config/config';
import GameInfo from './component/GameInfo';
import Square from './component/Square';
// import ParentComponent from './component/ParentComponent';
interface BoardProps {
    gameConfig: {
        label: string;
        value: string;
        size: number;
        winCondition: number;
        boardNum: number;
        toes: string[];
    };
}

/**
 * 棋盘部分
 */
const Checkerboard: React.FC<BoardProps> = ({ gameConfig }: BoardProps) => {
    const initSquares = Array.from({ length: gameConfig.boardNum }, () =>
        new Array(gameConfig.boardNum).fill('')
    );

    const [curRowIndex, setCurRowIndex] = useState(-1);
    const [curColIndex, setCurColIndex] = useState(-1);
    // const [temp, setTemp] = useState(0);
    const [squares, setSquares] = useState(initSquares);
    const [history, setHistory] = useState([initSquares]);
    const [winner, setWinner] = useState('');

    // const handleClick2 = () => {
    //     setTemp(temp + 1);
    // };
    /**
     * 重置游戏
     */
    const resetGame = () => {
        setWinner('');
        setSquares(initSquares);
        setHistory([initSquares]);
        setCurRowIndex(-1);
        setCurColIndex(-1);
    };

    /**
     * 跳转到指定步骤
     */
    const jumpToStep = (step: number) => {
        setSquares(history[step]);
        setHistory((prevHistory) => prevHistory.slice(0, step + 1));
        setWinner('');
        setCurRowIndex(-1);
        setCurColIndex(-1);
    };

    const nextUser = gameConfig.toes[history.length % 2];
    /**
     * onSquareClick
     */
    const onSquareClick = useCallback((rowIndex: number, colIndex: number) => {
        setCurRowIndex(rowIndex);
        setCurColIndex(colIndex);
    }, []);

    /**
     * 下子时改变棋盘squares和history数据
     */
    const adjustSquares = (rowIndex: number, colIndex: number) => {
        if (rowIndex === -1 || colIndex === -1) return;
        if (winner || squares[rowIndex][colIndex] !== '') return;
        const newSquares = squares.map((row, rIndex) =>
            row.map((col, cIndex) =>
                rIndex === rowIndex && cIndex === colIndex ? nextUser : col
            )
        );
        setSquares(newSquares);
        setHistory((prevHistory) => [...prevHistory, newSquares]);

        return newSquares;
    };

    /**
     * 判断赢家
     */
    const judgeWinner = (
        squares: string[][],
        winCondition: number,
        rowIndex: number,
        colIndex: number
    ) => {
        const gameWinner = calculateWinner(
            squares,
            winCondition,
            rowIndex,
            colIndex
        );
        if (gameWinner) {
            setWinner(gameWinner);
        } else if (
            history.length ===
            gameConfig.boardNum * gameConfig.boardNum - 1
        ) {
            setWinner('Draw');
        }
    };
    /**
     * 鼠标点击事件
     */
    const handleClick = (rowIndex: number, colIndex: number) => {
        const newSquares = adjustSquares(rowIndex, colIndex) as string[][];
        if (!newSquares) return;
        judgeWinner(newSquares, gameConfig.winCondition, rowIndex, colIndex);
    };

    useEffect(() => {
        handleClick(curRowIndex, curColIndex);
    }, [curRowIndex, curColIndex]);
    return (
        <div>
            <div className="historyBox">
                <div className="mb-20">
                    <label>跳转到步骤：</label>
                    {/* <ParentComponent></ParentComponent> */}
                    <select
                        onChange={(event) =>
                            jumpToStep(Number(event.target.value))
                        }
                        value={history.length - 1}
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
            {/* <button onClick={handleClick2}>111</button> */}
            <div
                className="gameBoard grid gap-0"
                style={{
                    gridTemplateColumns: `repeat(${gameConfig.boardNum}, ${chessConfig.boardSize.boardHeight / gameConfig.boardNum}px)`,
                    gridTemplateRows: `repeat(${gameConfig.boardNum}, ${chessConfig.boardSize.boardHeight / gameConfig.boardNum}px)`,
                }}
            >
                {squares.map((row, rowIndex) =>
                    row.map((value, colIndex) => (
                        <Square
                            key={`${rowIndex}-${colIndex}`}
                            value={value}
                            isCur={false}
                            rowIndex={rowIndex}
                            colIndex={colIndex}
                            squareClick={onSquareClick}
                            size={
                                chessConfig.boardSize.boardHeight /
                                gameConfig.boardNum
                            }
                        />
                    ))
                )}
            </div>
            <GameInfo
                nextUser={nextUser}
                winner={winner}
                resetGame={resetGame}
            />
        </div>
    );
};

export default Checkerboard;
