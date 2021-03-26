import React, { useState } from "react";
import { flowAPI } from "../main.js"

export default function (props){
    const [count, setCount] = useState(flowAPI.state.getState("testCount") || 0);

    flowAPI.state.addStateListener("testCount", (change, prev) => {
        setCount(change.testCount)
    }, "ButtonListener")

    let onClick = (e) => {
        console.log(flowAPI.state.getState("testCount"))
        flowAPI.state.setState({testCount: flowAPI.state.getState("testCount") +1})
    }
    return ( 
        <div 
            style={{
                position: "absolute",
                top: "20%",
                right: props.hasScrollBar ? "17px" : "0px",
                width: "50px",
                height: "50px",
                backgroundColor: "blue",
                pointerEvents: "auto", 
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                cursor: "pointer",
            }}
            onClick={onClick}
        >
          {count}
        </div>
    )
}
