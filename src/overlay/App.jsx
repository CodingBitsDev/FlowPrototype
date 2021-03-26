import React from "react";
import Button from "./Button";

export default function App(props){
    let hasScrollBar = document.body.scrollHeight > window.innerHeight
    return ( 
        <div 
            style={{
            position: "absolute",
            top: "0px",
            left: "0px",
            right: "0px",
            bottom: "0px",
            width: "100%",
            height: "100%",
            pointerEvents: "none", }}
        >
            <Button hasScrollBar/>
        </div>
    )
}
