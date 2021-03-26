import { useFirebase } from "./firebase.js"
import {useState} from "./flowState/flowState.js"
import { addTrackingListener, removeTrackingListener } from "./tracking.js"
import { findElementByString, highlightElementByString } from "./highlighting.js"

let firebase = useFirebase().firebase;
let state = useState();
let flowAPI = {
    firebase: firebase,
    state: state,
    tracking: {
        addListener: addTrackingListener,
        removeTrackingListener: addTrackingListener,
    },
    highlighter: {
        highlightElementByString: highlightElementByString,
    } 
}

export default flowAPI;


