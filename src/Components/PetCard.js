import React from 'react'
import { feedPet, playWithPet, setCurrentPet, useItem } from '../redux/actions';
import { connect } from 'react-redux'
import './PetCard.css'

class PetCard extends React.Component{

    state = {
        hunger: this.props.pet.hunger,
        happiness: this.props.pet.happiness,
        clicked: false
    }


    componentDidMount(){
        setInterval(() => {
            this.decrementPetCount()
        }, 1*15000)
    }


    decrementPetCount = () => {
        
            if (this.state.happiness > 0){
                this.decrementPetHappiness()
            }
            if (this.state.hunger > 0){
                this.decrementPetHunger()
            }
            //window.location.reload(false);

    }

    localFeedPet = () => {
        const boughtFood = this.props.bought.filter(user_item => user_item.item.kind === 'food')
        const user_food = boughtFood[0]
        return function(){
            feedPet(this.props.pet)
            useItem(user_food)
        }
     
    }

    localPlayWithPet = () => {
        const boughtToy = this.props.bought.filter(user_item => user_item.item.kind === 'toy')
        const user_toy = boughtToy[0]
        return function(){
            playWithPet(this.props.pet)
            useItem(user_toy)
        }
    }

    

    localSetCurrentPet = () => {
        this.setState({clicked: true})
        return setCurrentPet(this.props.pet)
    }

    decrementPetHappiness = () => {
            if (this.state.happiness > 0){

                const decrementedHappiness = this.state.happiness - 1
    
                fetch(`http://localhost:5000/api/v1/pets/${this.props.pet.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accepts': 'application/json'
                    },
                    body: JSON.stringify({
                        happiness: decrementedHappiness
                    })
                })
                .then( resp => resp.json())
                .then(() => {
                    this.setState({
                        happiness: decrementedHappiness
                    })})
            }
    }

    decrementPetHunger = () => {
        if (this.state.hunger > 0){

            const decrementedHunger = this.state.hunger - 1
            fetch(`http://localhost:5000/api/v1/pets/${this.props.pet.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accepts': 'application/json'
                },
                body: JSON.stringify({
                    hunger: decrementedHunger
                })
            })
            .then( resp => resp.json())
            .then(() => {
                this.setState({
                    hunger: decrementedHunger
                })})
        }
    }


    render(){
        return(
            <div  className='pet-card'>
                <p>{this.props.pet.name}</p>
                <img className='pet-image' src={this.props.pet.pet_image_url.image_url} onClick={() =>  this.localSetCurrentPet()} alt={this.props.pet.name}/>
                <p className='happiness'>Happiness: {this.state.happiness}/10</p>
                <p className='hunger'>Hunger: {this.state.hunger}/10</p>
               
                    {this.state.clicked ? 
                    <div>
                        <button className="care-button" onClick={() => this.localFeedPet()}>Feed</button>
                        <button className="care-button" onClick={() => this.localPlayWithPet()}>Play</button>
                    </div>
                       
                    :
                        null
                    }
                
            </div>
        )
    }
}

function mdp(dispatch) {
    return { 
        setCurrentPet: (pet) => dispatch(setCurrentPet(pet)),
        feetPet: (pet) => dispatch(feedPet(pet)),
        playWithPet: (pet) => dispatch(playWithPet(pet)),
        useItem: (user_item) => dispatch(useItem(user_item))
       
     }
}
export default connect(null, mdp)(PetCard);
  