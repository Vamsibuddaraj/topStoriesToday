import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Avatar, Card, CardActions, CardContent, CardHeader, IconButton } from '@mui/material';
import useFetchSports from './useFetchSports';
import { TOPSPORTS } from '../../utils/config';
import { useEffect } from 'react';

const SportsCard = () => {
    const {data,loading,error} = useFetchSports(TOPSPORTS)
    const Tabs =data?.Model?.Tabs
    // const title = Tabs[0]?.primaryEntityName
    console.log("tabsss",Tabs)

    return (
        <div style={{width:"300px",height:"304px",margin:"20px"
        // ,margin:"0 auto"
        }} >
            <Card elevation={5} sx={{width:"300px",height:"304px",
                // backgroundColor:"orange",
                position:"relative"}}>
                <CardHeader sx={{paddingTop:"3px"}}
                    avatar={
                        <Avatar sx={{height:"20px",width:"16px"}} src='https://assets.msn.com/staticsb/statics//latest/icons/NtpTopStories.svg'/>
                    }
                    title={title}
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
                    {/* {(todayNews&&(!error))&&todayNews.map((eachNews)=>{
                       return <SubCards key={eachNews.id} news={eachNews} />
                    })} */}
                </CardContent>
                <CardActions>
                    
                </CardActions>

            </Card>
        </div>
    )
}

export default SportsCard
