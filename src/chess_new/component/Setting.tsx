import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import { chessConfig } from '../config/config';
import { setFightWithAI, setAIFirst } from '../../store/modules/ChessState';
import { useDispatch, useSelector } from 'react-redux';
interface SettingProps {
    curGameMode: {
        value: string;
        computerFight: boolean;
    };
    changeGameMode: (value: object) => void;
}
/**
 * 设置游戏模式
 */
const Setting: React.FC<SettingProps> = ({ curGameMode, changeGameMode }) => {
    const dispatch = useDispatch();
    const chessState = useSelector(
        (store: {
            chess: {
                fightWithAI: boolean;
                AIFirst: boolean;
            };
        }) => store.chess
    );
    /**
     * 设置游戏模式
     */
    const handleRadioClick = (value: object) => {
        changeGameMode(value);
    };
    return (
        <div className="flex-cc">
            <FormControl>
                <h2 className="color-cDanger">请选择游戏模式：</h2>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={curGameMode.value}
                    name="radio-buttons-group"
                    row
                >
                    {chessConfig.gameMode.map((item, index) => {
                        return (
                            <FormControlLabel
                                key={index}
                                value={item.value}
                                control={<Radio />}
                                label={item.label}
                                onChange={() =>
                                    handleRadioClick(
                                        chessConfig.gameMode[index]
                                    )
                                }
                            />
                        );
                    })}
                </RadioGroup>
                {curGameMode.computerFight && (
                    <div>
                        <h2 className="color-cDanger">请选择对战模式：</h2>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            value={chessState.fightWithAI ? 'ai' : 'human'}
                            name="game-mode"
                            row
                        >
                            {chessConfig.fightMode.map((item, index) => {
                                return (
                                    <FormControlLabel
                                        key={index}
                                        value={item.value}
                                        control={<Radio />}
                                        label={item.label}
                                        onChange={() =>
                                            dispatch(
                                                setFightWithAI(
                                                    item.value === 'ai'
                                                )
                                            )
                                        }
                                    />
                                );
                            })}
                        </RadioGroup>
                        {chessState.fightWithAI && (
                            <div>
                                <h2 className="color-cDanger">
                                    请选择人机先手后手
                                </h2>
                                <div className="flex-cc">
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        value={
                                            chessState.AIFirst
                                                ? 'first'
                                                : 'second'
                                        }
                                        name="game-mode"
                                        row
                                    >
                                        {chessConfig.fightCondition.map(
                                            (item, index) => {
                                                return (
                                                    <FormControlLabel
                                                        key={index}
                                                        value={item.value}
                                                        control={<Radio />}
                                                        label={item.label}
                                                        onChange={() =>
                                                            dispatch(
                                                                setAIFirst(
                                                                    item.value ===
                                                                        'first'
                                                                )
                                                            )
                                                        }
                                                    />
                                                );
                                            }
                                        )}
                                    </RadioGroup>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </FormControl>
        </div>
    );
};

export default Setting;
