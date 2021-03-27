import { useState, useEffect } from 'react';
import { flowAPI } from "../../main.js"

function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

export default function useFlowState(pathString, defaultValue) {
    const [flowStateValue, setFlowStateValue] = useState(flowAPI.state.getState(pathString) || defaultValue);
    let randomKey = "useFlowState" + create_UUID();

    useEffect(() => {
        let flowValue = flowAPI.state.getState(pathString);
        if (flowValue != flowStateValue){
            setFlowStateValue(flowValue)
        }

        flowAPI.state.addStateListener(pathString, (change, prev) => {
            let newValue = getValueFromPathString(pathString, change)
            if (newValue != flowStateValue){
                setFlowStateValue(newValue)
            }
            return flowAPI.state.removeListener(pathString, null, randomKey)
        }, randomKey)
        return () => flowAPI.state.removeListener(pathString, null, randomKey)
    }, [])

    let setFlowState = (newValue) => {
        let updateValue = setValueToPathString(pathString, newValue);
        if (updateValue == null) return;
        flowAPI.state.setState(updateValue)
    }

    return [ flowStateValue, setFlowState ];
}

function getValueFromPathString(pathString = "", startObject){
    let pathArray = pathString.split(".");
    let currentValue = startObject;
    for (let index = 0; index < pathArray.length; index++) {
        const key = pathArray[index];
        let value = currentValue ? currentValue[key] : undefined;
        if (value === undefined) return null; 
        else {
            currentValue = value;
        }
    }
    return currentValue;
}

function setValueToPathString(pathString = "", value ){
    if (pathString == "") return null;
    let startObject = value;
    let pathArray = pathString.split(".").reverse();
    for (let index = 0; index < pathArray.length; index++) {
        const key = pathArray[index];
        startObject = {[key]: startObject}
    }
    return startObject;
}