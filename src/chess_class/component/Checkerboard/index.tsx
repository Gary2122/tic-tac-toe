import React from 'react';
import { calculateWinner } from '../../../tools/calculateWinner';
import { chessConfig } from '../../config/config';
import GameInfo from './component/GameInfo';
import Square from './component/Square';

// import React from 'react';
import { connect } from 'react-redux';
import {
    setHistory,
    resetHistory,
    setWinner,
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
    };
    setHistory: (history: string[][][]) => void;
    resetHistory: (boardNum: number) => void;
    setWinner: (winner: string) => void;
}

interface BoardState {
    curRowIndex: number;
    curColIndex: number;
}

class Checkerboard extends React.Component<BoardProps, BoardState> {
    constructor(props: BoardProps) {
        super(props);
        this.state = {
            curRowIndex: -1,
            curColIndex: -1,
        };
    }
    /**
     * 初始化棋盘
     */
    componentDidMount() {
        this.props.resetHistory(this.props.gameConfig.boardNum);
    }
    /**
     * 下棋后更新curRowIndex和curColIndex
     */
    componentDidUpdate(prevProps: BoardProps, prevState: BoardState) {
        if (
            this.state.curRowIndex !== prevState.curRowIndex ||
            this.state.curColIndex !== prevState.curColIndex
        ) {
            this.handleClick(this.state.curRowIndex, this.state.curColIndex);
        }
    }

    resetGame = () => {
        const { resetHistory, setWinner, gameConfig } = this.props;
        setWinner('');
        resetHistory(gameConfig.boardNum);
        this.setState({ curRowIndex: -1, curColIndex: -1 });
    };

    jumpToStep = (step: number) => {
        const { setHistory, setWinner, chessState } = this.props;
        setHistory(chessState.history.slice(0, step + 1));
        setWinner('');
        this.setState({ curRowIndex: -1, curColIndex: -1 });
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

    onSquareClick = (rowIndex: number, colIndex: number) => {
        this.setState({ curRowIndex: rowIndex, curColIndex: colIndex });
    };

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
    };
}) => ({
    chessState: state.chess,
});

const mapDispatchToProps = {
    setHistory,
    resetHistory,
    setWinner,
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkerboard);
