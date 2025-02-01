import { Box, Card, Typography } from "@mui/material"
import { SPORTSIMGURL } from "../../utils/config"
import { useEffect, useRef } from "react"

const MatchCard = ({match}) => {
    const canvasRef = useRef(null)
    const canvasRef2 = useRef(null)
    const {
        gameStartDateTime = null,
        gameState = null,
        gameSummaryInfo = null,
        participantOne=null,
        participantTwo=null,
        tossInfo=null,
        venueInfo=null,
        gameCenterUrl =null
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
      const gameStats = {gameSummaryInfo:gameSummaryInfo,venueInfo:venueInfo,gameState:gameState,teamOneScore:teamOneScore,teamTwoScore:teamTwoScore,istDateTime:istDateTime}

      const lightenHexColor = (hex, percent = 20) => {
        // Remove "#" if present
        hex = hex.replace(/^#/, '');
    
        // Convert to RGB
        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);
    
        // Increase each color component by the percentage
        r = Math.min(255, Math.floor(r + (255 - r) * (percent / 100)));
        g = Math.min(255, Math.floor(g + (255 - g) * (percent / 100)));
        b = Math.min(255, Math.floor(b + (255 - b) * (percent / 100)));
    
        // Convert back to hex
        const toHex = (c) => c.toString(16).padStart(2, '0');
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    };
    
    // Example usage:
    console.log(lightenHexColor("#3498db", 20)); // Returns a lighter blue
    console.log(lightenHexColor("#ff5733", 30)); // Returns a lighter orange
    

      useEffect(()=>{
        if(!gameCenterUrl.includes("cricket")){
            const canvas = canvasRef.current;
            const canvas2 = canvasRef2.current
        const ctx = canvas.getContext("2d");
        const ctx2 = canvas2.getContext("2d")
        // canvas.width = 60;
        // canvas.height = 40;

        // Draw first shape (filled)
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous drawings
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height); // Clear previous drawings

        // Draw first shape
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(40, 0);
        ctx.lineTo(20, 50);
        ctx.lineTo(0, 50);
        ctx.closePath();
        ctx.fillStyle = `#${participantOne.primaryColorHex}`;
        ctx.fill();
        ctx.strokeStyle = "white";
        // ctx.lineWidth = 2;
        ctx.stroke();

        // Change composition to prevent overlap
        ctx.globalCompositeOperation = "destination-over"; // Ensures second shape is behind

        // Draw second shape
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(60, 0);
        ctx.lineTo(40, 50);
        ctx.lineTo(0, 50);
        ctx.closePath();
        ctx.fillStyle = lightenHexColor(`#${participantOne.primaryColorHex}`,40);
        ctx.fill();
        ctx.strokeStyle = "white";
        ctx.stroke();

        // Reset composite operation
        ctx.globalCompositeOperation = "source-over";


        ctx2.beginPath();
        ctx2.moveTo(60, 0);
        ctx2.lineTo(50, 0);
        ctx2.lineTo(20, 50);
        ctx2.lineTo(60, 50);
        ctx2.closePath();
        ctx2.fillStyle = `#${participantTwo.primaryColorHex}`; // Fill color
        ctx2.fill();
        ctx2.strokeStyle = "white";
        // ctx2.lineWidth = 2;
        ctx2.stroke();
        ctx.globalCompositeOperation = "destination-over"; // Ensures second shape is behind
        ctx2.beginPath();
        ctx2.moveTo(50, 0);
        ctx2.lineTo(20, 0);
        ctx2.lineTo(0, 50);
        ctx2.lineTo(20, 50);
        ctx2.closePath();
        ctx2.fillStyle = lightenHexColor(`#${participantTwo.primaryColorHex}`,40);
        ctx2.fill();
        ctx2.strokeStyle = "white";
        ctx2.stroke();

        // Reset composite operation
        ctx2.globalCompositeOperation = "source-over";





        }
      },[])
    return (
        gameCenterUrl.includes("cricket")?
        <div style={{display:"flex",flexDirection:"row",justifyContent:"space-evenly",width:"268px", height:"54px",margin:"10px",borderRadius:0,marginTop:"15px", backgroundColor:"#f3f3f3",padding:"5px"}}>
            <div style={{display:"flex",flexDirection:"column",width:"100px",width:"35px",alignItems:"center"}}>
                <img style={{paddingBottom:"1px"}} width={"32px"} height={"32px"} src={`${SPORTSIMGURL+teamOneLogo}`}/>
                <p style={{margin:0,fontSize:"11px",whiteSpace: "nowrap",overflow: "hidden",textOverflow: "ellipsis",padding:"1px"}}>{teamOne}</p>
            </div>
            <SportStats gameState={gameStats}/>
            <div style={{display:"flex",flexDirection:"column",width:"100px",width:"35px",alignItems:"center"}}>
                <img style={{paddingBottom:"1px"}} width={"32px"} height={"32px"} src={`${SPORTSIMGURL+teamTwoLogo}`}/>
                <p style={{margin:0,fontSize:"11px"}}>{teamTwo}</p>
            </div>
        </div>
        :
        <div style={{display:"flex",flexDirection:"row",width:"268px",height:"54px",margin:"10px",borderRadius:0,marginTop:"15px", backgroundColor:"#f3f3f3",padding:"5px",justifyContent:"space-between"}}>
            <div style={{display:"flex",flexDirection:"row",width:"100px",width:"35px",alignItems:"center"}}>
                    <canvas ref={canvasRef} width={60} height={75}></canvas>
                    <div style={{display:"flex",flexDirection:"column",width:"100px",width:"35px",alignItems:"center",marginLeft:"-25px"}}>
                        <img style={{paddingBottom:"1px"}} width={"32px"} height={"32px"} src={`${SPORTSIMGURL+teamOneLogo}`}/>
                        <p style={{margin:0,fontSize:"11px",whiteSpace: "nowrap",overflow: "hidden",textOverflow: "ellipsis",padding:"1px",fontWeight:"600"}}>{teamOne}</p>
                    </div>
            </div>
            <div style={{display:"flex",flexDirection:"column"}}>
                <Typography sx={{width:"120px",
                            height:"20px",
                            textAlign:"center",
                            fontWeight:"600",
                            fontSize: "14px",
                            lineHeight: "20px"
                            }}>{istDateTime.dateString}
                        </Typography >
                        <Typography sx={{width:"120px",height:"20px",textAlign:"center",
                        fontSize: "12px",
                        lineHeight: "16px"
                        }}>{istDateTime.timeString}</Typography>
            </div>
            <div style={{display:"flex",flexDirection:"row",width:"100px",width:"35px",alignItems:"center",position:"relative",right:"22px"}}>
                    <div style={{display:"flex",flexDirection:"column",width:"100px",width:"35px",alignItems:"center",position:"absolute",right:"14px"}}>
                        <img style={{paddingBottom:"1px"}} width={"32px"} height={"32px"} src={`${SPORTSIMGURL+teamTwoLogo}`}/>
                        <p style={{margin:0,fontSize:"11px",whiteSpace: "nowrap",overflow: "hidden",textOverflow: "ellipsis",padding:"1px",fontWeight:"600"}}>{teamTwo}</p>
                    </div>
                    <canvas ref={canvasRef2} width={60} height={75}></canvas>
            </div>
        </div>  
    )
}

