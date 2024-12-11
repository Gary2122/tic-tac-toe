export const calculateThreeWinner = (squares: Array<Array<string>>) => {
  // 检查行、列和对角线
  for (let i = 0; i < 3; i++) {
    // 行
    if (
      squares[i][0] &&
      squares[i][0] === squares[i][1] &&
      squares[i][1] === squares[i][2]
    ) {
      return squares[i][0];
    }
    // 列
    if (
      squares[0][i] &&
      squares[0][i] === squares[1][i] &&
      squares[1][i] === squares[2][i]
    ) {
      return squares[0][i];
    }
  }
  // 对角线
  if (
    squares[0][0] &&
    squares[0][0] === squares[1][1] &&
    squares[1][1] === squares[2][2]
  ) {
    return squares[0][0];
  }
  if (
    squares[0][2] &&
    squares[0][2] === squares[1][1] &&
    squares[1][1] === squares[2][0]
  ) {
    return squares[0][2];
  }
  return null;
};
export const calculateWinner = (
  squares: Array<Array<string>>, // 棋盘的二维数组
  winCondition: number // 胜利条件，例如 3 表示井字棋，5 表示五子棋
): string | null => {
  const size = squares.length; // 棋盘大小

  // 检查某个方向是否满足胜利条件
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

  // 遍历棋盘检查每个点作为起点
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

export const calculateFiveWinner = (squares: Array<Array<string>>) => {
  for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 15; j++) {
      if (squares[i][j] === "") {
        continue;
      }
      // 判断左边
      if (j >= 5) {
        let num = 1;
        for (let k = 1; k < 5; k++) {
          if (squares[i][j - k] === squares[i][j]) {
            num++;
          } else {
            break;
          }
        }
        if (num >= 5) {
          return squares[i][j];
        }
      }
      // 判断上边
      if (i >= 5) {
        let num = 1;
        for (let k = 1; k < 5; k++) {
          if (squares[i - k][j] === squares[i][j]) {
            num++;
          } else {
            break;
          }
        }
        if (num >= 5) {
          return squares[i][j];
        }
      }
      // 判断右边
      if (j <= 10) {
        let num = 1;
        for (let k = 1; k < 5; k++) {
          if (squares[i][j + k] === squares[i][j]) {
            num++;
          } else {
            break;
          }
        }
        if (num >= 5) {
          return squares[i][j];
        }
      }
      // 判断下边
      if (i <= 10) {
        let num = 1;
        for (let k = 1; k < 5; k++) {
          if (squares[i + k][j] === squares[i][j]) {
            num++;
          } else {
            break;
          }
        }
        if (num >= 5) {
          return squares[i][j];
        }
      }
      // 判断左上
      if (i >= 5 && j >= 5) {
        let num = 1;
        for (let k = 1; k < 5; k++) {
          if (squares[i - k][j - k] === squares[i][j]) {
            num++;
          } else {
            break;
          }
        }
        if (num >= 5) {
          return squares[i][j];
        }
      }
      // 判断右上
      if (i <= 10 && j >= 5) {
        let num = 1;
        for (let k = 1; k < 5; k++) {
          if (squares[i + k][j - k] === squares[i][j]) {
            num++;
          } else {
            break;
          }
        }
        if (num >= 5) {
          return squares[i][j];
        }
      }
      // 判断左下
      if (i >= 5 && j <= 10) {
        let num = 1;
        for (let k = 1; k < 5; k++) {
          if (squares[i - k][j + k] === squares[i][j]) {
            num++;
          } else {
            break;
          }
        }
        if (num >= 5) {
          return squares[i][j];
        }
      }
      // 判断右下
      if (i <= 10 && j <= 10) {
        let num = 1;
        for (let k = 1; k < 5; k++) {
          if (squares[i + k][j + k] === squares[i][j]) {
            num++;
          } else {
            break;
          }
        }
        if (num >= 5) {
          return squares[i][j];
        }
      }
    }
  }
};
