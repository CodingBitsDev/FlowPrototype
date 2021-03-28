import $ from "jquery"

import flowAPI from "./flowAPI";
let trackingState = {
    mainState: 0,
    clickData: [],  
    currentStep: 0,
    savedSkills: {},
}

let runOnDomReady = () => {}
let domReady = false;
$( document ).ready(function() {
    domReady = true;
    runOnDomReady();
});

function copyTrackingStateChanges (flowState){
    flowState.addStateListener("mainState", changeState => { trackingState.mainState = changeState.mainState || 0; });
    flowState.addStateListener("clickData", changeState => { trackingState.clickData = changeState.clickData || []; });
    flowState.addStateListener("currentStep", changeState => { trackingState.currentStep = changeState.currentStep || []; });
    flowState.addStateListener("savedSkills", changeState => { trackingState.savedSkills = changeState.savedSkills || []}); 

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
    }
    if ( currentState.mainState == 1 ){
        learnNewSkill(true);
    } else if ( currentState.mainState == 2 ){
        teachSkill( "", true);
    }
}

function learnNewSkill(active = false){
    if (!active){
        flowAPI.state.setState({ mainState: 1, clickData: [], currentStep: 0 });
    }
    flowAPI.tracking.addListener((elem, elemString) => {
        let newStep = trackingState.currentStep + 1;
        trackingState.clickData.push( elemString )
        flowAPI.state.setState({ clickData: [...trackingState.clickData], currentStep: newStep });
    }, "learning")
}

function endLearning(){
    flowAPI.tracking.removeListener(null, "learning");
    let newSavedSkills = {...trackingState.savedSkills, "testName": { clickData: trackingState.clickData, location: window.location.href }}
    flowAPI.state.setState( {mainState: 0, savedSkills: newSavedSkills, clickData : [], currentStep: 0 });
}

function teachSkill(skillID, active = false){
    let currentElement;
    if (!active){
        let skill = trackingState.savedSkills[skillID]
        if (!skill) return false;
        flowAPI.state.setState({ mainState: 2, clickData: skill.clickData, currentStep: 1 });
        window.location.replace( skill.location );
        currentElement = flowAPI.highlighter.highlightElementByString( skill.clickData[0] );
    } else {
        console.log("elem", trackingState.clickData[trackingState.currentStep])
        currentElement = flowAPI.highlighter.highlightElementByString( trackingState.clickData[trackingState.currentStep] );
    }
    flowAPI.tracking.addListener((elem, elemString) => {
        if (!currentElement) {
            alert("Can't find object")
            abortTeaching()
        }
        let newStep = trackingState.currentStep + 1;
        if ( elemString == trackingState.clickData[trackingState.currentStep]  ){
            flowAPI.state.setState({ currentStep: newStep });
            currentElement = flowAPI.highlighter.highlightElementByString( trackingState.clickData[newStep] );
        } else {
            alert("Wrong Step")
            return false; //Prevent Click
        }
    }, "teaching")

}

function abortTeaching(){
    flowAPI.tracking.removeListener(null, "teaching");
    flowAPI.state.setState( {mainState: 0, clickData : [], currentStep: 0 });
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
