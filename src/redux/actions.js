import {FETCH_PETS, ADD_PET } from './actionTypes'



export function getPetsFromApi() {
    return function (dispatch) {
        fetch('http://localhost:5000/pets')
            .then(resp => resp.json())
            .then(data => dispatch({ type: FETCH_PETS, payload: data }))
    }
}

export function addPetToApi(petObj) {
    return function (dispatch) {
        fetch('http://localhost:5000/pets', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify({
                "name": petObj.name,
                "image_url": petObj.image_url,
                "breed": petObj.breed
            })
        })
            .then(resp => resp.json())
            .then(petObj => dispatch({ type: ADD_PET, payload: petObj }))

    }
}