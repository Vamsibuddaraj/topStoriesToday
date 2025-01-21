import React, { useEffect,useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Avatar, CardHeader, IconButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { TOPSTORIES } from '../utils/config';
import SubCards from './SubCards';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import "./mainCard.css"

const MainCard = () => {
    const [news,setNews] = useState(null)
    const [error,setError] = useState(false)
    const [loading,setLoading] = useState(true)
    const [openNav,setOpenNav] = useState(false)
    const fetchData = async () => {
        try{
            const apiRes = await fetch(TOPSTORIES);
            const {sections}  = await apiRes.json();
            // console.log("sections",sections)
            let {cards} = sections[1]
            let {subCards}=cards[26]
            setNews(subCards)
            setLoading(false)
        }catch(err){
            setError(err)
        }
    }
    console.log("open",openNav)
    useEffect(()=>{
        setTimeout(()=>{
            fetchData()
        },1000)
    },[])
    return (
        <div style={{width:"300px",height:"304px",backgroundColor:"gray",margin:"0 auto"}} onMouseLeave={()=>setOpenNav(false)} onMouseEnter={()=>setOpenNav(true)}>
            <Card sx={{width:"300px",height:"304px",backgroundColor:"orange",position:"relative"}}>
                <CardHeader sx={{paddingTop:"3px"}}
                    avatar={
                        <Avatar sx={{height:"20px",width:"16px"}} src='https://assets.msn.com/staticsb/statics//latest/icons/NtpTopStories.svg'/>
                    }
                    title="Top Stories"
                    slotProps={{
                        title:{
                            fontWeight:"600"
                        }
                    }}
                    action={
                        <IconButton>
                            <MoreHorizIcon fontSize='medium'/>
                        </IconButton>
                    }
                />
                <CardContent sx={{padding:"2px"}}>
                    {(news&&(!error))&&news.map((eachNews)=>{
                       return <SubCards key={eachNews.id} news={eachNews} />
                    })}
                </CardContent>
                <div  className={`leftarr arrow ${openNav?"visible":"hidden"}`} >
                        <IconButton disableTouchRipple disableFocusRipple disableRipple sx={{paddingLeft:"0"}}>
                            <ArrowLeftIcon fontSize='medium'/>
                        </IconButton>
                </div>
                <div className={`rightarr arrow ${openNav?"visible":"hidden"}`} >
                        <IconButton disableTouchRipple disableFocusRipple disableRipple sx={{paddingLeft:"0"}}>
                            <ArrowRightIcon fontSize='medium'/>
                        </IconButton>
                </div>
            </Card>
        </div>
    )
}

export default MainCard