export default MatchCard

const SportStats = ({gameState:{gameSummaryInfo,venueInfo,gameState,teamOneScore,teamTwoScore,istDateTime}}) =>{
    return (
        <div style={{display:"flex",flexDirection:"column",flexGrow:1,alignItems:"center"}}>
            { gameState.detailedGameState!=="PreGame"?
                <Box sx={{display:"flex",flexDirection:"row",width:"200px",height:"40px",justifyContent:"space-between",alignItems:"center"}}>
                    <Typography sx={{width:"48px",
                        height:"20px",
                        textAlign:"center",
                        fontSize: "8.7px",
                        lineHeight: "20px"
                        }}>{teamOneScore}
                    </Typography >
                    <Typography>
                        {(gameState.state=="InProgress")?<span style={{   
                                color: "white",
                                fontSize: "9px",
                                height: "15px",
                                // width: "35px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                                paddingRight:"3px",
                                // backgroundColor: "#61de61",
                                backgroundColor:"rgb(69 141 69)",
                                display: "block",
                                fontWeight: 700}}
                                >{gameState.detailedGameState=="Stumps"?"Stumps":"LIVE"}</span>:"vs"}
                    </Typography>
                    <Typography sx={{width:"48px",
                        height:"20px",
                        textAlign:"center",
                        fontSize: "8px",
                        lineHeight: "20px"
                        }}>{teamTwoScore}
                    </Typography >
                </Box>:
                <> 
                    <Typography sx={{width:"120px",
                        height:"20px",
                        textAlign:"center",
                        fontWeight:"600",
                        fontSize: "14px",
                        lineHeight: "20px"
                        }}>{istDateTime.dateString}
                    </Typography >
                    <Typography sx={{width:"120px",height:"20px",textAlign:"center",
                    fontSize: "12px",
                    lineHeight: "16px"
                    }}>{istDateTime.timeString}</Typography>
                </>
                
            }

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
            >{!gameSummaryInfo?venueInfo:gameSummaryInfo}</Typography >
        </div>
    )
}