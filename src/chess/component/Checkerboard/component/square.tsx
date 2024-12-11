import React from "react"


interface squareProps{
    col: string,
    rowIndex: number,
    colIndex: number,
    winner: string,
    boardSize: number
}

const Square:React.FC<squareProps> = ({col, rowIndex, colIndex, winner, boardSize})=>{
    const handleClick = (rowIndex:number, colIndex:number, winner:string)=>{
        
    }
    return(
        <td key={colIndex}
                                style={{border: '1px solid #000', width:  `${350 / boardSize}px`, height: `${350 / boardSize}px`}}
                                onClick={()=>handleClick( rowIndex, colIndex, winner)}
                      >
                        {(col === 'white' || col === 'black' )?
                          <div
                            style={{
                              width: '100%',
                              height: '100%',
                              backgroundColor: col,
                              borderRadius: '50%',
                              position: "relative",
                            }}></div>
                          : <div className='fs-30'>{col}
                            </div>}
                      </td>
    )
}

export default Square;