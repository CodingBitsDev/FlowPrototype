let trackingListeners = [];


export function addTrackingListener(cb, id){
    if (typeof cb !== 'function') {
        console.error("Listener Needs to be a function", cb)
    }
    trackingListeners.push({cb, id})
}

export function removeTrackingListener(cb, id){
    trackingListeners = trackingListeners.filter( ( listener => {
        if (id == listener.id) return false;
        else if (cb == listener.cb) return false;
    }))
}

// export function addIgnoreElements( ignoredElements ){

// }

let ignoredElementIDs = []
export function initTracking(ignoredElements){
    ignoredElementIDs = [...ignoredElements]

    document.body.addEventListener('click',(e) => {
        let clickedElement = null
        let preventClick = false;
        if (e && e.path) clickedElement = e.path[0];
        else if (e.originalTarget) clickedElement = e.originalTarget
        if (clickedElement && !checkIfIgnored(clickedElement)){
            trackingListeners.forEach( ( {cb} ) => {
                let result = cb(clickedElement, clickedElement.outerHTML);
                if (result == true){
                    preventClick == true;
                }
            })
        }
        if (preventClick){
            //Prevent Click TODO
        }

    }, true); 
}

function checkIfIgnored(element){
   let elem = element;
   if ( !elem || ignoredElementIDs.includes(elem.id) ) return true;
   while (elem.parentElement){
        elem = elem.parentElement;
        if ( ignoredElementIDs.includes(elem.id) ) return true;
   }
   return false;
}