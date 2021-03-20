let flowMain;
(function(){
    let flowMain = document.createElement("div");
    flowMain.class="flow-main";
    flowMain.id="flow-main";
    flowMain.style.position = "fixed";
    flowMain.style.top = "0px";
    flowMain.style.bottom = "0px";
    flowMain.style.left = "0px";
    flowMain.style.right = "0px";
    flowMain.style.zIndex = "9999";
    flowMain.style.width = "100vw";
    flowMain.style.height = "100vh";
    flowMain.style.pointerEvents = "none";

    document.body.prepend(flowMain);
    onDocumentReady(() => {
        ReactDOM.render(App(), flowMain)
    })
})()

function onDocumentReady(cb){
    if (document.readyState === "complete") {
        cb()
    } else {
        setTimeout(() => onDocumentReady(cb), 100);
    }
}

function App(props){
    let hasScrollBar = document.body.scrollHeight > window.innerHeight
    return React.createElement(
        'div',
        { style: {
            position: "absolute",
            top: "20%",
            right: hasScrollBar ? "17px" : "0px",
            width: "50px",
            height: "50px",
            backgroundColor: "blue",
            pointerEvents: "auto",
        }},
        "test"
    )
}
