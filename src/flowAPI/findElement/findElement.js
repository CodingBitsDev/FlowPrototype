import $ from "jquery"

export function findElementByString(string){
    let elementList =  document.getElementsByTagName("*");
    console.log(elementList)
    let matches = [];
    for (let i = 0; i < elementList.length; i++){
        if (elementList[i].outerHTML == string) matches.push(elementList[i]);
    }
    if (matches){
        console.log(string ,matches)
        return findBestMatch({string}, matches)
    }
    //No Direct Match
    return null
}

function removeClassFromString(string){
    
}

function findBestMatch( data, matches ){
    let {string} = data;
    return matches[0];
}