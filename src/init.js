import $ from "jquery"
import { initOverlay } from "./overlay/overlay.js";
import flowAPI from "./flowAPI/flowAPI.js";

(function(){
    window.flowAPI = flowAPI;

    initOverlay();
    highlightClickedElement();
})();

function highlightClickedElement(){
    flowAPI.tracking.addListener( ( clickedElement, elementString ) => {
        flowAPI.highlighter.highlightElementByString(elementString)
    })
}