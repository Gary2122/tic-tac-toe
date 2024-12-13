import React from 'react';
import Checkerboard from './component/Checkerboard';
import Setting from './component/Setting';
import { Button } from '@mui/material';
import { chessConfig } from './config/config';

interface GameState {
    gameStart: boolean;
    curGameConfig: {
        label: string;
        value: string;
        size: number;
        winCondition: number;
        boardNum: number;
        toes: string[];
    };
}
/**
 * 棋盘主页 - Class 组件版本
 */
class GameIndex extends React.Component<object, GameState> {
    constructor(props: object) {
        super(props);
        this.state = {
            gameStart: false,
            curGameConfig: chessConfig.gameMode[0],
        };
    }

    /**
     * 设置游戏模式
     */
    editGameMode = (value: object) => {
        this.setState({
            curGameConfig: value as {
                label: string;
                value: string;
                size: number;
                winCondition: number;
                boardNum: number;
                toes: string[];
            },
        });
    };

    render() {
        const { gameStart, curGameConfig } = this.state;

        return (
            <div
                className="transition-margin-1000 transition-ease-out"
                style={{ marginTop: gameStart ? '0px' : '200px' }}
            >
                <h1 className="color-#000">
                    {gameStart ? curGameConfig.label : '棋盘游戏'}
                </h1>
                {!gameStart && (
                    <div className="color-#000">
                        <Setting
                            curGameMode={curGameConfig}
                            changeGameMode={this.editGameMode}
                        ></Setting>
                        <div className="mt-30">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() =>
                                    this.setState({ gameStart: true })
                                }
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
                            onClick={() => this.setState({ gameStart: false })}
                        >
                            返回主页
                        </Button>
                        <div className="flex-cc transition-all mt-20">
                            <Checkerboard
                                gameConfig={curGameConfig}
                            ></Checkerboard>
                        </div>
                    </>
                )}
            </div>
        );
    }
}

export default GameIndex;
