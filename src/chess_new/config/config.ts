/* eslint-disable prettier/prettier */
/**
 * 棋盘配置
 */

export const chessConfig = {
    boardSize: {
        boardWidth: 350,
        boardHeight: 350,
    },
    fightMode: [
        {
            label: '人机对战',
            value: 'ai',
        },
        {
            label: '自由对战',
            value: 'human',
        },
    ],
    fightCondition: [
        {
            label: '先手',
            value: 'first',
        },
        {
            label: '后手',
            value: 'second',
        },
    ],
    gameMode: [
        {
            label: '井子棋',
            value: 'three',
            size: 3,
            boardNum: 3,
            isCommon: false,
            winCondition: 3,
            computerFight: true,
            toes: ['X', 'O'],
        },
        {
            label: '五子棋',
            value: 'five',
            size: 5,
            boardNum: 15,
            isCommon: true,
            winCondition: 5,
            computerFight: false,
            toes: ['black', 'white'],
        },
    ],
};
