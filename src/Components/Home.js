import React from 'react'
import PetCard from './PetCard'
import NewPetModal from './NewPetModal'

export default function Home({ user,  currentPet }){
    return(
        <div className="home">
            {currentPet ? 
                null
                :
                <PetCard currentPet={currentPet} />
            }
        </div>
    )
}