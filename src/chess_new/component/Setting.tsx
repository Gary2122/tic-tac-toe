import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import { chessConfig } from '../config/config';
import { setFightWithAI } from '../../store/modules/ChessState';
import { useDispatch, useSelector } from 'react-redux';
interface SettingProps {
    curGameMode: {
        value: string;
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
                                        setFightWithAI(item.value === 'ai')
                                    )
                                }
                            />
                        );
                    })}
                </RadioGroup>
            </FormControl>
        </div>
    );
};

export default Setting;
