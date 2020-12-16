import { combineReducers } from "redux";

const defaultState = {
    // petsApi: [],
    currentPet: null,
    bought: []
    
}

// function petsApiReducer(state = defaultState.petsApi, action) {
//     switch (action.type) {
//         case "FETCH_PETS":
//             return action.payload
//         case "ADD_PET":
//             return [...state, action.payload]
//         default:
//             return state;
//     }
// }


function currentPetReducer( state = defaultState.currentPet, action){
    switch (action.type) {
        case "SET_CURRENT_PET":
            return action.payload
        default:
            return state;
    }
}

function boughtReducer( state = defaultState.bought, action){
    switch (action.type){
        case 'BUY_ITEM':
            return [...state, action.payload]
        default:
            return state
    }
}

const rootReducer = combineReducers({
    // petsApi: petsApiReducer,
    currentPet: currentPetReducer,
    bought: boughtReducer
  });
  

  export default rootReducer