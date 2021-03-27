import React, { useState } from "react";
import { flowAPI } from "../main.js"
import useFlowState from "./hooks/useFlowState.js";

export default function (props){
    const [count, setCount] = useFlowState("testCount", 0);

    let onClick = (e) => {
        setCount(count +1);
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
