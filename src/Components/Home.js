import React from 'react'
import PetCard from './PetCard'
import NewPetModal from './NewPetModal'

export default function Home({ user,  currentPet }){
    return(
        <div className="center">
            {currentPet ? 
                <PetCard pet={currentPet} />
                :
                null
            }
        </div>
    )
}