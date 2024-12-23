import React, { useState } from 'react';
import Checkerboard from './component/Checkerboard';
import Setting from './component/Setting';
import { Button } from '@mui/material';
/**
 * 棋盘主页
 */
const GameIndex: () => JSX.Element = () => {
    const [isFive, setIsFive] = useState(false);
    const [gameStart, setGameStart] = useState(false);
    const [gameName, setGameName] = useState('井字棋');
    const [boardSize, setBoardSize] = useState(3);
    const [toeNum, setToeNum] = useState(3);

    /**
     * 设置游戏模式
     */
    const editGameMode = (value: boolean) => {
        setIsFive(value);
        setGameName(value ? '五子棋' : '井字棋');
        setBoardSize(value ? 15 : 3);
        setToeNum(value ? 5 : 3);
    };
    return (
        <div
            className="transition-margin-1000 transition-ease-out "
            style={{ marginTop: gameStart ? '0px' : '200px' }}
        >
            <h1 className="color-#000">{gameStart ? gameName : '棋盘游戏'}</h1>
            {!gameStart && (
                <div className="color-#000">
                    <Setting isfive={isFive} setIsfive={editGameMode}></Setting>
                    <div className="mt-30">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setGameStart(true)}
                        >
                            开始游戏
                        </Button>
                    </div>
                </div>
            )}
            {gameStart && (
                <>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setGameStart(false)}
                    >
                        返回主页
                    </Button>
                    <div className="flex-cc transition-all mt-20">
                        <Checkerboard
                            boardSize={boardSize}
                            toeSize={toeNum}
                        ></Checkerboard>
                    </div>
                </>
            )}
        </div>
    );
};
export default GameIndex;
