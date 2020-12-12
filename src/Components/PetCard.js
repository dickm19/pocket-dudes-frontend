import React from 'react'

export default function PetCard( {pet}){

    return(
        <div className='pet-card'>
            <p>{pet.name}</p>
            <img className='pet-image' src={pet.image_url} alt={pet.name}/>
            <p className='happiness'>Happiness: {pet.happiness}/10</p>
            <p className='hunger'>Hunger: {pet.hunger}/10</p>
        </div>
    )
}