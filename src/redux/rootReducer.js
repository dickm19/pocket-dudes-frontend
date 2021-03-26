import { combineReducers } from "redux";

const defaultState = {
    bought: [],
    user: null,
    pets: [],
    items: [],
    points: 0,
    highScore: 0,
}
function pointsReducer(state = defaultState.points, action){
    switch(action.type){
        case 'AWARD_POINTS':
            return action.payload
        case 'SPEND_POINTS':
            return action.payload
        case 'GET_POINTS':
            return action.payload
        default:
            return state
    }
}



function itemsReducer(state = defaultState.items, action){
    switch(action.type){
        case "GET_ITEMS":
            return action.payload
        default:
            return state
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
    bought: boughtReducer,
    user: userReducer,
    pets: petsReducer,
    items: itemsReducer,
    points: pointsReducer,
  });
  

  export default rootReducer