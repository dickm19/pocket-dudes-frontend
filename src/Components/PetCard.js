import React from 'react'
import { feedPet, playWithPet, setCurrentPet, useItem, incrementHappiness, incrementHunger, getPetHappiness, getPetHunger, decrementHappiness, decrementHunger, unsetCurrentPet, unBuy } from '../redux/actions';
import { connect } from 'react-redux'
import './PetCard.css'

const PetCard = React.memo(class extends React.Component{

    state = {
        clicked: false,
        happiness: null,
        hunger: null,
        currentPet: null
    }


     componentDidMount(){
        setInterval(() => {
            return this.props.pet === this.props.currentPet ?
                // this.setState({currentPet: this.props.pet })
                (this.decrementHappiness())
            :
                null
        }, 1*11000)

        setInterval(() => {
            return this.props.pet === this.props.currentPet ?
                // this.setState({currentPet: this.props.pet })
                (this.decrementHunger())
            :
                null
        }, 1*11000)
        
    }


    decrementHappiness(){
            // console.log('test2')
            if (this.props.pet.happiness > 0){
                fetch(`http://localhost:5000/api/v1/pets/${this.props.pet.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accepts': 'application/json'
                },
                body: JSON.stringify({
                    happiness: this.props.pet.happiness - 1
                })
                })
                .then(resp => resp.json())
                .then(() => this.setState({happiness: this.state.happiness - 1}))
                
            }
    }
    decrementHunger(){
        // console.log('test2')
        if (this.props.pet.hunger > 0){
            fetch(`http://localhost:5000/api/v1/pets/${this.props.pet.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify({
                hunger: this.props.pet.hunger - 1
            })
            })
            .then(resp => resp.json())
            .then( () => this.setState({hunger: this.state.hunger - 1}))
           
        }
}


    localFeedPet = () => {
        if (this.props.currentPet.hunger < 10){
            const boughtFood = this.props.bought.filter(user_item => user_item.item.kind === 'food')
            const user_food = boughtFood[0]
            this.props.incrementHunger(this.props.currentPet)
            const boughtCopy = [...this.props.bought]
            const index = boughtCopy.findIndex(item => item === user_food)
            boughtCopy.splice(index, 1)
            this.props.feedPet(this.props.currentPet)
            this.props.useItem(user_food, boughtCopy)
            this.props.unBuy(user_food.item, boughtCopy)
        }
    }

    localPlayWithPet = () => {
        if (this.props.currentPet.happiness < 10){
            const boughtToy = this.props.bought.filter(user_item => user_item.item.kind === 'toy')
            const user_toy = boughtToy[0]
            this.props.incrementHappiness(this.props.currentPet)        
            const boughtCopy = [...this.props.bought]
            const index = boughtCopy.findIndex(item => item === user_toy)
            boughtCopy.splice(index, 1)
            this.props.useItem(user_toy, boughtCopy)
            this.props.playWithPet(this.props.currentPet)
            this.props.unBuy(user_toy.item, boughtCopy)
        }
    }

    

    localSetCurrentPet = () => {
        
        if (this.props.pet === this.props.currentPet){
            this.setState({
                clicked: false,
                currentPet: null
            })
            return this.props.unsetCurrentPet(this.props.pet)
        }else{
            this.setState({
                clicked: true,
                currentPet: this.props.pet,
                happiness: this.props.pet.happiness,
                hunger: this.props.pet.hunger
            })
            this.props.getHunger(this.props.pet)
            this.props.getHappiness(this.props.pet)
            return this.props.setCurrentPet(this.props.pet)
        }
    }

    

    render(){
        
        return(
            <div  className='pet-card'>
                <p>{this.props.pet.name}</p>
                <img className='pet-image' src={this.props.pet.pet_image_url.image_url} onClick={() => this.localSetCurrentPet()} alt={this.props.pet.name}/>
                <p className='happiness'>Happiness: {this.props.pet === this.props.currentPet ? this.state.happiness : this.props.pet.happiness}/10</p>
                <p className='hunger'>Hunger: {this.props.pet === this.props.currentPet ? this.state.hunger : this.props.pet.hunger}/10</p>
               
                    {this.props.pet === this.props.currentPet ? 
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
)
function mdp(dispatch) {
    return { 
        incrementHappiness: (pet) => dispatch(incrementHappiness(pet)),
        incrementHunger: (pet) => dispatch(incrementHunger(pet)),
        decrementHappiness: (pet) => dispatch(decrementHappiness(pet)),
        decrementHunger: (pet) => dispatch(decrementHunger(pet)),
        setCurrentPet: (pet) => dispatch(setCurrentPet(pet)),
        feedPet: (pet) => dispatch(feedPet(pet)),
        playWithPet: (pet) => dispatch(playWithPet(pet)),
        useItem: (user_item, bought) => dispatch(useItem(user_item, bought)),
        // decrementPetHappiness: (pet) => dispatch(decrementPetHappiness(pet)),
        // decrementPetHunger: (pet) => dispatch(decrementPetHunger(pet)),
        getHappiness: (pet) => dispatch(getPetHappiness(pet)),
        getHunger: (pet) => dispatch(getPetHunger(pet)),
        unsetCurrentPet: (pet) => dispatch(unsetCurrentPet(pet)),
        unBuy: (item, bought) => dispatch(unBuy(item, bought))
     }
}
export default connect(null, mdp)(PetCard);
  