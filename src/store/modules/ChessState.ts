import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChessState {
    // AI对战
    fightWithAI: boolean;
    winner: string;
    history: string[][][];
    // historyLoactionArray: { rowIndex: number; colIndex: number }[];
    curRowIndex: number;
    curColIndex: number;
}

const initialState: ChessState = {
    fightWithAI: false,
    winner: '',
    history: [[]],
    // historyLoactionArray: [],
    curRowIndex: -1,
    curColIndex: -1,
};
/**
 * 初始化棋盘
 */
const createInitSquares = (boardNum: number) => {
    return Array.from({ length: boardNum }, () => new Array(boardNum).fill(''));
};
const chessSlice = createSlice({
    name: 'chess',
    initialState,
    reducers: {
        // 设置AI对战
        setFightWithAI: (state, action: PayloadAction<boolean>) => {
            state.fightWithAI = action.payload;
        },
        // 重置AI对战
        resetFightWithAI: (state) => {
            state.fightWithAI = false;
        },
        // 设置赢家
        setWinner: (state, action: PayloadAction<string>) => {
            state.winner = action.payload;
        },
        // 设置历史
        setHistory: (state, action: PayloadAction<string[][][]>) => {
            state.history = action.payload;
        },
        // 重置历史
        resetHistory: (state, action: PayloadAction<number>) => {
            const boardNum = action.payload;
            state.history = [createInitSquares(boardNum)];
        },
        // 设置当前下棋位置
        setCurToeLoaction: (
            state,
            action: PayloadAction<{ rowIndex: number; colIndex: number }>
        ) => {
            const { rowIndex, colIndex } = action.payload;
            state.curRowIndex = rowIndex;
            state.curColIndex = colIndex;
        },
        // 重置位置
        resetLocation: (state) => {
            state.curRowIndex = -1;
            state.curColIndex = -1;
        },
    },
});

export const {
    setWinner,
    setHistory,
    resetHistory,
    // setCurRowIndex,
    // setCurColIndex,
    resetLocation,
    setCurToeLoaction,
    setFightWithAI,
    resetFightWithAI,
} = chessSlice.actions;

export default chessSlice.reducer;
