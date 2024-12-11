export const calculateWinner = (
    squares: Array<Array<string>>,
    winCondition: number // 胜利条件
): string | null => {
    const size = squares.length; // 棋盘大小

    //f(x)
    const checkDirection = (
        startX: number,
        startY: number,
        deltaX: number,
        deltaY: number
    ): boolean => {
        const player = squares[startX][startY];
        if (!player) return false;

        for (let step = 1; step < winCondition; step++) {
            const x = startX + deltaX * step;
            const y = startY + deltaY * step;

            if (
                x < 0 ||
                x >= size ||
                y < 0 ||
                y >= size ||
                squares[x][y] !== player
            ) {
                return false;
            }
        }
        return true;
    };

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (
                checkDirection(i, j, 1, 0) || // 检查横向
                checkDirection(i, j, 0, 1) || // 检查纵向
                checkDirection(i, j, 1, 1) || // 检查右下对角线
                checkDirection(i, j, 1, -1) // 检查左下对角线
            ) {
                return squares[i][j];
            }
        }
    }

    return null; // 没有赢家
};
