import { useState } from "react"
import { Link } from "react-router-dom"

const TopicNavigation = () => {
    const [selectedItem,setSelectedItem] = useState(0)
    const ulStyles  = {
        listStyle:"none",
        padding:0,
        marigin:0,
        display:"flex",
        flexDirection:"row"
    }
    const liStyles = {
        marginLeft:"10px",
        marginRight:"10px",
        paddingLeft:"15px",
        paddingRight:"15px",
        paddingTop:"3px",
        paddingBottom:"5px",
        cursor:"pointer",
        lineHeight:"20px",
        color:"rgb(65 70 70)"
    }
    const selectedStyles = {
        backgroundColor:"gray",
        borderRadius:"5px",
        color:"white"
    }
    const list = ["Trending","Sports","Play","Money","Gaming","Weather","Watch","Shopping","Health","Travel"]
    const handleSelect = (id) => {
        setSelectedItem(id)
    }
    return (
        <ul style={ulStyles}>
            {list.map((item,index)=>{
                return <Link key={index}  style={{ color: "blue", textDecoration: "none" }} to={{pathname:`/${item}`}}>
                    <li onClick={()=>handleSelect(index)} style={{...liStyles,...(selectedItem===index?selectedStyles:{})}} >{item}</li>
                </Link>
            })}
        </ul>
    )
}

export default TopicNavigation