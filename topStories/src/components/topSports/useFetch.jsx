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
                    console.log("Response",type)
                    const section =  result?.sections.find((sec)=>sec.region==="cardData")?.cards
                    setData(section)
                }
                else if(type=="sports"){
                    const section =  result?.sections.find((sec)=>sec.region==="cardData")?.cards.find((item)=>item.type=="SportsMatch").data
                    setData(JSON.parse(section))
                }else if(type=="currency"){
                    const section =  result?.sections.find((sec)=>sec.region==="cardData")?.cards.find((item)=>item.type=="MoneyInfo").data
                    setData(JSON.parse(section))
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