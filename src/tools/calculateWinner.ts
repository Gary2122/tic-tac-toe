/* eslint-disable @netsells/require-jsdoc-except/require-jsdoc */
/**
 * 计算胜利者
 * @param squares 棋盘
 * @param winCondition 胜利条件
 * @param row_index 行位置
 * @param col_index 列位置
 */
export const calculateWinner = (
    squares: Array<Array<string>>,
    winCondition: number,
    row_index: number,
    col_index: number
): string | null => {
    const size = squares.length; // 棋盘大小

    const checkDirection = (
        startX: number,
        startY: number,
        deltaX: number,
        deltaY: number
    ): boolean => {
        const player = squares[startX][startY];
        if (!player) return false;

        let count = 1;

        // 向一个方向移动，计算连成一线的棋子数量
        for (let step = 1; step < winCondition; step++) {
            const nextX = startX + deltaX * step;
            const nextY = startY + deltaY * step;

            if (
                nextX < 0 ||
                nextX >= size ||
                nextY < 0 ||
                nextY >= size ||
                squares[nextX][nextY] !== player
            ) {
                break;
            }
            count++;
        }

        // 向反方向移动，计算连成一线的棋子数量
        for (let step = 1; step < winCondition; step++) {
            const prevX = startX - deltaX * step;
            const prevY = startY - deltaY * step;

            if (
                prevX < 0 ||
                prevX >= size ||
                prevY < 0 ||
                prevY >= size ||
                squares[prevX][prevY] !== player
            ) {
                break;
            }
            count++;
        }

        return count >= winCondition;
    };

    // 检查四个方向
    if (
        checkDirection(row_index, col_index, 1, 0) || // 检查横向
        checkDirection(row_index, col_index, 0, 1) || // 检查纵向
        checkDirection(row_index, col_index, 1, 1) || // 检查右下对角线
        checkDirection(row_index, col_index, 1, -1) // 检查左下对角线
    ) {
        return squares[row_index][col_index]; // 返回胜利者
    }

    return null; // 没有赢家
};
