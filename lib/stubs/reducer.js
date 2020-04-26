module.exports = function(){
    return `

/**
* Import action types here
*/
// import { EXAMPLE_ACTION } from './'



/**
 * Module internal initial state
 */
const initialState = {
    
};  


/**
 * Checks dispatched actions and updates state accordingly
 * @param {Object} state 
 * @param {Object} action 
 * @returns {Function} 
 */

const reducer = (state = initialState, {type, payload = null}) => {
    switch (type) {
        case 'EXAMPLE_ACTION':
            return example(state, payload)
        default:
            return state;
    }
} 

/**
 * Returns an updated version of the state based on the action
 * @param {Object} state 
 * @param {Object} payload 
 * @return {Object} state
 */
function example(state, payload) {
    return {
      state
    }
}

export default reducer
`
}