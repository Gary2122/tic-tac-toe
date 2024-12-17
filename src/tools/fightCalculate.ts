/* eslint-disable no-else-return */
/**
 * AI算法
 */
const boardIsFull = (squares: string[][]): boolean => {
    for (let row_i = 0; row_i < squares.length; row_i++) {
        for (let col_j = 0; col_j < squares[row_i].length; col_j++) {
            if (squares[row_i][col_j] === '') {
                return false;
            }
        }
    }
    return true;
};
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
 * Minimax 算法
 * @param squares 棋盘
 * @param depth 当前深度
 * @param isMaximizing 是否是最大化阶段（AI行为）
 * @param isFirstPlayer 是否是AI先手
 */
const minimax = (
    squares: string[][],
    depth: number,
    isMaximizing: boolean,
    isFirstPlayer: boolean,
    AIRole: string,
    userRole: string
): number => {
    const score = evaluateBoard(squares, isFirstPlayer, AIRole, userRole);
    if (score === 10 || score === -10) return score;
    if (boardIsFull(squares)) return 0;

    if (isMaximizing) {
        // AI最大化得分（先手）
        let max = -10000;
        for (let row_i = 0; row_i < 3; row_i++) {
            for (let col_j = 0; col_j < 3; col_j++) {
                if (squares[row_i][col_j] === '') {
                    squares[row_i][col_j] = 'O';
                    const score = minimax(
                        squares,
                        depth + 1,
                        false,
                        isFirstPlayer,
                        AIRole,
                        userRole
                    );
                    squares[row_i][col_j] = '';
                    max = Math.max(max, score);
                }
            }
        }
        return max;
    } else {
        // 玩家最小化得分（后手）
        let min = 10000;
        for (let row_i = 0; row_i < 3; row_i++) {
            for (let col_j = 0; col_j < 3; col_j++) {
                if (squares[row_i][col_j] === '') {
                    squares[row_i][col_j] = 'X';
                    const score = minimax(
                        squares,
                        depth + 1,
                        true,
                        isFirstPlayer,
                        AIRole,
                        userRole
                    );
                    squares[row_i][col_j] = '';
                    min = Math.min(min, score);
                }
            }
        }
        return min;
    }
};

/**
 * 找到最佳的落子位置
 * @param squares 棋盘
 * @param isFirstPlayer 是否是AI先手
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

    const priorityMoves = [
        { row_i: 1, col_j: 1 }, // 中心
        { row_i: 0, col_j: 0 },
        { row_i: 0, col_j: 2 }, // 角落
        { row_i: 2, col_j: 0 },
        { row_i: 2, col_j: 2 },
        { row_i: 0, col_j: 1 },
        { row_i: 1, col_j: 0 }, // 边
        { row_i: 1, col_j: 2 },
        { row_i: 2, col_j: 1 },
    ];

    for (const { row_i, col_j } of priorityMoves) {
        if (newSquares[row_i][col_j] === '') {
            newSquares[row_i][col_j] = isFirstPlayer ? AIRole : userRole;
            const score = minimax(
                newSquares,
                0,
                !isFirstPlayer,
                isFirstPlayer,
                AIRole,
                userRole
            );
            newSquares[row_i][col_j] = '';
            if (
                (isFirstPlayer && score > bestScore) ||
                (!isFirstPlayer && score < bestScore)
            ) {
                bestScore = score;
                bestMove = { row_i, col_j };
            }
        }
    }

    return bestMove;
};
