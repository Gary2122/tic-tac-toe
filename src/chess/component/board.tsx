import FiveToe from "./fiveToe"
import ThreeToe from "./threeToe"
interface BoardProps {
    isFive: boolean,
    sendValueFromBoard: (value: string)=>void,
    sendValueOfWinner: (value: string)=>void
}
const Board:React.FC<BoardProps> = ({isFive, sendValueFromBoard, sendValueOfWinner}) => {
  const onDataFromFive = (value: string)=>{
    sendValueFromBoard(value);
  }
  const onDataFromThree = (value: string)=>{
    sendValueFromBoard(value)
  }
  const winnerOfFive = (value: string) =>{
    sendValueOfWinner(value)
  }
  const winnerOfThree = (value: string) => {
    sendValueOfWinner(value)
    console.log(value);
    
  }
  return isFive ? <FiveToe sendValueFromFive={onDataFromFive} sendWinnerValue={winnerOfFive}></FiveToe>:
  <ThreeToe sendValueFromThree={onDataFromThree} sendWinnerValue={winnerOfThree}></ThreeToe>
}
export default Board