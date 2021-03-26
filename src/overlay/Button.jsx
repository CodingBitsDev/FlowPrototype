import React from "react";

export default function (props){
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
            }}
        >
          FLOW 
        </div>
    )
}
