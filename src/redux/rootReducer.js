import { combineReducers } from "redux";

const defaultState = {
    // petsApi: [],
    currentPet: null,
    bought: [],
    user: {},
    pets: []
    
}



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
        case 'GET_BOUGHT':
            return [...state, action.payload]
        default:
            return state
    }
}

function userReducer( state = defaultState.user, action){
    switch (action.type){
        case 'GET_USER':
            return action.payload
        default:
            return state
    }
}

function petsReducer(state = defaultState.pets, action){
    switch (action.type){
        case 'GET_PETS':
            return action.payload
        case 'ADD_PET':
            return [...state, action.payload]
        default:
            return state
    }
}

const rootReducer = combineReducers({
    // petsApi: petsApiReducer,
    currentPet: currentPetReducer,
    bought: boughtReducer,
    user: userReducer,
    pets: petsReducer
  });
  

  export default rootReducer