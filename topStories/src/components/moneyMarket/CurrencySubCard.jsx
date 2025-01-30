import { Box, Typography } from "@mui/material"

const CurrencySubCard = ({money}) => {
    console.log("money--------",money)
    const {displayName,changePcnt,price} = money
    return (
        <Box sx={{my:"10px",mr:"3px",px:"20px",backgroundColor:"#f3f3f3",width:"247px",height:"35px",display:"flex",flexDirection:"Row",justifyContent:"space-between"}}>
            <Typography sx={{width:"180px",height:"30px",pt:"2px"}} component={"div"}>
                <Typography sx={{fontSize:"0.8rem"}}>
                    {displayName}
                </Typography>
                <Typography sx={{fontSize:"0.7rem"}}>
                    {displayName}
                </Typography>
            </Typography>
            <Typography sx={{width:"55px",height:"15px",pr:"2px",pt:"2px"}} component={"div"}>
                <Typography sx={{fontSize:"11px", color:changePcnt?.[0]==="-"?"red":"green"}}>
                    {changePcnt}
                </Typography>
                <Typography sx={{fontSize:"small"}}>
                    {price}
                </Typography>
            </Typography>
        </Box>
    )
}

export default CurrencySubCard