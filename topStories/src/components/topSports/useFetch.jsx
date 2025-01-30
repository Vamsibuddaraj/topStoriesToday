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
                console.log("Response",result)
                if(type=="sports"){
                    const section =  result?.sections.find((sec)=>sec.region==="cardData")?.cards.find((item)=>item.type=="SportsMatch").data
                    // const section = result?.sections[1]?.cards.find((item)=>item.type=="SportsMatch").data
                    setData(JSON.parse(section))
                }else if(type=="currency"){
                    const section =  result?.sections.find((sec)=>sec.region==="cardData")?.cards.find((item)=>item.type=="MoneyInfo").data
                    setData(JSON.parse(section))
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