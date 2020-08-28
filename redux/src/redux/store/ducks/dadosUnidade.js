import { createActions, createReducer } from "reduxsauce";

/**
 * Action types & creators
 */
export const { Types, Creators } = createActions({
    updateNome: ["text"]
});




/**
 * Handlers
 */
const INICIAL_STATE = {
   text : ''
};


export const update = (state = INICIAL_STATE, action) => {
    return { ...state, text: action.text }
}


/**
 * Reducer
 */
export default createReducer(INICIAL_STATE, {
  [Types.UPDATE_NOME]: update,

});

