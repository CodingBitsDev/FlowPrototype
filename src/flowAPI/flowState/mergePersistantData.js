export default function (defaultState = {}, loadedState = {}){

    return {...defaultState, ...loadedState}
}