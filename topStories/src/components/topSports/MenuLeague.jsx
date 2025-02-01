import { Badge, Box, Divider, IconButton, Menu, MenuItem, Typography } from "@mui/material"
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { SPORTSIMGURL } from "../../utils/config";
import { GAMES, TOPSPORTS } from '../../utils/config';
import AddIcon from '@mui/icons-material/Add';
import useFetch from "./useFetch";


const MenuLeague = ({anchor,isOpen,handleClose,updateLeague}) => {
    const {data:dataresp,loading,error} = useFetch(TOPSPORTS,'sports')
    const data =dataresp?.Model?.Tabs.filter((league)=>!["LPGA","PGA","DP World Tour"].some((item)=>league.primaryEntityName.includes(item)))
    const {primaryEntityName:yourLeague,primaryEntityImage:yourLeagueImg} = data?.[0] || {}
    console.log("into menu league")
    const selectedLeague = (league) =>{
      console.log("selevcted -----",league)
      handleClose()
      updateLeague(league,"league")
    }
    return (
        <Menu
            anchorEl={anchor}
              slotProps={{
                paper: {
                  style: {
                    maxHeight: "230px",
                    width: '270px',
                  },
                },
              }}
              sx={{
                "& .MuiPaper-root": {
                  /* For Chrome, Edge, Safari */
                  "&::-webkit-scrollbar": {
                    width: "6px", // Reduce scrollbar width
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#dddddd", // Scrollbar thumb color
                    borderRadius: "4px", // Add rounded corners
                  },
                  /* For Firefox */
                  scrollbarWidth: "thin", // Thin scrollbar
                  scrollbarColor: "#888 transparent", // Thumb color and transparent track
                },
              }}
            open={isOpen}
            onClose={handleClose}
            >
            <MenuItem sx={{py:0}}>
            <Box color={"primary"} display={"flex"} alignItems={"center"} gap={2}>
              <IconButton>
                <Badge sx={{
                  "& .MuiBadge-badge":{
                    top: "17px",
                    width: "16px",
                    height: "15px",
                    left: "4px"
                  }
                }} badgeContent={<AddIcon fontSize="0.8rem"/>} color="primary">
                  <StarOutlineIcon fontSize="1rem" color="primary"/>
                </Badge>
              </IconButton>
              <Typography color="primary" fontSize={"0.85rem"}>
                Follow team or league
              </Typography>
            </Box>
            </MenuItem>
            <Divider />
            <MenuItem>
                <Typography fontSize={"11px"} sx={{opacity:"0.7"}}>
                  Your teams and leagues
                </Typography>
            </MenuItem>
            <MenuItem>
            <Box color={"primary"} display={"flex"} alignItems={"center"} gap={2}>
              <img style={{paddingBottom:"1px"}} width={"25px"} height={"25px"} src={SPORTSIMGURL+yourLeagueImg}/>
              <Typography fontSize={"0.85rem"}>
                {yourLeague}
              </Typography>
            </Box>
            </MenuItem>
            <MenuItem>
                <Typography fontSize={"11px"} sx={{opacity:"0.7"}}>
                  More leagues
                </Typography>
            </MenuItem>
            {data&&data.slice(1).map((league)=><LeagueBox key={league.yId} data={league} selectedLeague={()=>selectedLeague(league)}/>)}
        </Menu>
    )
}

const LeagueBox = ({data,selectedLeague}) => {
  const {primaryEntityName:yourLeague,primaryEntityImage:yourLeagueImg} = data
  return (
    <MenuItem onClick={selectedLeague} >
      <Box color={"primary"} display={"flex"} alignItems={"center"} gap={2}>
          <img style={{paddingBottom:"1px"}} width={"25px"} height={"25px"} src={SPORTSIMGURL+yourLeagueImg}/>
          <Typography fontSize={"0.85rem"}>
            {yourLeague}
          </Typography>
        </Box>
    </MenuItem>
  )
}

export default MenuLeague