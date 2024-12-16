import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { chessConfig } from '../config/config';

interface SettingProps {
    curGameMode: {
        label: string;
        value: string;
        size: number;
        winCondition: number;
        boardNum: number;
        toes: string[];
    };
    changeGameMode: (value: object) => void;
}

interface SettingState {
    curGameMode: {
        label: string;
        value: string;
        size: number;
        winCondition: number;
        boardNum: number;
        toes: string[];
    };
}

/**
 * 设置游戏模式
 */
class Setting extends React.Component<SettingProps, SettingState> {
    constructor(props: SettingProps) {
        super(props);
    }

    /**
     * 设置游戏模式
     */
    handleRadioClick = (item: object) => {
        this.setState(
            {
                curGameMode: item as {
                    label: string;
                    value: string;
                    size: number;
                    winCondition: number;
                    boardNum: number;
                    toes: string[];
                },
            },
            () => {
                this.props.changeGameMode(item);
            }
        );
    };

    render(): React.ReactNode {
        return (
            <div className="flex-cc">
                <FormControl>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        value={this.props.curGameMode.value}
                        name="radio-buttons-group"
                        row
                        onChange={(event) => {
                            const selectedValue = event.target.value;
                            const selectedItem = chessConfig.gameMode.find(
                                (item) => item.value === selectedValue
                            );
                            if (selectedItem) {
                                this.handleRadioClick(selectedItem);
                            }
                        }}
                    >
                        {chessConfig.gameMode.map((item, index) => (
                            <FormControlLabel
                                key={index}
                                value={item.value}
                                control={<Radio />}
                                label={item.label}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            </div>
        );
    }
}

export default Setting;
