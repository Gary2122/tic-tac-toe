import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChessState {
    winner: string;
    history: string[][][];
}

const initialState: ChessState = {
    winner: '',
    history: [[]],
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
    },
});

export const { setWinner, setHistory, resetHistory } = chessSlice.actions;

export default chessSlice.reducer;
