import React, { useState } from "react";
import { flowAPI } from "../../main.js"
import useFlowState from "../hooks/useFlowState.js";
import "./Button.scss"

export default function ({onClick, hasScrollBar}){
    let buttonClick = (e) => {
        onClick && onClick();
    }

    return ( 
        <div 
            className="flowButton"
            style={{ right: hasScrollBar ? "17px" : "0px", }}
            onClick={buttonClick}
        >
          Start
        </div>
    )
}
