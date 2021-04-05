import React, { useState, useEffect } from "react";
import useFlowState from "../hooks/useFlowState.js";
import "./Menu.scss"
import { flowAPI } from "../../main.js"

export default function ({hasScrollBar}){
    const [menuActive, setMenuActive] = useFlowState("menuActive", false);
    const [ savedSkills ] = useFlowState("savedSkills", false);

    let newLessonClicked = () => {
        // alert("recoding Lesson")
        flowAPI.actions.learnNewSkill();
    }

    let teachSkill = (key) => {
        // alert("Teaching Skill: " + key)
        flowAPI.actions.teachSkill(key)
    }

    return (
        <div style={{ right: hasScrollBar ? "17px" : "0px" }} className="menuContainer">
            <div className="flowHeader">Flow Lessons</div>
            <div className="newLessonButton"
                onClick={newLessonClicked}
            >+</div>
            <div className="closeButton"
                onClick={() => setMenuActive(false)}
            >X</div>
            {Object.keys(savedSkills || {}).map(( key ) => <div onClick={() => {teachSkill(key)}} className="skillButton" key={key}> {key} </div>)} 
        </div>
    )
}