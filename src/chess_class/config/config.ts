/* eslint-disable prettier/prettier */
/**
 * 棋盘配置
 */

export const chessConfig = {
    boardSize: {
        boardWidth: 350,
        boardHeight: 350,
    },
    gameMode: [
        {
            label: '井子棋',
            value: 'three',
            size: 3,
            boardNum: 3,
            isCommon: false,
            winCondition: 3,
            toes: ['X', 'O'],
        },
        {
            label: '五子棋',
            value: 'five',
            size: 5,
            boardNum: 15,
            isCommon: true,
            winCondition: 5,
            toes: ['black', 'white'],
        },
    ],
};
