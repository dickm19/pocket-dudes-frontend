import React from 'react'
import { feedPet, playWithPet, setCurrentPet, useItem, decrementPetHunger, decrementPetHappiness, incrementHappiness, incrementHunger, getPetHappiness, getPetHunger, decrementHappiness, decrementHunger, unsetCurrentPet } from '../redux/actions';
import { connect } from 'react-redux'
import './PetCard.css'

class PetCard extends React.Component{

    state = {
        clicked: false
    }


    componentDidMount(){
       setInterval(() => {
            return this.props.currentPet ?
                (this.decrementHappiness())
            :
                null
        }, 1*10000)

        setInterval(() => {
            return this.props.currentPet ?
                (this.decrementHunger())
            :
                null
        }, 8000)
    }


    decrementHappiness(){
            // console.log('test2')
            if (this.props.happiness > 0){
                this.props.decrementHappiness(this.props.currentPet)
                this.props.decrementPetHappiness(this.props.currentPet)
            }
    }

    decrementHunger(){
        if (this.props.hunger > 0){
            this.props.decrementHunger(this.props.currentPet)
            this.props.decrementPetHunger(this.props.currentPet)
        }
    }

    localFeedPet = () => {
        if (this.props.currentPet.hunger < 10){
            const boughtFood = this.props.bought.filter(user_item => user_item.item.kind === 'food')
            const user_food = boughtFood[0]
            this.props.incrementHunger(this.props.currentPet)
            this.props.feedPet(this.props.currentPet)
            this.props.useItem(user_food)
        }
    }

    localPlayWithPet = () => {
        if (this.props.currentPet.happiness < 10){
            const boughtToy = this.props.bought.filter(user_item => user_item.item.kind === 'toy')
            const user_toy = boughtToy[0]
            this.props.incrementHappiness(this.props.currentPet)        
            this.props.playWithPet(this.props.currentPet)
            this.props.useItem(user_toy)
        }
    }

    

    localSetCurrentPet = () => {
        
        if (this.props.pet === this.props.currentPet){
            this.setState({clicked: false})
            return this.props.unsetCurrentPet(this.props.pet)
        }else{
            this.setState({clicked: true})
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
                <p className='happiness'>Happiness: {this.props.pet === this.props.currentPet ? this.props.happiness : this.props.pet.happiness}/10</p>
                <p className='hunger'>Hunger: {this.props.pet === this.props.currentPet ? this.props.hunger : this.props.pet.hunger}/10</p>
               
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

function mdp(dispatch) {
    return { 
        incrementHappiness: (pet) => dispatch(incrementHappiness(pet)),
        incrementHunger: (pet) => dispatch(incrementHunger(pet)),
        decrementHappiness: (pet) => dispatch(decrementHappiness(pet)),
        decrementHunger: (pet) => dispatch(decrementHunger(pet)),
        setCurrentPet: (pet) => dispatch(setCurrentPet(pet)),
        feedPet: (pet) => dispatch(feedPet(pet)),
        playWithPet: (pet) => dispatch(playWithPet(pet)),
        useItem: (user_item) => dispatch(useItem(user_item)),
        decrementPetHappiness: (pet) => dispatch(decrementPetHappiness(pet)),
        decrementPetHunger: (pet) => dispatch(decrementPetHunger(pet)),
        getHappiness: (pet) => dispatch(getPetHappiness(pet)),
        getHunger: (pet) => dispatch(getPetHunger(pet)),
        unsetCurrentPet: (pet) => dispatch(unsetCurrentPet(pet))
     }
}
export default connect(null, mdp)(PetCard);
  