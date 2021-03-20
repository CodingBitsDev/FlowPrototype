(function(){
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
    
})();

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
