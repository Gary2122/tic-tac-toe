import React from 'react';
import '../../../../css/square.css';
interface SquareProps {
    value: string;
    size: number;
    isCur: boolean;
    squareClick: () => void;
}
/**
 * 棋子部分
 */
const Square: React.FC<SquareProps> = React.memo(
    ({ value, size, isCur, squareClick }: SquareProps) => {
        console.warn('渲染了');
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
                onClick={squareClick}
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
