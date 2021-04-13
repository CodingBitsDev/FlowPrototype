import { findElementByString } from "./findElement/findElement.js";
export { findElementByString } from "./findElement/findElement.js";

let boxes = [];

export function highlightElementByString( elemString, keepLast = false){
    let elem = findElementByString( elemString )

    if(!keepLast){
        boxes.forEach(highlightElem => highlightElem.remove());
    }

    if (elem){
        boxes.push(createBox(elem))
        // elem.style.borderColor = "red"
        // elem.style.borderWidth = "2px"
        // elem.style.borderStyle = "solid"
        return elem;
    } 
    return null;
}

export function removeAllHighlighting(){
    boxes.forEach(highlightElem => highlightElem.remove());
}

function getScrollParent(node) {
  if (node == null) {
    return null;
  }

  if (node.scrollHeight > node.clientHeight) {
    return node;
  } else {
    return getScrollParent(node.parentNode);
  }
}

function createBox(node){
    let yMin = node.offsetTop;
    let width = node.offsetWidth;
    let yMax = yMin + width;
    let xMin = node.offsetLeft;
    let height = node.offsetHeight;
    let xMax = xMin + height;

    let box = document.createElement("div");
    box.style.position = "absolute";
    box.style.top = yMin + "px"
    box.style.bottom = yMax + "px"
    box.style.left = xMin + "px"
    box.style.right = xMax + "px"
    box.style.width = width + "px";
    box.style.height = height + "px";
    box.style.backgroundColor = "rgba(255,255,0,0.3)";
    box.style.pointerEvents = "none";

    node.parentNode.appendChild(box)
    return box;
}