import React from 'react';
import '../../../../css/square.css';
import { useDispatch } from 'react-redux';
import {
    // setCurColIndex,
    // setCurRowIndex,
    setCurToeLoaction,
} from '../../../../store/modules/ChessState';
import { BoardThemeContext } from '../../../../contexts/squaresTheme';
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
        const boardTheme = React.useContext(BoardThemeContext);
        /**
         * 鼠标点击事件(缓存)
         */
        const memorizedClick = React.useCallback(() => {
            dispatch(setCurToeLoaction({ rowIndex, colIndex }));
        }, [dispatch, rowIndex, colIndex]);
        /**
         * 鼠标点击事件
         */
        // const handleClick = (rowIndex: number, colIndex: number) => {
        //     dispatch(setCurToeLoaction({ rowIndex, colIndex }));
        // };
        return (
            <div
                className="square cursor-pointer bg-#fff flex-cc border-solid border-black"
                style={{
                    width: size,
                    height: size,
                    backgroundColor: boardTheme.background,
                }}
                onClick={memorizedClick}
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
