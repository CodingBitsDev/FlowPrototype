import React, { useState } from "react";
import { flowAPI } from "../../main.js"
import useFlowState from "../hooks/useFlowState.js";
import "./Button.scss"

export default function ({onClick, hasScrollBar}){
    const [mainState, setMainState] = useFlowState("mainState", 0);

    let buttonClick = (e) => {
        if( !mainState ){
            onClick && onClick();
        } else if (mainState == 1){
            flowAPI.actions.endLearning();
        } else if (mainState == 2) {
            flowAPI.actions.abortTeaching();
        }
    }

    return ( 
        <div 
            className="flowButton"
            style={{ right: hasScrollBar ? "17px" : "0px", }}
            onClick={buttonClick}
        >
          {!mainState ? "Start" : "Tracking" }
        </div>
    )
}
