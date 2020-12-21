import React from 'react'
import PetCard from '../Components/PetCard'
import ItemBar from './ItemBar'

export default function PetsContainer({user, currentPet, bought, pets, history, happiness, hunger}){

    const boughtItems = bought.map(user_item => user_item.item)
    
    const renderPets = () => {
        
        return pets.map(petObj => <PetCard happiness={happiness} hunger={hunger} currentPet={currentPet} bought={bought} user={user}  key={petObj.id} pet={petObj}/>)
    }

    return(
        <div className="petsContainer">
             <ItemBar bought={boughtItems} user={user}/>
            {user ? 
                renderPets()
                
            : 
            <h2>Loading</h2>
            }
        </div>
    )
}

