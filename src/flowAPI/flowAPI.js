import { useFirebase } from "./firebase.js"
import {useState} from "./flowState/flowState.js"
import { addTrackingListener, removeTrackingListener } from "./tracking.js"
import { findElementByString, highlightElementByString } from "./highlighting.js"
import { initFlowActions } from "./flowActions.js"

let flowApi;

let firebase = useFirebase().firebase;
let state = useState();
let flowActions = initFlowActions(flowApi);
flowAPI = {
    firebase: firebase,
    state: state,
    tracking: {
        addListener: addTrackingListener,
        removeListener: removeTrackingListener,
    },
    highlighter: {
        highlightElementByString: highlightElementByString,
    } 
}

export default flowAPI;


