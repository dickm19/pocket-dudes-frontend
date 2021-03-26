import { BUY_ITEM, GET_BOUGHT, GET_USER, GET_PETS, ADD_PET, USE_ITEM, GET_ITEMS, AWARD_POINTS, SPEND_POINTS, GET_POINTS} from './actionTypes'

export function getPoints(){
    return function (dispatch){
        fetch("http://localhost:5000/api/v1/users/1")
        .then(resp => resp.json())
        .then(data =>  dispatch({type: GET_POINTS, payload: data.user.points}) )
       
    }
}


export function spendPoints(points) {
    return function (dispatch){
        dispatch({type: SPEND_POINTS, payload: points})
    }
}

export function awardPoints(points, user) {
    return function (dispatch){
        fetch(`http://localhost:5000/api/v1/users/${user.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify({points: points})
        })
        .then(resp => resp.json())
        .then(() => dispatch({type: AWARD_POINTS, payload: points}))
    }
}


export function getItems(){
    return function (dispatch){
        fetch('http://localhost:5000/api/v1/items')
        .then(resp => resp.json())
        .then(data => dispatch({type: GET_ITEMS, payload: data}))
    }
}

export function buyItem(user_item) {
    return function (dispatch){
       dispatch({type: BUY_ITEM, payload: user_item})
        
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


export function useItem( boughtCopy){
    return function(dispatch){
        dispatch({type: USE_ITEM, payload: boughtCopy})
    }
}


 