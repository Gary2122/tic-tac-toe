/**
 * 评估棋盘状态的函数
 * @param squares 棋盘
 * @param isFirstPlayer 是否是AI先手
 */
const evaluateBoard = (
    squares: string[][],
    isFirstPlayer: boolean,
    AIRole: string,
    userRole: string
): number => {
    /**
     * 检查行、列和对角线是否有获胜的组合
     */
    const checkLine = (
        element1: string,
        element2: string,
        element3: string
    ) => {
        if (element1 === element2 && element2 === element3) {
            if (element1 === AIRole) return isFirstPlayer ? 10 : -10;
            if (element1 === userRole) return isFirstPlayer ? -10 : 10;
        }
        return 0;
    };

    // 检查行
    for (let row_index = 0; row_index < 3; row_index++) {
        const score = checkLine(
            squares[row_index][0],
            squares[row_index][1],
            squares[row_index][2]
        );
        if (score !== 0) return score;
    }

    // 检查列
    for (let col_index = 0; col_index < 3; col_index++) {
        const score = checkLine(
            squares[0][col_index],
            squares[1][col_index],
            squares[2][col_index]
        );
        if (score !== 0) return score;
    }

    // 检查对角线
    const diagonal1 = checkLine(squares[0][0], squares[1][1], squares[2][2]);
    if (diagonal1 !== 0) return diagonal1;

    const diagonal2 = checkLine(squares[0][2], squares[1][1], squares[2][0]);
    return diagonal2; // 返回第二条对角线的结果或0（平局）
};

/**
 * 判断棋盘是否已满
 */
const boardIsFull = (squares: string[][]): boolean => {
    return squares.every((row) => row.every((cell) => cell !== ''));
};

/**
 * 获取空格位置
 */
const getEmptySpaces = (
    squares: string[][]
): Array<{ rowIndex: number; colIndex: number }> => {
    const emptySpaces: Array<{ rowIndex: number; colIndex: number }> = [];
    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
        for (let colIndex = 0; colIndex < 3; colIndex++) {
            if (squares[rowIndex][colIndex] === '') {
                emptySpaces.push({ rowIndex, colIndex });
            }
        }
    }
    return emptySpaces;
};

/**
 * 获取空格位置
 */
const minimaxWithAlphaBeta = (
    squares: string[][],
    depth: number,
    alpha: number,
    beta: number,
    isMaximizing: boolean,
    isFirstPlayer: boolean,
    AIRole: string,
    userRole: string
): number => {
    const score = evaluateBoard(squares, isFirstPlayer, AIRole, userRole);
    if (score === 10 || score === -10) return score;
    if (boardIsFull(squares)) return 0;

    if (isMaximizing) {
        let max = -10000;
        const emptySpaces = getEmptySpaces(squares);
        emptySpaces.forEach(({ rowIndex, colIndex }) => {
            squares[rowIndex][colIndex] = AIRole;
            const score = minimaxWithAlphaBeta(
                squares,
                depth + 1,
                alpha,
                beta,
                false,
                isFirstPlayer,
                AIRole,
                userRole
            );
            squares[rowIndex][colIndex] = '';
            max = Math.max(max, score);
            alpha = Math.max(alpha, max);
            if (beta <= alpha) return; // 剪枝
        });
        return max;
    }
    let min = 10000;
    const emptySpaces = getEmptySpaces(squares);

    emptySpaces.forEach(({ rowIndex, colIndex }) => {
        squares[rowIndex][colIndex] = userRole;
        const score = minimaxWithAlphaBeta(
            squares,
            depth + 1,
            alpha,
            beta,
            true,
            isFirstPlayer,
            AIRole,
            userRole
        );
        squares[rowIndex][colIndex] = '';
        min = Math.min(min, score);
        beta = Math.min(beta, min);
        if (beta <= alpha) return; // 剪枝
    });
    return min;
};
/**
 * 获取空格位置
 */
export const findBestMove = (
    squares: string[][],
    isFirstPlayer: boolean,
    AIRole: string,
    userRole: string
) => {
    const newSquares = JSON.parse(JSON.stringify(squares));
    let bestScore = isFirstPlayer ? -10000 : 10000;
    let bestMove = null;

    const emptySpaces = getEmptySpaces(newSquares);
    for (const { rowIndex, colIndex } of emptySpaces) {
        newSquares[rowIndex][colIndex] = isFirstPlayer ? AIRole : userRole;
        const score = minimaxWithAlphaBeta(
            newSquares,
            0,
            -10000,
            10000,
            !isFirstPlayer,
            isFirstPlayer,
            AIRole,
            userRole
        );
        newSquares[rowIndex][colIndex] = '';
        if (
            (isFirstPlayer && score > bestScore) ||
            (!isFirstPlayer && score < bestScore)
        ) {
            bestScore = score;
            bestMove = { rowIndex, colIndex };
        }
    }

    return bestMove;
};

// /**
//  * Minimax 算法
//  * @param squares 棋盘
//  * @param depth 当前深度
//  * @param isMaximizing 是否是最大化阶段（AI行为）
//  * @param isFirstPlayer 是否是AI先手
//  */
// const minimax = (
//     squares: string[][],
//     depth: number,
//     isMaximizing: boolean,
//     isFirstPlayer: boolean,
//     AIRole: string,
//     userRole: string
// ): number => {
//     const score = evaluateBoard(squares, isFirstPlayer, AIRole, userRole);
//     if (score === 10 || score === -10) return score;
//     if (boardIsFull(squares)) return 0;

//     if (isMaximizing) {
//         // AI最大化得分（先手）
//         let max = -10000;
//         const emptySpaces = getEmptySpaces(squares);

//         emptySpaces.forEach(({ rowIndex, colIndex }) => {
//             squares[rowIndex][colIndex] = AIRole;
//             const score = minimax(
//                 squares,
//                 depth + 1,
//                 false,
//                 isFirstPlayer,
//                 AIRole,
//                 userRole
//             );
//             squares[rowIndex][colIndex] = '';
//             max = Math.max(max, score);
//         });
//         return max;
//     }
//     // 玩家最小化得分（后手）
//     let min = 10000;

//     const emptySpaces = getEmptySpaces(squares);
//     emptySpaces.forEach(({ rowIndex, colIndex }) => {
//         squares[rowIndex][colIndex] = userRole;
//         const score = minimax(
//             squares,
//             depth + 1,
//             true,
//             isFirstPlayer,
//             AIRole,
//             userRole
//         );
//         squares[rowIndex][colIndex] = '';
//         min = Math.min(min, score);
//     });
//     return min;
// };
