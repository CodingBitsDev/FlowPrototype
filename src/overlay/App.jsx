import React, { useState, useEffect } from "react";
import Button from "./Button/Button";
import Menu from "./Menu/Menu";
import { flowAPI } from "../main.js"
import useFlowState from "./hooks/useFlowState.js";

export default function App(props){

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
            <StoreLoader>
                <Router/>
            </StoreLoader>
        </div>
    )
}

function Router({}){
    let hasScrollBar = document.body.scrollHeight > window.innerHeight
    const [menuActive, setMenuActive] = useFlowState("menuActive", false);

    return (
        <React.Fragment>
            { !menuActive && <Button hasScrollBar onClick={() => setMenuActive(true)}/> }
            { menuActive && <Menu hasScrollBar/> }
        </React.Fragment>
    )
}

function StoreLoader ( {children} ) {
    const [storeReady, setStoreReady] = useFlowState("loaded", false);

    useEffect(() => {
        console.log("###", storeReady);
    }) 

    if (!storeReady){
        return null;
    } else {
        return (<React.Fragment children={children}></React.Fragment>)
    }

}