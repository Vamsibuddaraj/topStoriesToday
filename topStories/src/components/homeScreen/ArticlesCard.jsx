import { Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, Chip, Fab, IconButton, Stack, Typography } from "@mui/material"
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ClearIcon from '@mui/icons-material/Clear';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useState } from "react";
const ArticalCard = ({article}) => {
    const [visibile,setVisible] = useState(false)
    // console.clear()
    console.log("Article---",article)
    return (
        <Card onMouseEnter={()=>setVisible(true)} onMouseLeave={()=>setVisible(false)} sx={{width:{sm:"350px",xs:"400px",md:"350px"},height:"300px",margin:"6px"}}>
            <Box position={"relative"}>
                <CardMedia 
                    component="img"
                    height="150"
                    image={article.images[0].url}
                    alt="Paella dish"
                />
                <Stack sx={{top:0,right:0,display:visibile?"block":"none"}} gap={1} position={"absolute"} direction={"row"}>
                    {/* <Fab sx={{backgroundColor :"rgb(240 255 255 / 70%)",width:"35px",height:"20px"}} size="small" color="white" aria-label="add">
                        <ClearIcon />
                    </Fab> */}
                    <Chip
                        label="hide"
                        // onClick={handleClick}
                        // onDelete={handleDelete}
                        icon={<ClearIcon />}
                        variant="outlined"
                        sx={{backgroundColor :"rgb(240 255 255 / 70%)"}}
                        />
                    <Fab sx={{backgroundColor :"rgb(240 255 255 / 70%)",width:"35px",height:"20px"}} size="small" color="white" aria-label="edit">
                        <MoreHorizIcon />
                    </Fab>
                </Stack>
            </Box>
                <CardHeader sx={{paddingBottom:"1px"}}
                    avatar={
                        <Avatar sx={{height:"20px",width:"20px"}} src={article.provider.logoUrl}/>
                    }
                    title={article.provider.name}
                    slotProps={{
                        title:{
                            fontWeight:"300"
                        }
                    }}
                />
                <CardContent sx={{pt:"4px"}}>
                    <Typography sx={{
                                fontFamily:"Montserrat",
                                fontSize:"14px",
                                fontWeight:600,
                                display: "-webkit-box",
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: 3, // Adjust number of visible lines
                                overflow: "hidden",
                                textOverflow: "ellipsis",}}>
                        {article.abstract}
                    </Typography>
                </CardContent>
                <CardActions sx={{marginTop:"-15px"}}>
                        <IconButton sx={{paddingRight:0}}>
                            <ThumbUpOffAltIcon fontSize="small"/>
                        </IconButton>
                        <Typography sx={{marginRight:"15px"}} fontSize={"13px"}>
                            {article?.reactionSummary?.subReactionSummaries?.[0]?.totalCount}
                        </Typography>
                        <IconButton>
                            <ThumbDownOffAltIcon fontSize="small"/>
                        </IconButton>
                </CardActions>

        </Card>
    )
}

export default ArticalCard