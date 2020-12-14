import { combineReducers } from "redux";

const defaultState = {
    // petsApi: [],
    currentPet: {},
    user: {}
    
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
function getUserFromApi(state = defaultState.user, action){
    switch(action.type){
        case "FETCH_USER":
            return action.payload
        default:
            return state
    }
}

function currentPetReducer( state = defaultState.currentPet, action){
    switch (action.type) {
        case "SET_CURRENT_PET":
            return action.payload
        default:
            return state;
    }
}


const rootReducer = combineReducers({
    // petsApi: petsApiReducer,
    currentPet: currentPetReducer,
    user: getUserFromApi
  });
  

  export default rootReducer