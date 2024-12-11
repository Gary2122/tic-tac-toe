import FiveToe from "./fiveToe"
import ThreeToe from "./threeToe"
import React from 'react';
interface BoardProps {
    isFive: boolean,
}
const Checkerboard:React.FC<BoardProps> = ({isFive}) => {
  return isFive ? <FiveToe ></FiveToe>:
  <ThreeToe ></ThreeToe>
}
export default Checkerboard