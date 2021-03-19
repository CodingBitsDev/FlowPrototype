(function(){
    //alert("test")
    document.body.addEventListener('click',(e) => {
        if (e && e.path){
            let path = e.path;
            let smallestClicked = path[0];
            console.log(smallestClicked)
            smallestClicked.style.borderColor = "red"
            smallestClicked.style.borderWidth = "2px"
            smallestClicked.style.borderStyle = "solid"
        }
    }, true); 
})();