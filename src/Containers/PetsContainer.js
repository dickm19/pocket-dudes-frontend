import React from 'react'
import PetCard from '../Components/PetCard'
import ItemBar from './ItemBar'

export default function PetsContainer({user,currentPet, bought, pets, history}){

    const renderPets = () => {
        // console.log(bought)
        return pets.length > 0 ? pets.map(petObj => <PetCard bought={bought} useFood={useFood} user={user} useToy={useToy} key={petObj.id} pet={petObj}/>)  : history.push('/adopt')
    }

    return(
        <div className="petsContainer">
             <ItemBar boughtItems={boughtItems} user={user}/>
            {user ? 
                renderPets()
                
            : 
            <h2>Loading</h2>
            }
        </div>
    )
}

