import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { chessConfig } from '../config/config';
import React from 'react';
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
    /**
     * 设置游戏模式
     */
    const handleRadioClick = (value: object) => {
        changeGameMode(value);
    };
    return (
        <div className="flex-cc">
            <FormControl>
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
            </FormControl>
        </div>
    );
};

export default Setting;
