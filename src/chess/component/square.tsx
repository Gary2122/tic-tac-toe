import Grid from '@mui/material/Grid2';
interface SquareData{
    index: number,
    isnext: boolean,
    isFive: boolean,
    onClick:(index: number, isnext: boolean) => void
}

const Square:React.FC<SquareData> = ({index, isnext, onClick})=>{
    const handleClick = ()=>{
        onClick(index, isnext)
    }
    return(
        <>
            <Grid
             key={index}
                size={{xs:4}}
                sx={{ 
                minWidth:20,
                minHeight:60,
                background: 'orange',
                cursor: 'pointer',
                display:'flex',
                justifyContent: 'center',
                alignItems: 'center',
                '&:hover':{
                    opacity: 0.85
                },
                '&:active': {
                    transform: 'scale(0.95)'
                }
           }}
           onClick={handleClick}
        ></Grid>
        </>
    )
}

export default Square;