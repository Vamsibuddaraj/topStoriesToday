import { Card, Typography } from "@mui/material"
import { SPORTSIMGURL } from "../../utils/config"

const MatchCard = ({match}) => {
    const {
        gameStartDateTime = null,
        gameState = null,
        gameSummaryInfo = null,
        participantOne=null,
        participantTwo=null,
        tossInfo=null,
        venueInfo=null
    } = match || {} // if match then destructure it or else destructure it with empty object
    const {name:teamOne,imageId:teamOneLogo,score:teamOneScore} = participantOne
    const {name:teamTwo,imageId:teamTwoLogo,score:teamTwoScore} = participantTwo
    // console.log("cricket",participantOne,)
    function convertToIST(dateTimeString) {
        // Create a Date object from the input string
        const date = new Date(dateTimeString);
      
        // Check if the date is valid
        if (isNaN(date)) {
          throw new Error("Invalid date format");
        }
      
        // Convert to IST timezone
        const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
        const istDate = new Date(date.getTime() + istOffset);
      
        // Get day and month names
        const options = { month: "short", day: "numeric" };
        const dateString = istDate.toLocaleDateString("en-US", options);
      
        // Format time
        const timeString = istDate.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
      return {dateString,timeString}
      }
      const istDateTime = convertToIST(gameStartDateTime);
      
    return (
        <div style={{display:"flex",flexDirection:"row",justifyContent:"space-evenly",width:"268px", height:"54px",margin:"10px",borderRadius:0,marginTop:"15px", backgroundColor:"#eaeeea",padding:"5px"}}>
            <div style={{display:"flex",flexDirection:"column",width:"100px",alignItems:"center"}}>
                <img style={{paddingBottom:"1px"}} width={"32px"} height={"32px"} src={`${SPORTSIMGURL+teamOneLogo}`}/>
                <p style={{margin:0,fontSize:"11px"}}>{teamOne}</p>
            </div>
            <div style={{display:"flex",flexDirection:"column",flexGrow:1,alignItems:"center"}}>
                <Typography
                sx={{width:"120px",
                    height:"20px",
                    textAlign:"center",
                    fontWeight:"600",
                    fontSize: "14px",
                    lineHeight: "20px"
                    }}>{istDateTime.dateString}</Typography >
                <Typography sx={{width:"120px",height:"20px",textAlign:"center",
                    fontSize: "12px",
                    lineHeight: "16px"
                }}>{istDateTime.timeString}</Typography >
                <Typography sx={{
                    width: "180px",
                    textAlign: "center",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    padding: "0px 10px",
                    boxSizing: "border-box",
                    fontSize:"10px"
                }}
                >{venueInfo}</Typography >
            </div>
            <div style={{display:"flex",flexDirection:"column",width:"100px",alignItems:"center"}}>
                <img style={{paddingBottom:"1px"}} width={"32px"} height={"32px"} src={`${SPORTSIMGURL+teamTwoLogo}`}/>
                <p style={{margin:0,fontSize:"11px"}}>{teamTwo}</p>
            </div>
        </div>
    )
}

export default MatchCard