import React from 'react'
import PetCard from './PetCard'

export default function Home({ currentPet }){
    return(
        <div className="home">
            {currentPet ? 
                <PetCard/>
                :
                <NewPetModal/>
            }
        </div>
    )
}