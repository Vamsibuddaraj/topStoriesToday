import { Avatar, Card, CardContent, CardHeader, Typography } from "@mui/material"
import CustToolTip from "./CustTooltip"
import { useState } from "react"

const SubCards = ({news}) => {
    const [coOrd,setCoOrd] = useState([0,0]) // idea to implement tooltip as per cursor location
    const {provider:{name,logoUrl},publishedDateTime,title} = news
    // console.log("name",name,"logourl",logoUrl)
    const handleEntryPoints = (e) =>{
        console.log(e.clientX,e.clientY)
        setCoOrd([e.clientX,e.clientY])
    }
    return (
        <>
            <Card onMouseEnter={(e)=>handleEntryPoints(e)} elevation={0} sx={{width:"260px", height:"75px", px:"16px",margin:0,borderRadius:0,
                "&:hover":{
                    backgroundColor:"#ececec"
                }
            }}>
                <CardHeader sx={{padding:0,py:"5px"}}
                    title={name} 
                    slotProps={{
                        title:{
                            fontSize:"0.675rem"
                        }
                    }}
                    avatar={
                        <Avatar sx={{width:"16px",height:"16px"}} src={logoUrl}/>
                    }
                />
                <CardContent sx={{padding:0,cursor:"pointer"}}>
                    <CustToolTip title={title} coOrd={coOrd}>
                        <Typography sx={{
                            fontSize:"12px",
                            fontWeight:550,
                            width:"260px",
                            height:"40px",
                            display: '-webkit-box',            // Use flexbox-like box for multi-line layout
                            overflow: 'hidden',                // Hide overflowing content
                            WebkitBoxOrient: 'vertical',       // Set the box orientation to vertical
                            WebkitLineClamp: 2,                // Limit the text to 2 lines
                            textOverflow: 'ellipsis',  
                            }} component={"p"}>{title}</Typography>
                        </CustToolTip>
                </CardContent>

            </Card>
        </>
    )
}

export default SubCards