import { useEffect, useState } from "react"

const useFetch = (url,type=null) => {
    const [data,setData] = useState(null)
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState(null)

    
    useEffect(()=>{
        const fetchSports = async () =>{
            try {
                const response = await fetch(url)
                if(!response.ok){
                    throw new Error("failed to fetch data")
                }
                const result = await response.json()
                if(type=="news"){
                    const section =  result?.sections.find((sec)=>sec.region==="cardData")?.cards
                    setData(section)
                }
                else if(type=="sports"){
                    if(url.includes("satoriid")){
                        const {Model:{Tabs:[{tabContent:{league:{sportsMatches}}}]}} = JSON.parse(result?.value[0].blendedResponse)
                        console.log("Specificdata--",sportsMatches)
                        setData(sportsMatches)
                    }else{
                        const section =  result?.sections.find((sec)=>sec.region==="cardData")?.cards.find((item)=>item.type=="SportsMatch").data
                        console.log("parsed data---",result)
                        setData(JSON.parse(section))
                    }
                }else if(type=="currency"){
                    const section =  result?.sections.find((sec)=>sec.region==="cardData")?.cards.find((item)=>item.type=="MoneyInfo").data
                    setData(JSON.parse(section))
                }else if(type == "charts"){
                    setData(result)
                }
                else{
                    setData(result.sections[0].cards)
                }
            }catch(err){
                setError(err.message)
            }finally{
                setLoading(false)
            }
        }
        fetchSports()
    },[url])

    return {data,loading,error}
}

export default useFetch