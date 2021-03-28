export default function (defaultState = {}, loadedState = {}){
    // return {...defaultState }
    return {...defaultState, ...loadedState}
}