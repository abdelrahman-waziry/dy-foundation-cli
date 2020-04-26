module.exports = function(){
    return `
import {
    EXAMPLE_ACTION
} from './action-types'


/**
 * Creates an action with a specified action type and payload
 * @param {*} payload 
 */
export function exampleActionCreator(payload){
    return {
        type: EXAMPLE_ACTION,
        payload
    }
}
    `
}