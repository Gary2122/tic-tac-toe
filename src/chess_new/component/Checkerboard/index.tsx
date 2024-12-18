import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { calculateWinner } from '../../../tools/calculateWinner';
import { findBestMove } from '../../../tools/fightCalculate';
import { chessConfig } from '../../../config/config';
import GameInfo from './component/GameInfo';
import Square from './component/Square';
import {
    setHistory,
    resetHistory,
    setWinner,
    resetLocation,
    // setAIFirst,
} from '../../../store/modules/ChessState';
interface BoardProps {
    gameConfig: {
        label: string;
        value: string;
        size: number;
        winCondition: number;
        boardNum: number;
        toes: string[];
        isCommon: boolean;
    };
}

/**
 * 棋盘部分
 */
const Checkerboard: React.FC<BoardProps> = ({ gameConfig }: BoardProps) => {
    // console.log('parent render');
    const dispatch = useDispatch();
    const chessState = useSelector(
        (store: {
            chess: {
                winner: string;
                history: string[][][]; // history 的类型
                curRowIndex: number;
                curColIndex: number;
                fightWithAI: boolean;
                AIFirst: boolean;
            };
        }) => store.chess
    );
    const initArr = Array.from({ length: gameConfig.boardNum }, () =>
        new Array(gameConfig.boardNum).fill('')
    );
    const [squares, setSquares] = React.useState<string[][]>(initArr);
    // const [nextUser, setNextUser] = React.useState<string>('');
    const nextUser =
        gameConfig.toes[
            chessState.fightWithAI && chessState.AIFirst
                ? chessState.history.length % 2
                : (chessState.history.length + 1) % 2
        ];
    useEffect(() => {
        /**
         * 初始化游戏
         */
        const initOptions = () => {
            dispatch(resetHistory(gameConfig.boardNum));
            dispatch(resetLocation());
            dispatch(setWinner(''));
        };
        initOptions();
        // if (chessState.fightWithAI && chessState.AIFirst) {
        //     handleAIPlay(squares);
        // }
        // 初始化棋盘
    }, [gameConfig.boardNum]);

    useEffect(() => {
        // dispatch(setAIFirst(true));
        if (chessState.curRowIndex === -1 || chessState.curColIndex === -1) {
            if (chessState.fightWithAI && chessState.AIFirst) {
                handleAIPlay(squares);
            }
        } else {
            handleClick(chessState.curRowIndex, chessState.curColIndex);
        }
    }, [chessState.curRowIndex, chessState.curColIndex]);
    const [curPlayer, setCurPlayer] = React.useState(false); // 用于控制是否轮到当前玩家下棋

    /**
     * 鼠标点击事件
     */
    const handleClick = async (rowIndex: number, colIndex: number) => {
        const newSquares = adjustSquares(rowIndex, colIndex) as string[][];
        if (!newSquares) return;

        judgeWinner(newSquares, gameConfig.winCondition, rowIndex, colIndex);
        setCurPlayer(true);
    };
    useEffect(() => {
        if (chessState.fightWithAI)
            if (curPlayer) {
                handleAIPlay(squares);
                setCurPlayer(false);
            }
    }, [curPlayer, chessState.fightWithAI]);
    /**
     * AI 下棋
     */
    const handleAIPlay = async (squares: string[][]) => {
        if (chessState.winner) return;
        if (
            !squares ||
            !Array.isArray(squares) ||
            squares.length !== gameConfig.winCondition
        )
            return;
        const bestMove = findBestMove(
            squares,
            true,
            gameConfig.toes[1],
            gameConfig.toes[0]
        );

        if (bestMove) {
            const { row_i, col_j } = bestMove;
            // 更新棋盘
            const newSquares = adjustSquares(row_i, col_j) as string[][];
            // 判断 AI 下子后的游戏状态
            judgeWinner(newSquares, gameConfig.winCondition, row_i, col_j);
        }
    };

    /**
     * 下子时改变棋盘squares和history数据
     */
    const adjustSquares = (rowIndex: number, colIndex: number) => {
        if (rowIndex === -1 || colIndex === -1) return;
        if (chessState.winner || squares[rowIndex][colIndex] !== '') return;

        const newSquares = squares.map((row, rIndex) =>
            row.map((col, cIndex) =>
                rIndex === rowIndex && cIndex === colIndex ? nextUser : col
            )
        );
        setSquares(newSquares);
        dispatch(setHistory([...chessState.history, newSquares]));
        return newSquares;
    };

    /**
     * 重置游戏
     */
    const resetGame = () => {
        dispatch(setWinner(''));
        dispatch(resetHistory(gameConfig.boardNum));
        dispatch(resetLocation());
        setCurPlayer(false);
        setSquares(initArr);
    };

    /**
     * 跳转到指定步骤
     */
    const jumpToStep = (step: number) => {
        if (step === 0) {
            resetGame();
            return;
        }
        dispatch(setHistory(chessState.history.slice(0, step + 1)));
        dispatch(setWinner(''));
        dispatch(resetLocation());
        setSquares(chessState.history[step]);
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
            dispatch(setWinner(gameWinner));
        } else if (
            chessState.history.length ===
            gameConfig.boardNum * gameConfig.boardNum
        ) {
            dispatch(setWinner('Draw'));
        }
    };
    return (
        <div>
            <div className="historyBox">
                <div className="mb-20">
                    <label>跳转到步骤：</label>
                    <select
                        onChange={(event) =>
                            jumpToStep(Number(event.target.value))
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
                            isCommon={gameConfig.isCommon}
                            rowIndex={rowIndex}
                            colIndex={colIndex}
                            size={
                                chessConfig.boardSize.boardHeight /
                                gameConfig.boardNum
                            }
                        />
                    ))
                )}
            </div>
            <GameInfo nextUser={nextUser} resetGame={resetGame} />
        </div>
    );
};

export default Checkerboard;
// import ParentComponent from './component/ParentComponent';
// const initSquares = Array.from({ length: gameConfig.boardNum }, () =>
//     new Array(gameConfig.boardNum).fill('')
// );
// const [squares, setSquares] = useState(initSquares);
// const [history, setHistory] = useState([initSquares]);
// const [winner, setWinner] = useState('');
// const [curRowIndex, setCurRowIndex] = useState(-1);
// const [curColIndex, setCurColIndex] = useState(-1);
// setSquares(initSquares);resetGame
// setHistory([initSquares]);resetGame
// setSquares(chessState.history[step]);jumpToStep
// setHistory((prevHistory) => prevHistory.slice(0, step + 1));jumpToStep
// setSquares(newSquares);adjustSquares
// setHistory((prevHistory) => [...prevHistory, newSquares]);adjustSquares
/**
 * onSquareClick
 */
// const onSquareClick = useCallback((rowIndex: number, colIndex: number) => {
//     setCurRowIndex(rowIndex);
//     setCurColIndex(colIndex);
// }, []);
