import React from 'react'
import PetCard from '../Components/PetCard'

export default function PetsContainer({user}){

    const renderPets = () => {
        return user ? user.pets.map(petObj => <PetCard key={petObj.id} pet={petObj}/>) : null
    }

    return(
        <div className="petsContainer">
            {user ? 
                renderPets()
            : 
            <h2>Loading</h2>
            }
        </div>
    )
}

