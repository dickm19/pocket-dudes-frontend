import { combineReducers } from "redux";

const defaultState = {
    // petsApi: [],
    currentPet: null,
    bought: [],
    user: null,
    pets: [],
    items: []
    
}

function itemsReducer(state = defaultState.items, action){
    switch(action.type){
        case "GET_ITEMS":
            return action.payload
        default:
            return state
    }
}

function currentPetReducer( state = defaultState.currentPet, action){
    switch (action.type) {
        case "SET_CURRENT_PET":
            return action.payload
        case 'FEED_PET':
            return action.payload
        case 'PLAY_WITH_PET':
            return action.payload
        default:
            return state;
    }
}

function boughtReducer( state = defaultState.bought, action){
    switch (action.type){
        case 'GET_BOUGHT':
            return  action.payload
        case 'BUY_ITEM':
            [...state, action.payload]
        case 'USE_ITEM':
            const boughtCopy = [...state]
            const index = boughtCopy.findIndex(item => item === action.payload)
            boughtCopy.splice(index, 1)
            return boughtCopy
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
    pets: petsReducer,
    items: itemsReducer
  });
  

  export default rootReducer