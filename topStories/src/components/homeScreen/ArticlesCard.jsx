import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from "@mui/material"
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
const ArticalCard = ({article}) => {
    // console.clear()
    console.log("Article---",article)
    return (
        <Card sx={{width:"270px",height:"300px",margin:"6px"}}>
            <CardMedia 
                component="img"
                height="150"
                image={article.images[0].url}
                alt="Paella dish"
            />
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