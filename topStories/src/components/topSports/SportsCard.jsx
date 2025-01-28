import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Avatar, Box, Card, CardActions, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import useFetchSports from './useFetchSports';
import { TOPSPORTS } from '../../utils/config';
import { useEffect, useRef, useState } from 'react';
import MatchCard from './MatchCard';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuLeague from './MenuLeague';

const SportsCard = () => {
    const targetedEleRef  = useRef(null)
    const {data,loading,error} = useFetchSports(TOPSPORTS)
    const [anchorEl,setAnchorEl] = useState(null)
    const [menuOpen,setMenuOpen] = useState(false)
    const Tabs =data?.Model?.Tabs
    const sports = Tabs?.[0].tabContent.league.sportsMatches || null
    const cricket = sports?.slice(0,3)
    const {primaryEntityName=null,primaryEntityImage=null} = Tabs?.[0] || {}
    console.log("cricket------",Tabs,data)

    useEffect(()=>{
        targetedEleRef.current = document.querySelector("#root > div > div:nth-child(2) > div > div.MuiCardHeader-root.css-3mzbkm-MuiCardHeader-root > div.MuiCardHeader-avatar.css-1r9wl67-MuiCardHeader-avatar > div")
    },[])  
    return (
        <div style={{width:"300px",height:"304px",marginLeft:"20px"
        // ,margin:"0 auto"
        }} >
            <Card elevation={5} sx={{width:"300px",height:"304px",
                // backgroundColor:"orange",
                position:"relative"}}>
                <CardHeader sx={{paddingTop:"3px"}}
                    avatar={
                        <Avatar sx={{height:"20px",width:"16px"}} src={`https://www.bing.com/th?id=${primaryEntityImage}`}/>
                    }
                    title={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography sx={{ fontWeight: 400, marginRight: 1 }}>{primaryEntityName}</Typography>
                        <IconButton onClick={()=>{setAnchorEl(targetedEleRef.current),setMenuOpen(true)}}>
                            <KeyboardArrowDownIcon fontSize='small'/>
                        </IconButton>
                        </Box>
                    }
                    slotProps={{
                        title:{
                            fontWeight:"600"
                        }
                    }}
                    action={
                        <IconButton disableTouchRipple>
                            <MoreHorizIcon sx={{cursor:"pointer"}} fontSize='small' />
                        </IconButton>
                    }
                />
                {Tabs&&<MenuLeague data={Tabs} handleClose={()=>setMenuOpen(false)} isOpen={menuOpen} anchor={anchorEl}/>}
                <CardContent sx={{marginLeft:"2px",padding:"2px"}}>
                    {cricket&&cricket.map((match)=>{
                        return <MatchCard key={match.gameId} match={match} />
                    })}
                </CardContent>
                <CardActions>
                    
                </CardActions>

            </Card>
        </div>
    )
}

export default SportsCard
