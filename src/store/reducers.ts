import { combineReducers } from '@reduxjs/toolkit';
import ChessReducer from './modules/ChessState';
const reducers = combineReducers({
    chess: ChessReducer,
});
export default reducers;
