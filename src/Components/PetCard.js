import React from 'react'

export default function PetCard( {pet, currentPet}){

    return(
        <div className='pet-card'>
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