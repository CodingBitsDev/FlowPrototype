import { saveSate } from "./saveState.js";
import { debounce } from 'lodash';
import mergePersistandState from "./mergePersistantData.js";
let flowState = {};

let defaultState = {
    mainState: 0,
    currentStep: 0,  
    clickData: [],
    loaded: false,
    savedSkills = {}
}

let stateListeners = new Map()

let queueActive = false;
let stateQueue = [];

function _initState(){
    // Read it using the storage API
    chrome.storage.sync.get(['flowState'], function({ flowState: loadedState }) {
        flowState = mergePersistandState(defaultState, loadedState)
        setState({ loaded:true })
    });
}


function _saveState(newState){
    flowState = newState;
    saveSate(flowState)
}

function _updateState(){
    queueActive = true;
    while (stateQueue.length > 0){
        let stateData = stateQueue.shift();
        //Notify State Listener 
        let traverseKeys = (stateData, keyPath = "") => {
            Object.keys(stateData).forEach( key => {
                let currentKeyPath = keyPath + (!keyPath ? "" : "." ) + key
                let value = stateData[key];
                ( stateListeners.get(currentKeyPath) || [] ).forEach( (listener) => {
                    listener.cb(stateData, flowState);
                })
                if (typeof value === 'object' && value !== null){
                    traverseKeys(value, currentKeyPath);
                }
            });
        }
        traverseKeys(stateData);
        //Update to new state
        _saveState({...flowState, ...stateData});
    }
    queueActive = false;
}

function setState( stateData ){
    stateQueue.push(stateData);
    if( !queueActive ) _updateState();
}

function addStateListener( stateVarString, cb, id = "", updateImmediatly = false ){
    let currentListeners = stateListeners.get(stateVarString) || [];
    currentListeners.push({ cb, id})
    stateListeners.set(stateVarString, currentListeners);
    if (updateImmediatly){
        cb(flowState, flowState);
    }
}

function removeListener( stateVarString, cb, id  ){
    let currentListeners = stateListeners.get(stateVarString) || [];
    currentListeners = currentListeners.filter( (listener) => {
        if (id && listener.id == id ){
            return false;
        } 
        if (listener.cb == cb ){
            return false;
        } 
        return true;
    })
    stateListeners.set(currentListeners);
}

function getState(stateString = ""){
    if (stateString == "") return flowState;
    let stateArray = stateString.split(".");
    let result = flowState;
    for (let index = 0; index < stateArray.length; index++) {
        const stateKey = stateArray[index];
        if (!result[stateKey]) return null;
        result = result[stateKey]
    }
    return result;
}

_initState();
export function useState(){
    return {
        setState: setState,
        addStateListener: addStateListener,
        removeListener: removeListener,
        getState: getState,
    }
}