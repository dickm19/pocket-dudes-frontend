import {SET_CURRENT_PET, BUY_ITEM, GET_BOUGHT, GET_USER, GET_PETS, ADD_PET, USE_ITEM, FEED_PET, PLAY_WITH_PET, GET_ITEMS, DECREMENT_PET_HAPPINESS, DECREMENT_PET_HUNGER, GET_PET_HAPPINESS, GET_PET_HUNGER, INCREMENT_HAPPINESS, INCREMENT_HUNGER, DECREMENT_HUNGER, DECREMENT_HAPPINESS, UNSET_CURRENT_PET} from './actionTypes'

// FETCH_PETS, ADD_PET, 

export function setCurrentPet(pet) {
    return function (dispatch) {
        dispatch({type: SET_CURRENT_PET, payload: pet})
    }
}

export function unsetCurrentPet() {
    return function (dispatch) {
        dispatch({type: UNSET_CURRENT_PET, payload: null})
    }
}
export function getPetHappiness(pet) {
    return function (dispatch) {
        dispatch({type: GET_PET_HAPPINESS, payload: pet.happiness})
    }
}

export function getPetHunger(pet) {
    return function (dispatch) {
        dispatch({type: GET_PET_HUNGER, payload: pet.hunger})
    }
}

export function incrementHappiness(pet){
    const happiness = pet.happiness + 1
    return function (dispatch) {
        dispatch({type: INCREMENT_HAPPINESS, payload: happiness})
    }
}

export function incrementHunger(pet){
    const hunger = pet.hunger + 1
    return function (dispatch) {
        dispatch({type: INCREMENT_HUNGER, payload: hunger})
    }
}

export function decrementHappiness(pet){
    const happiness = pet.happiness - 1
    return function (dispatch) {
        dispatch({type: DECREMENT_HAPPINESS, payload: happiness})
    }
}

export function decrementHunger(pet){
    const hunger = pet.hunger - 1
    return function (dispatch) {
        dispatch({type: DECREMENT_HUNGER, payload: hunger })
    }
}
export function decrementPetHappiness(pet){
    return function (dispatch) {
        fetch(`http://localhost:5000/api/v1/pets/${pet.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify({
                happiness: pet.happiness - 1
            })
        })
        .then(resp => resp.json())
        .then(data => dispatch({type: DECREMENT_PET_HAPPINESS, payload: data}))
    }
}
export function decrementPetHunger(pet){
    return function (dispatch) {
        fetch(`http://localhost:5000/api/v1/pets/${pet.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify({
                hunger: pet.hunger - 1
            })
        })
        .then(resp => resp.json())
        .then(data => dispatch({type: DECREMENT_PET_HUNGER, payload: data}))
    }
}
export function getItems(){
    return function (dispatch){
        fetch('http://localhost:5000/api/v1/items')
        .then(resp => resp.json())
        .then(data => dispatch({type: GET_ITEMS, payload: data}))
    }
}

export function buyItem(item, user) {
    return function (dispatch){
        fetch("http://localhost:5000/api/v1/user_items", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify({
                user_id: user.id,
                item_id: item.id
            })
        })
        .then(resp => resp.json())
        .then(data =>  dispatch({type: BUY_ITEM, payload: data.user_item}))
        
    }
}


export function getUser(){
    return function(dispatch){
        fetch("http://localhost:5000/api/v1/users/1")
        .then(resp => resp.json())
        .then(data => dispatch({type: GET_USER, payload: data.user}) )
    }
}

export function getBought(){
    return function (dispatch) {
        fetch("http://localhost:5000/api/v1/users/1")
        .then(resp => resp.json())
        .then(data => dispatch({type: GET_BOUGHT, payload: data.user.user_items}) )
        
    }
}

export function getPets(){
    return function (dispatch){
        fetch("http://localhost:5000/api/v1/users/1")
        .then(resp => resp.json())
        .then(data =>  dispatch({type: GET_PETS, payload: data.user.pets}) )
       
    }
}

export function addPet(petObj){
    return function(dispatch){
        fetch("http://localhost:5000/api/v1/pets", {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify(petObj)
        })
        .then(resp => resp.json())
        .then(data => dispatch({type: ADD_PET, payload: data.pet }))
    }
}


export function useItem(user_item){
    return function(dispatch){
        fetch(`http://localhost:5000/api/v1/user_items/${user_item.id}`, {
            method: 'DELETE'
        })
        .then(resp => resp.json())
        .then(()=> dispatch({type: USE_ITEM, payload: user_item}))
    }
}

export function feedPet(pet){
    return function(dispatch){
        const hunger = pet.hunger + 1
        fetch(`http://localhost:5000/api/v1/pets/${pet.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify({
                hunger: hunger
            })
            
        })
        .then(resp => resp.json())
        .then(data => dispatch({type: FEED_PET, payload: data}))
    }
}

export function playWithPet(pet){
    return function(dispatch){
        fetch(`http://localhost:5000/api/v1/pets/${pet.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify({
                happiness: pet.happiness + 1

            })
            
        })
        .then(resp => resp.json())
        .then(data => dispatch({type: PLAY_WITH_PET, payload: data}))
    }
}

