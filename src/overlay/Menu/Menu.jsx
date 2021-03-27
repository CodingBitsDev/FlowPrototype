import React, { useState, useEffect } from "react";
import useFlowState from "../hooks/useFlowState.js";
import "./Menu.scss"

export default function ({hasScrollBar}){
    const [menuActive, setMenuActive] = useFlowState("menuActive", false);

    let newLessonClicked = () => {
        alert("recoding Lesson")
    }

    return (
        <div style={{ right: hasScrollBar ? "17px" : "0px" }} className="menuContainer">
            <div class="flowHeader">Flow Lessons</div>
            <div className="newLessonButton"
                onClick={newLessonClicked}
            >+</div>
            <div className="closeButton"
                onClick={() => setMenuActive(false)}
            >X</div>
        </div>
    )
}