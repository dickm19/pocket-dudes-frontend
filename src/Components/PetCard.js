import React, {useState} from 'react'
import { setCurrentPet } from '../redux/actions';
import { connect } from 'react-redux'

function PetCard( {pet, currentPet}){

    const [hunger, setHunger] = useState(10)
    const [happiness, setHappiness] = useState(10)

    function feedPet(pet){
        if (hunger < 10){

            setHunger(hunger + 1)
            fetch(`http://localhost:5000/pets/${pet.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accepts': 'application/json'
                },
                body: JSON.stringify({
                    hunger: pet.hunger + 1
                })
            })
            .then(resp => resp.json())
        }else{
            console.log('full')
        }
    }

    function playWithPet(pet){
        setHappiness(happiness + 1)
        fetch(`http://localhost:5000/pets/${pet.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify({
                happiness: pet.happiness + 1
            })
        })
        .then(resp => resp.json())
    }
    return(
        <div onClick={() => setCurrentPet(pet)} className='pet-card'>
            {pet === currentPet ? 
                <div className='care-buttons'>
                    <button className="feed" onClick={() => feedPet(pet)}>Feed</button>
                    <button className="play" onClick={playWithPet}>Play</button>
                </div>
                :
                null
            }
            <p>{pet.name}</p>
            <img className='pet-image' src={pet.pet_image_url.image_url} alt={pet.name}/>
            <p className='happiness'>Happiness: {pet.happiness}/10</p>
            <p className='hunger'>Hunger: {pet.hunger}/10</p>
        </div>
    )
}

function mdp(dispatch) {
    return { 
        setCurrentPet: () => dispatch(setCurrentPet())
     }
}
export default connect(null, mdp)(PetCard);
  