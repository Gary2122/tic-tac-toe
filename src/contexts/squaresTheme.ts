import { createContext } from 'react';
import { chessConfig } from '../config/config';

export const BoardThemeContext = createContext(chessConfig.boardTheme.gray);
