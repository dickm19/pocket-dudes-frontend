import React from 'react'
import PetCard from '../Components/PetCard'
import ItemBar from './ItemBar'
<<<<<<< HEAD
export default function PetsContainer({user, useToy, useFood, boughtItems, bought, pets, history}){

    const renderPets = () => {
        console.log(bought)
=======
export default function PetsContainer({user, useToy, useFood, bought, pets, history}){

    const renderPets = () => {
        // console.log(pets)
>>>>>>> 65565382de1fe36298872bc4adff6226e2369017
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

