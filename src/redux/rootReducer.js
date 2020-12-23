import { combineReducers } from "redux";

const defaultState = {
    // petsApi: [],
    currentPet: null,
    bought: [],
    user: null,
    pets: [],
    items: [],
    happiness: null,
    hunger: null
    
}

function itemsReducer(state = defaultState.items, action){
    switch(action.type){
        case "GET_ITEMS":
            return action.payload
        default:
            return state
    }
}

function happinessReducer(state = defaultState.happiness, action){
    switch(action.type) {
        case "GET_PET_HAPPINESS":
            return action.payload
        case 'DECREMENT_HAPPINESS':
            return action.payload + 1
        case 'INCREMENT_HAPPINESS':
            return action.payload + 1
        default:
            return state
    }
}

function hungerReducer(state = defaultState.hunger, action){
    switch(action.type) {
        case "GET_PET_HUNGER":
            return action.payload
        case 'DECREMENT_HUNGER':
            return action.payload
        case 'INCREMENT_HUNGER':
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
        case 'DECREMENT_PET_HAPPINESS':
            return action.payload
        case 'DECREMENT_PET_HUNGER':
            return action.payload
        case 'UNSET_CURRENT_PET':
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
            return [...state, action.payload]
        case 'USE_ITEM':
            return action.payload
        case 'UN_BUY':
            return action.payload
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
    items: itemsReducer,
    happiness: happinessReducer,
    hunger: hungerReducer
  });
  

  export default rootReducer