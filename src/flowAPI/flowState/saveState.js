import { debounce } from 'lodash';
let flowState = {};

let afterSave = (flowState) => {

}

let safeFunc = debounce(() => {
    chrome.storage.sync.set({ flowState }, function() { 
        afterSave(flowState);
    });
}, 200)

window.onbeforeunload = function(){
  saveState(flowState, true);
};

export function saveState(newState, immediate){
    flowState = filterSavedState(newState);
    if (immediate){
        chrome.storage.sync.set({ flowState }, function() { 
        });
    } else {
        safeFunc();
    }
}

function filterSavedState(savedState){
    return savedState
}