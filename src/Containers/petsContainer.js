import React from 'react'
import PetCard from '../Components/PetCard'
import ItemBar from './ItemBar'
export default function PetsContainer({user, useToy, useFood, bought, pets, history}){

    const renderPets = () => {
        // console.log(pets)
        return pets.length > 0 ? pets.map(petObj => <PetCard bought={bought} useFood={useFood} user={user} useToy={useToy} key={petObj.id} pet={petObj}/>)  : history.push('/adopt')
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

