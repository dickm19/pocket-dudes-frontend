import React from 'react'
import PetCard from './PetCard'
import NewPetModal from './NewPetModal'

export default function Home({ currentPet }){
    return(
        <div className="home">
            {currentPet ? 
                <PetCard/>
                :
                null
            }
        </div>
    )
}