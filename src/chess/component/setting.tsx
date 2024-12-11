import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import React from 'react';
interface SettingProps {
    isfive: boolean;
    setIsfive: (value: boolean) => void;
}
const Setting: React.FC<SettingProps> = ({ isfive, setIsfive }) => {
    const handleRadioClick = (value: boolean) => {
        setIsfive(value);
    };
    return (
        <div className="flex-cc">
            <FormControl>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={isfive ? 'game2' : 'game1'}
                    name="radio-buttons-group"
                    row
                >
                    <FormControlLabel
                        value="game1"
                        control={<Radio />}
                        label="井字棋"
                        onChange={() => handleRadioClick(false)}
                    />
                    <FormControlLabel
                        value="game2"
                        control={<Radio />}
                        label="五子棋"
                        onChange={() => handleRadioClick(true)}
                    />
                </RadioGroup>
            </FormControl>
        </div>
    );
};

export default Setting;
