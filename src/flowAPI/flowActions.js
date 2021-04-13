import $ from "jquery"

import flowAPI from "./flowAPI";
let trackingState = {
    mainState: 0,
    clickData: [],  
    currentStep: 0,
    savedSkills: {},
    startLocation: "",
    shouldClick: false,
}

const config = { attributes: true, childList: true, subtree: true };
let onDomChange = (mutationsList, observer) => {}
const domMutationObserver = new MutationObserver((...args) => {onDomChange(args)});
// Callback function to execute when mutations are observed


let runOnDomReady = () => {}
let domReady = false;
$( document ).ready(function() {
    domReady = true;
    runOnDomReady();
});

function copyTrackingStateChanges (flowState){
    flowState.addStateListener("mainState", changeState => { trackingState.mainState = changeState.mainState || 0});
    flowState.addStateListener("clickData", changeState => { trackingState.clickData = changeState.clickData || []});
    flowState.addStateListener("currentStep", changeState => { trackingState.currentStep = changeState.currentStep || []});
    flowState.addStateListener("savedSkills", changeState => { trackingState.savedSkills = changeState.savedSkills || []}); 
    flowState.addStateListener("startLocation", changeState => { trackingState.startLocation = changeState.startLocation || ""}); 
    flowState.addStateListener("shouldClick", changeState => { trackingState.shouldClick = changeState.shouldClick || false}); 

    flowState.addStateListener("loaded", ( changeState, flowState ) => {
        let currentState = {...flowState, ...changeState}
        if (domReady){
            checkIfStateActive(currentState);
        } else {
            runOnDomReady = () => {
                checkIfStateActive(currentState);
            }
        }
    }); 
}

function checkIfStateActive(currentState){
    trackingState = {
        mainState: currentState.mainState,
        clickData: currentState.clickData,
        currentStep: currentState.currentStep,
        savedSkills: currentState.savedSkills,
        startLocation: currentState.startLocation,
        shouldClick: currentState.shouldClick,
    }
    if ( currentState.mainState == 1 ){
        learnNewSkill(true);
    } else if ( currentState.mainState == 2 ){
        teachSkill( "", true);
    }
}

function learnNewSkill(active = false){
    if (!active){
        flowAPI.state.setState({ mainState: 1, clickData: [], currentStep: 0, startLocation: window.location.href });
    }
    flowAPI.tracking.addListener((elem, elemString) => {
        let newStep = trackingState.currentStep + 1;
        trackingState.clickData.push( elemString )
        flowAPI.state.setState({ clickData: [...trackingState.clickData], currentStep: newStep });
    }, "learning")
}

function endLearning(){
    flowAPI.tracking.removeListener(null, "learning");
    let newSavedSkills = {...trackingState.savedSkills, "testName": { clickData: trackingState.clickData, location: trackingState.startLocation }}
    flowAPI.state.setState( {mainState: 0, savedSkills: newSavedSkills, clickData : [], currentStep: 0 });
}

function teachSkill(skillID, active = false, shouldClick = false){
    let currentElement;
    if (!active){
        let skill = trackingState.savedSkills[skillID]
        if (!skill) return false;
        // currentElement = flowAPI.highlighter.highlightElementByString( skill.clickData[0] );
        flowAPI.state.setState({ mainState: 2, clickData: skill.clickData, currentStep: 0, shouldClick: shouldClick});
        window.location.replace( skill.location );
    } else {
        currentElement = flowAPI.highlighter.highlightElementByString( trackingState.clickData[trackingState.currentStep] );
    }
    flowAPI.tracking.addListener((elem, elemString) => {
        if (!currentElement) {
            abortTeaching()
        }
        let newStep = trackingState.currentStep + 1;
        if ( elem == currentElement ){
            if ( !trackingState.clickData[newStep] ) return abortTeaching();
            flowAPI.state.setState({ currentStep: newStep });
            currentElement = flowAPI.highlighter.highlightElementByString( trackingState.clickData[newStep] );
            if (!currentElement){
                onDomChange = (mutationsList, observer) => {
                    currentElement = flowAPI.highlighter.highlightElementByString( trackingState.clickData[newStep] );
                    if (currentElement){
                        domMutationObserver.disconnect()
                        if (shouldClick || trackingState.shouldClick){ 
                            currentElement && currentElement.dispatchEvent(new Event('click'));
                        }
                    }
                    console.log("###Listen")
                }
                domMutationObserver.observe(document.body, config)
            }else {
                if (shouldClick || trackingState.shouldClick){ 
                    currentElement && currentElement.dispatchEvent(new Event('click'));
                }
            }
        } else {
            alert("Wrong Step")
            return false; //Prevent Click
        }
    }, "teaching")
    console.log(shouldClick, trackingState.shouldClick)
    if (shouldClick || trackingState.shouldClick){ 
        currentElement && currentElement.dispatchEvent(new Event('click'));
    }
}

function abortTeaching(){
    flowAPI.tracking.removeListener(null, "teaching");
    flowAPI.highlighter.removeAllHighlighting();
    flowAPI.state.setState( {mainState: 0, clickData : [], currentStep: 0, shouldClick: false });
}

export function initFlowActions(flowState){
    copyTrackingStateChanges(flowState);
    return {
        learnNewSkill,
        endLearning,
        teachSkill,
        abortTeaching,
    }
}
