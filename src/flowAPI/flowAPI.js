import { useFirebase } from "./firebase.js"
import {useState} from "./flowState/flowState.js"
import { addTrackingListener, removeTrackingListener } from "./tracking.js"
import { findElementByString, highlightElementByString } from "./highlighting.js"
import { initFlowActions } from "./flowActions.js"

let flowAPI;

let firebase = useFirebase().firebase;
let state = useState();
let flowActions = initFlowActions(state);
flowAPI = {
    firebase: firebase,
    state: state,
    tracking: {
        addListener: addTrackingListener,
        removeListener: removeTrackingListener,
    },
    highlighter: {
        highlightElementByString: highlightElementByString,
    }, 
    actions: flowActions, 
}

export default flowAPI;


