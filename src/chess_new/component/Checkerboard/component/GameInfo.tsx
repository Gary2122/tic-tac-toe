import React from 'react';
import { useSelector } from 'react-redux';
interface GameInfoProps {
    nextUser: string;
    resetGame: () => void;
}
/**
 * 游戏信息
 */
const GameInfo: React.FC<GameInfoProps> = ({ nextUser, resetGame }) => {
    const chessState = useSelector(
        (store: {
            chess: {
                winner: string;
            };
        }) => store.chess
    );
    /**
     * 棋子点击事件
     */
    const handleClick = () => {
        resetGame();
    };
    return (
        <div>
            {chessState.winner && (
                <div className="mb-20 mt-20">
                    {chessState.winner === 'Draw'
                        ? '平局'
                        : `${chessState.winner} 胜利！`}
                    <button onClick={handleClick}>重新开始</button>
                </div>
            )}
            {!chessState.winner && (
                <div className="flex-cc mt-20">
                    下一个玩家： <div className="w-20">{nextUser}</div>
                </div>
            )}
        </div>
    );
};

export default GameInfo;
