import { Box, Button, Menu, MenuList, Tooltip, Typography } from "@mui/material"
import PlotChart from "./PlotChart"
import { useState } from "react"
import zIndex from "@mui/material/styles/zIndex"

const CurrencySubCard = ({money,setMenuOpen,setDisplayName}) => {
    // const [menuOpen,setMenuOpen] = useState(false)
    // const [displayNameMatch,setDisplayNameMatch] = useState("")

    // console.log("money--------",displayNameMatch)
    const {displayName,changePcnt,price} = money
    return (
        <>
        <div onClick={()=>(
            setMenuOpen(),
            setDisplayName(displayName))}>
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
        {/* <Menu
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
        </Menu> */}
        {/* {menuOpen&&(displayNameMatch==""||displayNameMatch===displayName)&&      
            <CustomModalLike updateMenu={()=>setMenuOpen(false)}>
                <PlotChart displayName={displayName}/>
            </CustomModalLike>
        } */}
        </>
    )
}

export const CustomModalLike = ({children,updateMenu}) => {
    const styles = {
        width: "750px",
        height: "350px",
        top: "10px",
        position: "fixed",
        backgroundColor: "white",
        zIndex: 10,
        left: "95px",
        top:130,
        border:"1px solid black"
    }
    const cancelStyle = {
        backgroundColor:"white",
        position:"absolute",
        right:0,
        cursor:"pointer"
    }
    return (
        <div style={styles}>
            <Button onClick={updateMenu} sx={cancelStyle}>Cancel</Button>
            {children}
        </div>
    )
}

export default CurrencySubCard