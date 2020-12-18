import {SET_CURRENT_PET, BUY_ITEM, GET_BOUGHT, GET_USER, GET_PETS, ADD_PET } from './actionTypes'

// FETCH_PETS, ADD_PET, 

export function setCurrentPet(pet) {
    return function (dispatch) {
        dispatch({type: SET_CURRENT_PET, payload: pet})
    }
}

export function buyItem(item) {
    return function (dispatch){
        dispatch({type: BUY_ITEM, payload: item})
    }
}

export function getUser(){
    return function(dispatch){
        fetch("localhost:5000/api/v1/users/1")
        .then(resp => resp.json())
        .then(data => dispatch({type: GET_USER, payload: data.user}) )
    }
}

export function getBought(user){
    return function (dispatch) {
        dispatch({type: GET_BOUGHT, payload: user.user_items})
    }
}

export function getPets(user){
    return function (dispatch){
        dispatch({type: GET_PETS, payload: user.pets})
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
      body: JSON.stringify({
        name: petObj.name,
        age: petObj.age,
        happiness: 10,
        hunger: 10,
        pet_image_url_id: petObj.pet_image_url_id,
        user_id: petObj.user_id
      })
    })
    .then(resp => resp.json())
    .then(data => dispatch({type: ADD_PET, payload: data }))
    }
}



// export function getUserFromApi() {
   
// }

// export function addPetToApi(petObj) {
//     return function (dispatch) {
//         fetch('http://localhost:5000/pets', {
//             method: 'POST',
//             headers: {
//                 "Content-Type": 'application/json',
//                 'Accepts': 'application/json'
//             },
//             body: JSON.stringify({
//                 "name": petObj.name,
//                 "image_url": petObj.image_url,
//                 "breed": petObj.breed
//             })
//         })
//             .then(resp => resp.json())
//             .then(petObj => dispatch({ type: ADD_PET, payload: petObj }))

//     }
// }