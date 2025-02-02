import { Box, Menu, MenuList, Tooltip, Typography } from "@mui/material"
import PlotChart from "./PlotChart"
import { useState } from "react"

const CurrencySubCard = ({money}) => {
    const [menuOpen,setMenuOpen] = useState(false)
    console.log("money--------",money)
    const {displayName,changePcnt,price} = money
    return (
        <>
        <div onClick={()=>setMenuOpen(true)}>
            <Tooltip placement="right" arrow title="click to visualize">
                <Box  sx={{cursor:"pointer",my:"10px",mr:"3px",px:"20px",backgroundColor:"#f3f3f3",width:"247px",height:"35px",display:"flex",flexDirection:"Row",justifyContent:"space-between"}}>
                    <Typography sx={{width:"180px",height:"30px",pt:"2px"}} component={"div"}>
                        <Typography sx={{fontSize:"0.8rem"}}>
                            {displayName}
                        </Typography>
                        <Typography sx={{fontSize:"8px"}}>
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
            </Tooltip>
        </div>
        <Menu
        open={menuOpen}
        onClose={()=>setMenuOpen(false)}
        sx={{marginLeft:"100px",marginTop:"50px"}}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        >
        <MenuList sx={{width:"700px",height:"400px"}}>
                <PlotChart displayName={displayName}/>
            </MenuList>
        </Menu>
        </>
    )
}

export default CurrencySubCard