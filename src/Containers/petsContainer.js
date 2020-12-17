import React from 'react'
import PetCard from '../Components/PetCard'
import ItemBar from './ItemBar'
export default function PetsContainer({user, useToy, useFood, bought, pets}){

    const renderPets = () => {
        // console.log(pets)
        return user ? pets.map(petObj => <PetCard useFood={useFood} useToy={useToy} key={petObj.id} pet={petObj}/>) : null
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

