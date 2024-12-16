import React from 'react';
import '../../../../css/square.css';
import { useDispatch } from 'react-redux';
import {
    // setCurColIndex,
    // setCurRowIndex,
    setCurToeLoaction,
} from '../../../../store/modules/ChessState';
interface SquareProps {
    value: string;
    size: number;
    isCur: boolean;
    isCommon: boolean;
    rowIndex: number;
    colIndex: number;
    // squareClick: (rowIndex: number, colIndex: number) => void;
}
/**
 * 棋子部分
 */
const Square: React.FC<SquareProps> = React.memo(
    ({ value, size, rowIndex, colIndex, isCur, isCommon }: SquareProps) => {
        const dispatch = useDispatch();
        /**
         * 鼠标点击事件
         */
        const handleClick = (rowIndex: number, colIndex: number) => {
            dispatch(setCurToeLoaction({ rowIndex, colIndex }));
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
                {isCommon ? (
                    <div
                        className="flex-cc w-80% h-80% br-50"
                        style={{
                            backgroundColor: value,
                        }}
                    >
                        {isCur && (
                            <div className="bg-red w-20% h-20% br-50"></div>
                        )}
                    </div>
                ) : (
                    <div className="fs-30">{value}</div>
                )}
            </div>
        );
    }
);
export default Square;
