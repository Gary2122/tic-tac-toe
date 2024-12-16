import React from 'react';
import '../../../../css/square.css';
import { connect } from 'react-redux';
import { setCurToeLoaction } from '../../../../store/modules/ChessState';
interface SquareProps {
    value: string;
    size: number;
    isCur: boolean;
    rowIndex: number;
    colIndex: number;
    isCommon: boolean;
    // squareClick: (rowIndex: number, colIndex: number) => void;
    setCurToeLoaction: (location: {
        rowIndex: number;
        colIndex: number;
    }) => void;
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
            nextProps.colIndex !== this.props.colIndex ||
            nextProps.isCommon !== this.props.isCommon
        );
    }
    /**
     * 鼠标点击事件
     */
    handleClick = (rowIndex: number, colIndex: number) => {
        this.props.setCurToeLoaction({
            rowIndex,
            colIndex,
        });
    };

    render() {
        const { value, size, isCur, rowIndex, colIndex, isCommon } = this.props;
        return (
            <div
                className="flex-cc b-solid b-cBlack square cursor-pointer bg-gray"
                style={{
                    width: size,
                    height: size,
                }}
                onClick={() => this.handleClick(rowIndex, colIndex)}
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
}
/**
 * 将 state 映射到 props
 */
const mapStateToProps = (state: {
    chess: {
        curRowIndex: number;
        curColIndex: number;
    };
}) => ({
    curRowIndex: state.chess.curRowIndex,
    curColIndex: state.chess.curColIndex,
});
/**
 * 将 state 映射到 props
 */
const mapDispatchToProps = {
    setCurToeLoaction,
};
export default connect(mapStateToProps, mapDispatchToProps)(Square);
