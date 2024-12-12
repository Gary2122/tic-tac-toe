/**
 * 计算胜利者
 * @param squares 棋盘
 * @param winCondition 胜利条件
 */
export const calculateWinner = (
    squares: Array<Array<string>>,
    winCondition: number // 胜利条件
): string | null => {
    const size = squares.length; // 棋盘大小

    /**
     * 方向计算
     */
    const checkDirection = (
        startX: number,
        startY: number,
        deltaX: number,
        deltaY: number
    ): boolean => {
        const player = squares[startX][startY];
        if (!player) return false;

        for (let step = 1; step < winCondition; step++) {
            const index_x = startX + deltaX * step;
            const index_y = startY + deltaY * step;

            if (
                index_x < 0 ||
                index_x >= size ||
                index_y < 0 ||
                index_y >= size ||
                squares[index_x][index_y] !== player
            ) {
                return false;
            }
        }
        return true;
    };

    for (let row_i = 0; row_i < size; row_i++) {
        for (let col_j = 0; col_j < size; col_j++) {
            if (
                checkDirection(row_i, col_j, 1, 0) || // 检查横向
                checkDirection(row_i, col_j, 0, 1) || // 检查纵向
                checkDirection(row_i, col_j, 1, 1) || // 检查右下对角线
                checkDirection(row_i, col_j, 1, -1) // 检查左下对角线
            ) {
                return squares[row_i][col_j];
            }
        }
    }

    return null; // 没有赢家
};
