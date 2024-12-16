import React from 'react';
import '../../../../css/square.css';
import { useDispatch } from 'react-redux';
import {
    setCurColIndex,
    setCurRowIndex,
} from '../../../../store/modules/ChessState';
interface SquareProps {
    value: string;
    size: number;
    isCur: boolean;
    rowIndex: number;
    colIndex: number;
    // squareClick: (rowIndex: number, colIndex: number) => void;
}
/**
 * 棋子部分
 */
const Square: React.FC<SquareProps> = React.memo(
    ({ value, size, rowIndex, colIndex, isCur }: SquareProps) => {
        console.log('square render');
        const dispatch = useDispatch();
        /**
         * 鼠标点击事件
         */
        const handleClick = (rowIndex: number, colIndex: number) => {
            dispatch(setCurRowIndex(rowIndex));
            dispatch(setCurColIndex(colIndex));
        };
        return (
            <div
                className="square cursor-pointer bg-gray"
                style={{
                    width: size,
                    height: size,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #000',
                }}
                onClick={() => handleClick(rowIndex, colIndex)}
            >
                {value === 'white' || value === 'black' ? (
                    <div
                        className="flex-cc"
                        style={{
                            width: '80%',
                            height: '80%',
                            backgroundColor: value,
                            borderRadius: '50%',
                        }}
                    >
                        {isCur && (
                            <div
                                className="bg-red"
                                style={{
                                    width: '20%',
                                    height: '20%',
                                    borderRadius: '50%',
                                }}
                            ></div>
                        )}
                    </div>
                ) : (
                    <div style={{ fontSize: '30px' }}>{value}</div>
                )}
            </div>
        );
    }
);
export default Square;
