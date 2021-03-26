import React, { useState, useEffect } from "react";
import Button from "./Button";
import { flowAPI } from "../main.js"

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
            <StoreLoader>
                <Button hasScrollBar/>
            </StoreLoader>
        </div>
    )
}

function StoreLoader ( {children} ) {
    const [storeReady, setStoreReady] = useState(flowAPI.state.getState("loaded") || false);

    useEffect(() => {
        let ready = flowAPI.state.getState("loaded") || false;

        if (storeReady != ready ) setStoreReady(ready)
        else {
            flowAPI.state.addStateListener("loaded", (change, prev) => {
                setStoreReady(change.loaded)
                // flowAPI.state.removeListener("loaded", null, "storeLoadedListener" )
            }, "storeLoadedListener")

            // return () => flowAPI.state.removeListener("loaded", null, "storeLoadedListener")
        }
    }, [])

    if (!storeReady){
        return null;
    } else {
        return (<React.Fragment children={children}></React.Fragment>)
    }

}