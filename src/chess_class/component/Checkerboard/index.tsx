import React from 'react';
import { calculateWinner } from '../../../tools/calculateWinner';
import { chessConfig } from '../../config/config';
import GameInfo from './component/GameInfo';
import Square from './component/Square';

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

interface BoardState {
    gameConfig: {
        label: string;
        value: string;
        size: number;
        winCondition: number;
        boardNum: number;
        toes: string[];
    };
    initSquares: string[][];
    squares: string[][];
    history: string[][][];
    curRowIndex: number;
    curColIndex: number;
    winner: string;
}

class Checkerboard extends React.Component<BoardProps, BoardState> {
    constructor(props: BoardProps) {
        super(props);
        const initSquares = Array.from(
            { length: props.gameConfig.boardNum },
            () => new Array(props.gameConfig.boardNum).fill('')
        );
        this.state = {
            gameConfig: props.gameConfig,
            initSquares: initSquares as string[][],
            squares: initSquares,
            history: [initSquares],
            curRowIndex: -1,
            curColIndex: -1,
            winner: '',
        };
    }

    resetGame = () => {
        this.setState((prevState) => ({
            winner: '',
            squares: prevState.initSquares,
            history: [prevState.initSquares],
            curRowIndex: -1,
            curColIndex: -1,
        }));
    };

    jumpToStep = (step: number) => {
        this.setState((prevState) => {
            const newSquares = prevState.history[step];
            return {
                squares: newSquares,
                history: prevState.history.slice(0, step + 1),
                curRowIndex: -1,
                curColIndex: -1,
                winner: '',
            };
        });
    };

    adjustSquares = (rowIndex: number, colIndex: number) => {
        if (rowIndex === -1 || colIndex === -1) return;
        if (this.state.winner || this.state.squares[rowIndex][colIndex] !== '')
            return;

        const nextUser =
            this.props.gameConfig.toes[this.state.history.length % 2];
        const newSquares = this.state.squares.map((row, rIndex) =>
            row.map((col, cIndex) =>
                rIndex === rowIndex && cIndex === colIndex ? nextUser : col
            )
        );

        this.setState((prevState) => ({
            squares: newSquares,
            history: [...prevState.history, newSquares],
        }));

        return newSquares;
    };

    judgeWinner = (
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
            this.setState({ winner: gameWinner });
        } else if (
            this.state.history.length ===
            this.state.gameConfig.boardNum * this.state.gameConfig.boardNum
        ) {
            this.setState({ winner: 'Draw' });
        }
    };

    handleClick = (rowIndex: number, colIndex: number) => {
        const newSquares = this.adjustSquares(rowIndex, colIndex);
        if (!newSquares) return;
        this.judgeWinner(
            newSquares,
            this.state.gameConfig.winCondition,
            rowIndex,
            colIndex
        );
    };
    /**
     * 组件更新
     */
    componentDidUpdate(prevState: BoardState) {
        if (
            this.state.curRowIndex !== prevState.curRowIndex ||
            this.state.curColIndex !== prevState.curColIndex
        ) {
            this.handleClick(this.state.curRowIndex, this.state.curColIndex);
        }
    }
    onSquareClick = (rowIndex: number, colIndex: number) => {
        this.setState({ curRowIndex: rowIndex, curColIndex: colIndex });
    };

    render() {
        const { gameConfig, squares, history, winner } = this.state;

        const nextUser = this.props.gameConfig.toes[history.length % 2];

        return (
            <div>
                <div className="historyBox">
                    <div className="mb-20">
                        <label>跳转到步骤：</label>
                        <select
                            onChange={(event) =>
                                this.jumpToStep(Number(event.target.value))
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
                                squareClick={this.onSquareClick}
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
                    resetGame={this.resetGame}
                />
            </div>
        );
    }
}

export default Checkerboard;
