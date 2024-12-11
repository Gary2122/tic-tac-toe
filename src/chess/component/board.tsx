import FiveToe from "./fiveToe"
import ThreeToe from "./threeToe"
import React from 'react';
interface BoardProps {
    isFive: boolean,
}
const Board:React.FC<BoardProps> = ({isFive}) => {
  return isFive ? <FiveToe ></FiveToe>:
  <ThreeToe ></ThreeToe>
}
export default Board