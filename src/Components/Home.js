import React from 'react'

import PetCard from './PetCard'

export default function Home({ user, history,  currentPet, happiness, hunger, bought }){
    return(
        <div className="center">
            {currentPet ? 
                <PetCard happiness={happiness} hunger={hunger} currentPet={currentPet} bought={bought} user={user}  key={currentPet.id} pet={currentPet}/>
                :
                history.push('/pets')
            }
        </div>
    )
}