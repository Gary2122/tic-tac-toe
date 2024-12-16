import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChessState {
    winner: string;
    history: string[][][];
    curRowIndex: number;
    curColIndex: number;
}

const initialState: ChessState = {
    winner: '',
    history: [[]],
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
        setWinner: (state, action: PayloadAction<string>) => {
            state.winner = action.payload;
        },
        setHistory: (state, action: PayloadAction<string[][][]>) => {
            state.history = action.payload;
        },
        resetHistory: (state, action: PayloadAction<number>) => {
            const boardNum = action.payload;
            state.history = [createInitSquares(boardNum)];
        },
        setCurRowIndex: (state, action: PayloadAction<number>) => {
            state.curRowIndex = action.payload;
        },
        setCurColIndex: (state, action: PayloadAction<number>) => {
            state.curColIndex = action.payload;
        },
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
    setCurRowIndex,
    setCurColIndex,
    resetLocation,
} = chessSlice.actions;

export default chessSlice.reducer;
