import React from 'react'
import PetCard from './PetCard'

export function Home(){
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