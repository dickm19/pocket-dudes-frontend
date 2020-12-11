import { combineReducers } from "redux";

const defaultState = {
    petsApi: [],
    current_pet: {}
}

function petsApiReducer(state = defaultState.petsApi, action) {
    switch (action.type) {
        case "FETCH_PETS":
            return action.payload
        case "ADD_PET":
            return [...state, action.payload]
        default:
            return state;
    }
}


const rootReducer = combineReducers({
    petsApi: petsApiReducer
  });
  

  export default rootReducer