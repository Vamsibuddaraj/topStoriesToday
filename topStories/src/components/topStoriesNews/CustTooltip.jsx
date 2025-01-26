import { Button, Tooltip } from "@mui/material"
import { useState } from "react"

 const CustToolTip = ({title,coOrd,children}) =>{

    console.log(title)
    return (
        
      <Tooltip placement="right"
        title={title}
        // followCursor={true}
        // slotProps={{
        //   popper: {
        //     sx: {
        //       position: "absolute",
        //       top: coOrd[1],
        //       left: coOrd[0] + 10,
        //       pointerEvents: "none", // Prevents blocking interactions
        //     },
        //   },
        // }}
    >
      {children}
    </Tooltip>
    )

 }

 export default CustToolTip