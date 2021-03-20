(function(){
    setUpFirebase();
    window.flowAPI = {};
    window.flowAPI.startTracking = startTracking;
    window.flowAPI.findElementByString = findElementByString;
})();

function setUpFirebase(){
    // Your web app's Firebase configuration
    let firebaseConfig = {
        apiKey: "AIzaSyASWzyRjBuQ97djqgpmm0toF7wRxSeGgT0",
        authDomain: "flow-609c0.firebaseapp.com",
        projectId: "flow-609c0",
        storageBucket: "flow-609c0.appspot.com",
        messagingSenderId: "779121560180",
        appId: "1:779121560180:web:1da31e87127095ffc49f21"
    };
    // Initialize Firebase
    // console.log("###", firebase.initializeApp(firebaseConfig));
    // window.flowAPI.firebase = firebase;
}

function startTracking(){
    document.body.addEventListener('click',(e) => {
        console.log
        let clickedElement = null
        if (e && e.path) clickedElement = e.path[0];
        else if (e.originalTarget) clickedElement = e.originalTarget
        if (clickedElement){
            let elem = findElementByString(clickedElement.outerHTML)
            if (elem){
                console.log(elem)
                elem.style.borderColor = "red"
                elem.style.borderWidth = "2px"
                elem.style.borderStyle = "solid"
            }
        }
    }, true); 
}

function findElementByString(string){
    let stringMatch = string.match(/class="([^"]*)"/gm);
    if (!stringMatch){
        let elementList =  document.getElementsByTagName("*");
        for (let i = 0; i < elementList.length; i++){
            if (elementList[i].outerHTML == string) return elementList[i];
        }
        return null;
    } 
    let classString = stringMatch[0];
    if (classString) {
        let classQuery = classString.replace("class=", "").replaceAll("\"", "").replaceAll(" ", ".");
        let result = $("." + classQuery).toArray().find( e => {
            return (e.outerHTML == string);
        })
        return result
    }
    return null
}