import React from 'react'
import PetCard from '../Components/PetCard'
import ItemBar from './ItemBar'
export default function PetsContainer({user, useToy, useFood, bought}){

    const renderPets = () => {
        return user ? user.pets.map(petObj => <PetCard useFood={useFood} useToy={useToy} key={petObj.id} pet={petObj}/>) : null
    }

    return(
        <div className="petsContainer">
             <ItemBar bought={bought} user={user}/>
            {user ? 
                renderPets()
            : 
            <h2>Loading</h2>
            }
        </div>
    )
}

