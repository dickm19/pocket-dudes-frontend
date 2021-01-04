import { BUY_ITEM, GET_BOUGHT, GET_USER, GET_PETS, ADD_PET, USE_ITEM, GET_ITEMS, GET_PET_HAPPINESS, GET_PET_HUNGER, INCREMENT_HAPPINESS, INCREMENT_HUNGER, DECREMENT_HUNGER, DECREMENT_HAPPINESS, AWARD_POINTS, SET_VAL, SET_HIGH_SCORE, SPEND_POINTS, GET_POINTS} from './actionTypes'

// FETCH_PETS, ADD_PET, 

// export function setCurrentPet(pet) {
//     return function (dispatch) {
//         dispatch({type: SET_CURRENT_PET, payload: pet})
//     }
// }

// export function unsetCurrentPet() {
//     return function (dispatch) {
//         dispatch({type: UNSET_CURRENT_PET, payload: null})
//     }
// }

// export function getItemBools(){
//     return function (dispatch){
//         fetch('http://localhost:5000/api/v1/items')
//         .then(resp => resp.json())
//         .then(data => {
//             const items = [...data]
//             let itemBools = items.map(itemObj => {
//                 return {item: itemObj, bool: itemObj.bought}
//             })
//             dispatch({type: GET_ITEM_BOOLS, payload: itemBools})
//         })
//     }
// }

// export function setItemBool(item, itemBools){
//     return function (dispatch){
//         const itemBoolsCopy = [...itemBools]
//         const foundItemBool = itemBoolsCopy.find(itemBoolObj => itemBoolObj.item === item)
//         foundItemBool.bool = false
//         dispatch({type: SET_ITEM_BOOL, payload: itemBoolsCopy })
//     }
// }

export function getPoints(){
    return function (dispatch){
        fetch("http://localhost:5000/api/v1/users/1")
        .then(resp => resp.json())
        .then(data =>  dispatch({type: GET_POINTS, payload: data.user.points}) )
       
    }
}

export function setHighScore(score){
    return function (dispatch){
        dispatch({type: SET_HIGH_SCORE, payload: score})
    }
}

export function setVal(e){
    return function (dispatch){
        dispatch({type: SET_VAL, payload: e.key})
    }
}
export function getPetHappiness(pet) {
    return function (dispatch) {
        dispatch({type: GET_PET_HAPPINESS, payload: pet.happiness})
    }
}
// export function getPoints(user) {
//     return function (dispatch) {
//         dispatch({type: GET_POINTS, payload: user.points})
//     }
// }

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

export function getPetHunger(pet) {
    return function (dispatch) {
        dispatch({type: GET_PET_HUNGER, payload: pet.hunger})
    }
}

export function incrementHappiness(pet){
    return function (dispatch) {
        dispatch({type: INCREMENT_HAPPINESS, payload: pet.happiness})
    }
}

export function incrementHunger(pet){
    return function (dispatch) {
        dispatch({type: INCREMENT_HUNGER, payload: pet.hunger})
    }
}

export function decrementHappiness(pet){
    return function (dispatch) {
        dispatch({type: DECREMENT_HAPPINESS, payload: pet.happiness - 1})
    }
}

export function decrementHunger(pet){
    return function (dispatch) {
        dispatch({type: DECREMENT_HUNGER, payload: pet.hunger - 1 })
    }
}
// export function decrementPetHappiness(pet){
//     return function (dispatch) {
//         fetch(`http://localhost:5000/api/v1/pets/${pet.id}`, {
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Accepts': 'application/json'
//             },
//             body: JSON.stringify({
//                 happiness: pet.happiness - 1
//             })
//         })
//         .then(resp => resp.json())
//         .then(data => dispatch({type: DECREMENT_PET_HAPPINESS, payload: data}))
//     }
// }
// export function decrementPetHunger(pet){
//     return function (dispatch) {
//         fetch(`http://localhost:5000/api/v1/pets/${pet.id}`, {
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Accepts': 'application/json'
//             },
//             body: JSON.stringify({
//                 hunger: pet.hunger - 1
//             })
//         })
//         .then(resp => resp.json())
//         .then(data => dispatch({type: DECREMENT_PET_HUNGER, payload: data}))
//     }
// }
export function getItems(){
    return function (dispatch){
        fetch('http://localhost:5000/api/v1/items')
        .then(resp => resp.json())
        .then(data => dispatch({type: GET_ITEMS, payload: data}))
    }
}

// export function getBoughtBool(item){
//     return function (dispatch){
//         dispatch({type: GET_BOUGHT_BOOL, payload: item.bought})
//     }
// }

// export function setBoughtBool(currentBoughtBool){
//     return function (dispatch){
//         dispatch({type: SET_BOUGHT_BOOL, payload: !currentBoughtBool})
//     }
// }

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


   
// export function feedPet(pet) {
//     return function (dispatch){
//         fetch(`http://localhost:5000/api/v1/pets/${pet.id}`, {
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Accepts': 'application/json'
//             },
//             body: JSON.stringify({
//                 hunger: pet.hunger + 1
//             })
//         })
//         .then(resp => resp.json())
//         .then(data =>  dispatch({type: FEED_PET, payload: data}))
        
//     }

// }

// export function playWithPet(pet) {
//     return function (dispatch){
//         fetch(`http://localhost:5000/api/v1/pets/${pet.id}`, {
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Accepts': 'application/json'
//             },
//             body: JSON.stringify({
//                 happiness: pet.happiness + 1
//             })
//         })
//         .then(resp => resp.json())
//         .then(data =>  dispatch({type: PLAY_WITH_PET, payload: data}))
        
//     }

// }
