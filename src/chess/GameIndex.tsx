import React, { useState } from "react"
import Checkerboard from "./component/Checkerboard"
import Setting from "./component/Setting"
import { Button } from '@mui/material';
const GameIndex: () => JSX.Element = ()=> {
    const [isFive, setIsFive] = useState(false)
    const [gameStart, setGameStart] = useState(false)
    const [gameName, setGameName] = useState('井字棋')
    const editGameMode = (value:boolean)=>{
        setIsFive(value)
        setGameName(value ? "五子棋" : "井字棋")
    }
    return(
        <div className="transition-all-1000 transition-ease-out " style={{marginTop: gameStart ? "0px" : "200px"}}>
        <h1 className=''>{gameStart ? gameName : '棋盘游戏'}</h1>
        {!gameStart && (
          <div><Setting isfive={isFive} setIsfive={editGameMode}></Setting>
          <div className="mt-30"><Button variant="contained" color="primary" onClick={()=>setGameStart(true)}>开始游戏</Button></div>
        </div>
        )}
        {gameStart && (
          <>
          <Button variant="contained" color="primary" onClick={()=>setGameStart(false)}>返回主页</Button>
          <div className="flex-cc transition-all mt-20">
            <Checkerboard isFive={isFive} ></Checkerboard>
          </div>
          </>
        )}
        </div>
    )
}
export default GameIndex