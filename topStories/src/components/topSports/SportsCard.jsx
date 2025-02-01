import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import useFetch from './useFetch';
import { GAMES, TOPSPORTS } from '../../utils/config';
import { useEffect, useRef, useState } from 'react';
import MatchCard from './MatchCard';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuLeague from './MenuLeague';

const SportsCard = () => {
    const targetedEleRef  = useRef(null)
    const [type,setType] = useState("sports")
    const [url,setUrl] = useState(TOPSPORTS)
    const [league,setLeague] = useState(null)
    const {data,loading,error} = useFetch(url,type)
    const [anchorEl,setAnchorEl] = useState(null)
    const [menuOpen,setMenuOpen] = useState(false)
    const Tabs =data?.Model?.Tabs
    const sports = Tabs?.[0].tabContent.league.sportsMatches || null
    console.log("Sports-------",league)
    console.log("modell---",data)
    const cricket = sports?.slice(0,3) || data?.slice(0,3)
    const {primaryEntityName=null,primaryEntityImage=null} = (sports)?Tabs?.[0] : league || {}
    const updateLeague = async (league,type) => {
        setLeague(league)
        const {primaryEntityId} = league;
        setUrl(`${GAMES}${primaryEntityId}`)
    }

    useEffect(()=>{
        targetedEleRef.current = 
        // document.querySelector("#root > div > div > div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation4.MuiCard-root.css-1eo0s5m-MuiPaper-root-MuiCard-root > div > div:nth-child(2) > div > div.MuiCardHeader-root.css-1mw9zgz-MuiCardHeader-root")
        document.querySelector("#root > div > div > div:nth-child(2) > div > div:nth-child(2) > div > div.MuiCardHeader-root > div.MuiCardHeader-avatar > div")
        console.log("targetted---",targetedEleRef)
    },[])  
    return (
        <div style={{width:"300px",height:"304px",}} >
            <Card elevation={5} sx={{width:"300px",height:"304px",position:"relative"}}>
                <CardHeader sx={{paddingTop:"3px",paddingBottom:"3px"}}
                    avatar={
                        <Avatar sx={{height:"20px",width:"16px"}} src={`https://www.bing.com/th?id=${primaryEntityImage}`}/>
                    }
                    title={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography sx={{ fontWeight: 400, marginRight: 0,fontSize:"0.88rem" }}>{primaryEntityName}</Typography>
                        <IconButton disableFocusRipple sx={{paddingLeft:0}} onMouseEnter={()=>{setAnchorEl(targetedEleRef.current),setMenuOpen(true)}}>
                            <KeyboardArrowDownIcon fontSize='small'/>
                        </IconButton>
                        </Box>
                    }
                    slotProps={{
                        title:{
                            fontWeight:"600",
                            fontFamily:"Montserrat"
                        }
                    }}
                    action={
                        <IconButton disableTouchRipple>
                            <MoreHorizIcon sx={{cursor:"pointer"}} fontSize='small' />
                        </IconButton>
                    }
                />
                {/* {Tabs&&<MenuLeague updateLeague={updateLeague}  */}
                <MenuLeague updateLeague={updateLeague}
                handleClose={()=>setMenuOpen(false)} isOpen={menuOpen} anchor={anchorEl}/>
                <CardContent sx={{marginLeft:"2px",padding:"2px",marginTop:"-14px"}}>
                    {cricket&&cricket.map((match)=>{
                        return <MatchCard key={match.gameId} match={match} />
                    })}
                </CardContent>
                <CardActions sx={{paddingTop:0}}>
                    <Button sx={{marginLeft:"93px",fontSize:"10px"}} >See more..</Button>
                </CardActions>

            </Card>
        </div>
    )
}

export default SportsCard
