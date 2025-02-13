import { Box } from "@mui/material"
import useFetch from "../topSports/useFetch"
import { MARKETCHART } from "../../utils/config"
import { Line } from "react-chartjs-2"
import { Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend, elements } from "chart.js"
import { useRef } from "react"
ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend)
const PlotChart = ({displayName:currency}) =>{
    const {data:chartData,error,loading}= useFetch(MARKETCHART,"charts")
    const reqChart = chartData?.find((curr)=>curr[0].displayName===currency)
    const [{displayName=null,series:{prices=null,timeStamps=null}={}}] = reqChart || [{}]
    function convertToIST(time) {
        const date = new Date(time);  // Create a Date object from the input timestamp
        // Convert to IST (India Standard Time) and format as AM/PM
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,  // Ensures AM/PM format
            timeZone: 'Asia/Kolkata',  // Set the time zone to IST
        };
    
        return date.toLocaleString('en-US', options);  // Converts to string with IST and AM/PM
    }
    
    // console.log("charts---",displayName)
    const RealData={labels:[],datasets:[{data:[],borderColor: prices?(prices[prices.length-1]-prices[0]>0?"green":"red"):"gray",
        borderWidth: 2}]}
    if(reqChart){
        const todayIndex = timeStamps.findIndex((time)=>{
            // Given UTC timestamp
                const utcDate = new Date(time);
                const istDate = new Date(utcDate.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
                const today = new Date();
                if(istDate.getDate() === today.getDate()){
                    console.log(istDate.getDate())
                }
                return istDate.getDate() === today.getDate()

        })
        console.log("todayINdex----",todayIndex)
        RealData.datasets[0].data.push(...prices.slice(todayIndex).filter((price,index)=>index%20==0))
        RealData.labels.push(...timeStamps.slice(todayIndex).filter((time,index)=>index%20==0).map(time=>convertToIST(time)))
    }
    const options={
        elements:{
            backgroundColor:"#00f2e1",
        },
        plugins: {
            title: {
                display: true,
                text: displayName?displayName:"Data is unavailable",  
                font: {
                    size: 18,
                    weight: 'bold',
                    family: 'Helvetica',
                },
                color: '#333',  // Set title color
                // padding: {
                //     top: 20,
                //     bottom: 10,  // Add padding around the title
                // }
            }, 
            legend: {
                display: false // Hides legend
            }
        }

    }
    return chartData?(
            <Line data={RealData} options={options}  />

    ):<></>
}
export default PlotChart