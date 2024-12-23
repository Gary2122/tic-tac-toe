import React, { useState } from 'react';
import Checkerboard from './component/Checkerboard';
import Setting from './component/Setting';
import { Button } from '@mui/material';
import { chessConfig } from './config/config';
/**
 * 棋盘主页
 */
const GameIndex: React.FC = () => {
    const [gameStart, setGameStart] = useState(false);

    const [curGameConfig, setCurGameConfig] = useState(chessConfig.gameMode[0]);
    /**
     * 设置游戏模式
     */
    const editGameMode = (value: object) => {
        setCurGameConfig(
            value as {
                label: string;
                value: string;
                size: number;
                winCondition: number;
                boardNum: number;
                toes: string[];
            }
        );
    };
    return (
        <div
            className="transition-margin-1000 transition-ease-out "
            style={{ marginTop: gameStart ? '0px' : '200px' }}
        >
            <h1 className="color-#000">
                {gameStart ? curGameConfig.label : '棋盘游戏'}
            </h1>
            {!gameStart && (
                <div className="color-#000">
                    <Setting
                        curGameMode={curGameConfig}
                        changeGameMode={editGameMode}
                    ></Setting>
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
                        <Checkerboard gameConfig={curGameConfig}></Checkerboard>
                    </div>
                </>
            )}
        </div>
    );
};
export default GameIndex;
