(function(){
    //alert("test")
    let clickedElements = [];
    document.body.addEventListener('click',(e) => {
        if (e && e.path){
            let path = e.path;
            let smallestClicked = path[0];
            console.log(smallestClicked);
            console.log(smallestClicked.outerHTML);

            let elem = findElementByString(smallestClicked)
            elem.style.borderColor = "red"
            elem.style.borderWidth = "2px"
            elem.style.borderStyle = "solid"
            //save clicked
            clickedElements.push(smallestClicked);
        }
    }, true); 
    
})();

function findElementByString(string){
    $("." + test.match(/class="([^"]*)"/gm)[0].replace("class=", "").replaceAll("\"", "").replaceAll(" ", ".")).toArray().find( e => {
        return (e.outerHTML == string);
    })
}
