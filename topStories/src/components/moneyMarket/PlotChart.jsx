import { Box } from "@mui/material"
import useFetch from "../topSports/useFetch"
import { MARKETCHART } from "../../utils/config"
import { Line } from "react-chartjs-2"
import { Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend, elements } from "chart.js"
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
    
    console.log("charts---",displayName)
    const RealData={labels:[],datasets:[{data:[],borderColor: prices?(prices[prices.length-1]-prices[0]>0?"green":"red"):"gray",
        borderWidth: 2}]}
    if(reqChart){
        RealData.datasets[0].data.push(...prices.filter((price,index)=>index%10==0))
        RealData.labels.push(...timeStamps.filter((time,index)=>index%10==0).map(time=>convertToIST(time)))
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
        // scales: {
        //     x: {
        //         ticks: {
        //             display: false // Hides X-axis labels
        //         },
        //         grid: {
        //             display: false // Hides X-axis grid lines if needed
        //         }
        //     },
        //     y: {
        //         ticks: {
        //             display: false // Hides Y-axis labels
        //         },
        //         grid: {
        //             display: false // Hides Y-axis grid lines if needed
        //         }
        //     }
        // },
        // plugins: {
        //     legend: {
        //         display: false // Hides legend
        //     }
        // },
        // responsive: false,  // Disable responsiveness to manually control size
        // maintainAspectRatio: false, // Allow custom width & height
        // width: 500,   // Not directly used, but needed if setting manually
        // height: 300,
    }
    return chartData?(
            <Line data={RealData} options={options}  />

    ):<></>
}
export default PlotChart