import React, { useEffect,useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Avatar, CardActions, CardHeader, IconButton, MobileStepper } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { TOPSTORIES } from '../utils/config';
import SubCards from './SubCards';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import "./mainCard.css"
import MenuComp from './MenuComp';

const MainCard = () => {
    const [news,setNews] = useState(null)
    const [todayNews,setTodayNews] = useState()
    const [error,setError] = useState(false)
    const [loading,setLoading] = useState(true)
    const [openNav,setOpenNav] = useState(false)
    const [generatorIter,setGeneratorIter] = useState(3)
    const [activeStep,setActiveStep] = useState(0)
    const [anchorEl,setAnchorEl] = useState(null)
    const [menuOpen,setMenuOpen] = useState(false)
    const fetchData = async () => {
        try{
            const apiRes = await fetch(TOPSTORIES);
            const {sections}  = await apiRes.json();
            let {cards} = sections[1]
            console.log("sections",cards)
            let reqCard = cards.find((card)=>card.id==="CanonicalName-topstories")
            let {subCards}=reqCard
            setNews(subCards)
            setTodayNews(subCards.slice(0,3))
            setLoading(false)
        }catch(err){
            setError(err)
        }
    }
    function* processData(news,chunkSize=3){
            for(let i = generatorIter;i<news.length;i+=chunkSize){
                console.log(i,"clicked")
                setGeneratorIter(generatorIter+chunkSize)
                setActiveStep(activeStep+1)
                yield news.slice(i,i+chunkSize)
            }
    }

    function* processDataRev(news,chunkSize=3){
        for(let i = generatorIter;i>=0;i-=chunkSize){
            if(generatorIter>3){setGeneratorIter(generatorIter-chunkSize)}
            if(i>chunkSize){
                setActiveStep(activeStep-1)
                yield news.slice(i-chunkSize*2,i-chunkSize)
            }else{
                yield undefined
            }
        }
    }

    const generatedData = processData(news);
    const generatedDataRev = processDataRev(news)

    const nextSet = () => {
        const data= generatedData.next().value
        if(data){
            setTodayNews(data);
        }
    }
    const prevSet = () =>{
        const data= generatedDataRev.next().value
        console.log("prev",data)
        if(data){
            setTodayNews(data);
        }
    }

    // console.log("open",openNav)
    useEffect(()=>{
            fetchData();
    },[])
    return (
        <div style={{width:"300px",height:"304px"
        // ,margin:"0 auto"
        }} onMouseLeave={()=>setOpenNav(false)} onMouseEnter={()=>setOpenNav(true)}>
            <Card elevation={5} sx={{width:"300px",height:"304px",
                // backgroundColor:"orange",
                position:"relative"}}>
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
                        <IconButton disableTouchRipple onClick={(e)=>{setAnchorEl(e.currentTarget),setMenuOpen(true)}}>
                            <MoreHorizIcon sx={{cursor:"pointer"}} fontSize='small' />
                        </IconButton>
                    }
                />
                <MenuComp handleClose={()=>setMenuOpen(false)} isOpen={menuOpen} anchor={anchorEl}/>
                <CardContent sx={{marginLeft:"2px",padding:"2px"}}>
                    {(todayNews&&(!error))&&todayNews.map((eachNews)=>{
                       return <SubCards key={eachNews.id} news={eachNews} />
                    })}
                </CardContent>
                <CardActions>
                    <MobileStepper sx={{
                        position:"absolute", 
                        fontSize:"small",
                        ".MuiMobileStepper-dots":{
                            alignItems:"center"
                        },
                        ".MuiMobileStepper-dot": {
                            width: 4,
                            height: 4,
                        },
                        ".MuiMobileStepper-dotActive": {
                            width: 5,
                            height: 6,
                            backgroundColor: "black", 
                        },

                        }} variant='dots' activeStep={activeStep} steps={4}/>
                </CardActions>
                <div onClick={prevSet} className={`leftarr arrow ${openNav?"visible":"hidden"}`} >
                        <IconButton disableTouchRipple disableFocusRipple disableRipple sx={{paddingLeft:"0"}}>
                            <ArrowLeftIcon sx={{ color: '#000' }} fontSize='medium'/>
                        </IconButton>
                </div>
                <div onClick={nextSet} className={`rightarr arrow ${openNav?"visible":"hidden"}`} >
                        <IconButton disableTouchRipple disableFocusRipple disableRipple sx={{paddingLeft:"0"}}>
                            <ArrowRightIcon sx={{ color: '#000' }} fontSize='medium'/>
                        </IconButton>
                </div>
            </Card>
        </div>
    )
}

export default MainCard