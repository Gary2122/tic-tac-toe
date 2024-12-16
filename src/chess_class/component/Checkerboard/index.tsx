import React from 'react';
import { calculateWinner } from '../../../tools/calculateWinner';
import { chessConfig } from '../../config/config';
import GameInfo from './component/GameInfo';
import Square from './component/Square';

import { connect } from 'react-redux';
import {
    setHistory,
    resetHistory,
    setWinner,
    resetLocation,
} from '../../../store/modules/ChessState';

interface BoardProps {
    gameConfig: {
        label: string;
        value: string;
        size: number;
        winCondition: number;
        boardNum: number;
        toes: string[];
    };
    chessState: {
        winner: string;
        history: string[][][];
        curRowIndex: number;
        curColIndex: number;
    };
    setWinner: (winner: string) => void;
    setHistory: (history: string[][][]) => void;
    // setCurToeLoaction: (location: {
    //     rowIndex: number;
    //     colIndex: number;
    // }) => void;
    resetLocation: () => void;
    resetHistory: (boardNum: number) => void;
}

interface BoardState {
    curRowIndex: number;
    curColIndex: number;
}

class Checkerboard extends React.Component<BoardProps, BoardState> {
    constructor(props: BoardProps) {
        super(props);
    }
    /**
     * 初始化棋盘
     */
    componentDidMount() {
        this.props.resetHistory(this.props.gameConfig.boardNum);
        this.props.resetLocation();
        this.props.setWinner('');
    }
    /**
     * 下棋后更新curRowIndex和curColIndex
     */
    componentDidUpdate() {
        const { chessState } = this.props;
        this.handleClick(chessState.curRowIndex, chessState.curColIndex);
    }

    resetGame = () => {
        const { resetHistory, setWinner, gameConfig, resetLocation } =
            this.props;
        setWinner('');
        resetHistory(gameConfig.boardNum);
        resetLocation();
    };

    jumpToStep = (step: number) => {
        const { chessState, setHistory, setWinner, resetLocation } = this.props;
        setHistory(chessState.history.slice(0, step + 1));
        setWinner('');
        resetLocation();
    };

    adjustSquares = (rowIndex: number, colIndex: number) => {
        const { chessState, gameConfig, setHistory } = this.props;
        const squares = chessState.history[chessState.history.length - 1];

        if (rowIndex === -1 || colIndex === -1) return;
        if (chessState.winner || squares[rowIndex][colIndex] !== '') return;

        const nextUser = gameConfig.toes[chessState.history.length % 2];
        const newSquares = squares.map((row, rIndex) =>
            row.map((col, cIndex) =>
                rIndex === rowIndex && cIndex === colIndex ? nextUser : col
            )
        );

        setHistory([...chessState.history, newSquares]);
        return newSquares;
    };

    judgeWinner = (
        squares: string[][],
        winCondition: number,
        rowIndex: number,
        colIndex: number
    ) => {
        const { setWinner, chessState, gameConfig } = this.props;
        const gameWinner = calculateWinner(
            squares,
            winCondition,
            rowIndex,
            colIndex
        );

        if (gameWinner) {
            setWinner(gameWinner);
        } else if (
            chessState.history.length ===
            gameConfig.boardNum * gameConfig.boardNum
        ) {
            setWinner('Draw');
        }
    };

    handleClick = (rowIndex: number, colIndex: number) => {
        const newSquares = this.adjustSquares(rowIndex, colIndex);
        if (!newSquares) return;
        this.judgeWinner(
            newSquares,
            this.props.gameConfig.winCondition,
            rowIndex,
            colIndex
        );
    };

    // onSquareClick = (rowIndex: number, colIndex: number) => {
    //     const { setCurToeLoaction } = this.props;
    //     setCurToeLoaction({
    //         rowIndex,
    //         colIndex,
    //     });
    // };

    render() {
        const { gameConfig, chessState } = this.props;
        const squares = chessState.history[chessState.history.length - 1];
        const nextUser = gameConfig.toes[chessState.history.length % 2];

        return (
            <div>
                <div className="historyBox">
                    <div className="mb-20">
                        <label>跳转到步骤：</label>
                        <select
                            onChange={(event) =>
                                this.jumpToStep(Number(event.target.value))
                            }
                            value={chessState.history.length - 1}
                            name="selectHistory"
                        >
                            {chessState.history.map((__, index) => (
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
                                // squareClick={this.onSquareClick}
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
                    winner={chessState.winner}
                    resetGame={this.resetGame}
                />
            </div>
        );
    }
}
/**
 * 将 Redux 状态映射到组件的 props
 */
const mapStateToProps = (state: {
    chess: {
        winner: string;
        history: string[][][];
        curRowIndex: number;
        curColIndex: number;
    };
}) => ({
    chessState: state.chess,
});

const mapDispatchToProps = {
    setHistory,
    resetHistory,
    setWinner,
    // setCurToeLoaction,
    resetLocation,
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkerboard);
