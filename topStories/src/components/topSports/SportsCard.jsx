import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Avatar, Card, CardActions, CardContent, CardHeader, IconButton } from '@mui/material';
import useFetchSports from './useFetchSports';
import { TOPSPORTS } from '../../utils/config';
import { useEffect, useState } from 'react';
import MatchCard from './MatchCard';

const SportsCard = () => {
    const {data,loading,error} = useFetchSports(TOPSPORTS)

    const Tabs =data?.Model?.Tabs
    const sports = Tabs?.[0].tabContent.league.sportsMatches || null
    const cricket = sports?.slice(0,3)
    const {primaryEntityName=null,primaryEntityImage=null} = Tabs?.[0] || {}
    console.log("cricket------",primaryEntityName,primaryEntityImage)


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
                    title={primaryEntityName}
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
