import $ from "jquery"
import flowAPI from "./flowAPI/flowAPI.js";

export {default as flowAPI} from "./flowAPI/flowAPI.js";
import { initOverlay } from "./overlay/overlay.js";

(function(){
    initOverlay();
    // highlightClickedElement();
})();

function highlightClickedElement(){
    flowAPI.tracking.addListener( ( clickedElement, elementString ) => {
        flowAPI.highlighter.highlightElementByString(elementString)
    })
}