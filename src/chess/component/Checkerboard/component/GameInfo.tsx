import React from 'react';

interface GameInfoProps {
    nextUser: string;
    winner: string;
    resetGame: () => void;
}

const GameInfo: React.FC<GameInfoProps> = ({ nextUser, winner, resetGame }) => {
    const handleClick = () => {
        resetGame();
    };
    return (
        <div>
            {winner && (
                <div className="mb-20 mt-20">
                    {winner === 'Draw' ? '平局' : `${winner} 胜利！`}
                    <button onClick={handleClick}>重新开始</button>
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

export default GameInfo;
