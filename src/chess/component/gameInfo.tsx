import React from "react";

interface GameInfoProps {
    isFive: boolean,
    user: string,
    winner: string,
    resetUser: (value:string)=>void,
    resetWinner: (value: string) => void
}

const GameInfo:React.FC<GameInfoProps> = ({ user, winner})=>{
    // const resetGame = ()=> {
    //     resetUser(isFive ? 'X' : 'black')
    //     resetWinner('')
    // }
    return (
        <> 
           {!winner && <div className="flex-cc">
                下一个玩家：<div className="w-20">{user}</div>
            </div>}
            {/* {
                winner && <div>游戏结束~ 赢家：{winner} <button className="ml-20" onClick={resetGame}>重新开始</button></div>
            } */}
        </>
    )
}

export default GameInfo