import {SET_CURRENT_PET } from './actionTypes'

// FETCH_PETS, ADD_PET, 

export function setCurrentPet(pet) {
    return function (dispatch) {
        dispatch({type: SET_CURRENT_PET, payload: pet})
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