import React from 'react';
import '../../../../css/square.css';
interface SquareProps {
    value: string;
    size: number;
    isCur: boolean;
    rowIndex: number;
    colIndex: number;
    squareClick: (rowIndex: number, colIndex: number) => void;
}
interface SquareState {
    isCur: boolean;
}
/**
 * 棋子部分
 */
class Square extends React.Component<SquareProps, SquareState> {
    constructor(props: SquareProps) {
        super(props);
    }
    // 只在 value, size, isCur 或 rowIndex, colIndex 变化时重新渲染
    shouldComponentUpdate(nextProps: SquareProps) {
        return (
            nextProps.value !== this.props.value ||
            nextProps.size !== this.props.size ||
            nextProps.isCur !== this.props.isCur ||
            nextProps.rowIndex !== this.props.rowIndex ||
            nextProps.colIndex !== this.props.colIndex
        );
    }
    /**
     * 鼠标点击事件
     */
    handleClick = (rowIndex: number, colIndex: number) => {
        this.props.squareClick(rowIndex, colIndex);
    };

    render() {
        const { value, size, isCur, rowIndex, colIndex } = this.props;
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
                onClick={() => this.handleClick(rowIndex, colIndex)}
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
}
export default Square;
