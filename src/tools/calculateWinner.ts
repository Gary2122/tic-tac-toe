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
