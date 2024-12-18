import React, { useState } from 'react';
import Checkerboard from './component/Checkerboard';
import Setting from './component/Setting';
import { Button } from '@mui/material';
import { chessConfig } from '../config/config';
import { useDispatch } from 'react-redux';
import { BoardThemeContext } from '../contexts/squaresTheme';
import {
    resetLocation,
    resetAIFirst,
    resetHistory,
    setWinner,
} from '../store/modules/ChessState';
/**
 * 棋盘主页
 */
const GameIndex: React.FC = () => {
    const [gameStart, setGameStart] = useState(false);
    const [boardTheme, setBoardTheme] = useState(chessConfig.boardTheme.gray);
    const [curGameConfig, setCurGameConfig] = useState(chessConfig.gameMode[0]);
    const dispatch = useDispatch();
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
                computerFight: boolean;
                isCommon: boolean;
            }
        );
    };
    /**
     * 返回主页时候初始化
     */
    const initChessState = () => {
        dispatch(resetHistory(curGameConfig.boardNum));
        dispatch(resetLocation());
        dispatch(setWinner(''));
        dispatch(resetAIFirst());
        setGameStart(false);
    };

    /**
     * 切换棋盘风格
     */
    const changeBoardTheme = () => {
        // 主题配置
        const themes = [
            chessConfig.boardTheme.gray,
            chessConfig.boardTheme.orange,
            chessConfig.boardTheme.green,
        ];
        const currentIndex = themes.findIndex((theme) => theme === boardTheme);
        const nextIndex = (currentIndex + 1) % themes.length;

        setBoardTheme(themes[nextIndex]);
    };
    return (
        <div
            className="transition-margin-1000 transition-ease-out "
            style={{ marginTop: gameStart ? '0px' : '100px' }}
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
                        onClick={() => initChessState()}
                    >
                        返回主页
                    </Button>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => changeBoardTheme()}
                        style={{ marginLeft: '20px' }}
                    >
                        切换主题
                    </Button>
                    <div className="flex-cc transition-all mt-20">
                        <BoardThemeContext.Provider value={boardTheme}>
                            <Checkerboard
                                gameConfig={curGameConfig}
                            ></Checkerboard>
                        </BoardThemeContext.Provider>
                    </div>
                </>
            )}
        </div>
    );
};
export default GameIndex;
