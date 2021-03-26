import React from "react";
import ReactDOM from "react-dom";
import { flowAPI } from "../main.js";
import App from "./App.jsx"

export function initOverlay(){
    let flowMain = document.createElement("div");
    flowMain.class="flow-main";
    flowMain.id="flow-main";
    flowMain.style.position = "fixed";
    flowMain.style.top = "0px";
    flowMain.style.bottom = "0px";
    flowMain.style.left = "0px";
    flowMain.style.right = "0px";
    flowMain.style.zIndex = "9999";
    flowMain.style.width = "100vw";
    flowMain.style.height = "100vh";
    flowMain.style.pointerEvents = "none";

    document.body.prepend(flowMain);
    ReactDOM.render(App(), flowMain)
}