let flowState = {
    mainState: 0,
    currenStep: 0,  
    clickData: [],
}

let stateListeners = new Map()

let queueActive = true;
let stateQueue = [];

function _initState(){
   //Laoad state from storage with key of page 
}

function _saveState(newState){
    flowState = newState;
   //Save state to storage with key of page
}

function _updateState(){
    queueActive = true;
    while (stateQueue.length > 0){
        let stateData = stateQueue.unshift();
        //Notify State Listener 
        let traverseKeys = (stateData, keyPath = "") => {
            Object.keys(stateData).forEach( key => {
                let currentKeyPath = keyPath + !keyPath ? "" : "." + key
                let value = stateData[key]
                stateListeners.get(currentKeyPath).forEach( (listener) => {
                    listener.cb(flowState, stateData);
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

function addStateListener( stateVarString, cb, id = "" ){
    let currentListeners = stateListeners.get(stateVarString) || [];
    currentListeners.push({ cb, id})
    stateListeners.set(currentListeners);
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
    let stateArray = stateString.split(".");
    let result = null;
    for (let index = 0; index < stateArray.length; index++) {
        const stateKey = stateArray[index];
        if (flowState[stateKey]) return null;
        result = flowState[stateKey]
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