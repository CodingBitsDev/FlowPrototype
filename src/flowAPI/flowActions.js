import flowAPI from "./flowAPI";
let trackingState = {
    mainState: 0,
    clickData: [],  
    currentStep: 0,
    savedSkills: {},
}

function copyTrackingStateChanges (flowState){
    flowState.addStateListener("mainState", changeState => { trackingState.mainState = changeState.mainState || 0; });
    flowState.addStateListener("clickData", changeState => { trackingState.clickData = changeState.clickData || []; });
    flowState.addStateListener("currentStep", changeState => { trackingState.currentStep = changeState.currentStep || []; });
    flowState.addStateListener("savedSkills", changeState => { trackingState.savedSkills = changeState.savedSkills || []}); 
}

function leranNewSkill(){
    flowAPI.state.setState({ mainState: 1, clickData: [], currentStep: 0 });
    flowAPI.tracking.addListener((elem, elemString) => {
        let newStep = currentStep + 1;
        clickData.push( elemString )
        flowAPI.highlighter.highlightElementByString( elemString );
        flowAPI.state.setState({ clickData: [...clickData], currentStep: newStep });
    }, "learning")
}

function endLearning(){
    flowAPI.tracking.removeListener(null, "learning");
    let newSavedSkills = {...savedSkills, "testName": { clickData, location: location }}
    flowAPI.state.setState( {mainState: 0, newSavedSkills, clickData : [], currentStep: 0 });
}

function teachSkill(skillID){
    let skill = trackingState.savedSkills[skillID]
    if (!skill) return false;
    flowAPI.state.setState({ mainState: 2, clickData: skill.clickData, currentStep: 1 });
    window.location.replace( skill.location );
    let currentElement = flowAPI.highlighter.highlightElementByString( skill.clickData[0] );

    flowAPI.tracking.addListener((elem, elemString) => {
        if (!currentElement) {
            alert("Can't find object")
            abortTeaching()
        }
        let newStep = trackinState.currentStep + 1;
        if ( elemString == trackingState.clickData[trackingState.currentStep]  ){
            flowAPI.state.setState({ currentStep: newStep });
            currentElement = flowAPI.highlighter.highlightElementByString( skill.clickData[newStep] );
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
        leranNewSkill,
        endLearning,
        teachSkill,
        abortTeaching,
    }
}
