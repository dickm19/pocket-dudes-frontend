import React from 'react'
import { setCurrentPet } from '../redux/actions';
import { connect } from 'react-redux'
function PetCard( {pet, currentPet, setCurrentPet}){

    return(
        <div onClick={() => setCurrentPet(pet)} className='pet-card'>
            {pet === currentPet ? 
                <div className='care-buttons'>
                    <button className="feed" onClick={feedPet}>Feed</button>
                    <button className="play" onClick={playWithPet}>Play</button>
                </div>
                :
                null
            }
            <p>{pet.name}</p>
            <img className='pet-image' src={pet.image_url} alt={pet.name}/>
            <p className='happiness'>Happiness: {pet.happiness}/10</p>
            <p className='hunger'>Hunger: {pet.hunger}/10</p>
        </div>
    )
}

function mdp(dispatch) {
    return { setCurrentPet: () => dispatch(setCurrentPet()) }
}
export default connect(null, mdp)(PetCard);
  