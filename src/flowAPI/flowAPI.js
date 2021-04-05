import { useFirebase } from "./firebase.js"
import {useState} from "./flowState/flowState.js"
import { addTrackingListener, removeTrackingListener, initTracking } from "./tracking.js"
import { findElementByString, highlightElementByString, removeAllHighlighting } from "./highlighting.js"
import { initFlowActions } from "./flowActions.js"

let flowAPI;

let firebase = useFirebase().firebase;
let state = useState();
let flowActions = initFlowActions(state);
initTracking([ "flow-main" ])
flowAPI = {
    firebase: firebase,
    state: state,
    tracking: {
        addListener: addTrackingListener,
        removeListener: removeTrackingListener,
    },
    highlighter: {
        highlightElementByString: highlightElementByString,
        removeAllHighlighting: removeAllHighlighting,
    }, 
    actions: flowActions, 
}

export default flowAPI;


