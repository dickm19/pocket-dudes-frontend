import React from 'react'
import PetCard from '../Components/PetCard'
import ItemBar from './ItemBar'
import './PetsContainer.css'
export default function PetsContainer({user, points, spend, currentPet, bought, pets, happiness, hunger}){

    const boughtItems = bought.map(user_item => user_item.item)
    
    const renderPets = () => {
        return pets.map(petObj => <PetCard happiness={happiness} hunger={hunger} currentPet={currentPet} bought={bought} user={user}  key={petObj.id} pet={petObj}/>)
    }

    return(
        <>
            <div className="item-bar">
             <ItemBar points={points} spend={spend} boughtItems={boughtItems} user={user}/>
            </div>
            {user ? 
                <div className="pets-container">
                    <h1>Your Dudes</h1>
                    {renderPets()}
                </div>
            : 
            <h2>Loading</h2>
            }
        </>
    )
}

