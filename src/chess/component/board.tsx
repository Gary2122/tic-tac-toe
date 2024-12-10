import FiveToe from "./fiveToe"
import ThreeToe from "./threeToe"
interface BoardProps {
    isFive: boolean,
}
const Board:React.FC<BoardProps> = ({isFive}) => {
  return isFive ? <FiveToe ></FiveToe>:
  <ThreeToe ></ThreeToe>
}
export default Board