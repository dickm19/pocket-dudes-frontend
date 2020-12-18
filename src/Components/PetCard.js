import React from 'react'
import { setCurrentPet } from '../redux/actions';
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

    feedPet(){
        const boughtFood = this.props.bought.filter(user_item => user_item.item.kind === 'food')
        const user_food = boughtFood[0]
        // console.log(user_food)
        // debugger
        if (this.props.pet.hunger < 10 && boughtFood.length > 0){
            Promise.all([
              fetch(`http://localhost:5000/api/v1/user_items/${user_food.id}`, {
                method: 'DELETE'
               }),
              fetch(`http://localhost:5000/api/v1/pets/${this.props.pet.id}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                  'Accepts': 'application/json'
                },
                body: JSON.stringify({hunger: this.state.hunger + 1})
                })
              ]).then(([userItemResp, petResp ]) => {
                userItemResp.json()
                petResp.json()
              }).then(() => {
                  this.setState({hunger: this.state.hunger + 1})
                  this.props.useFood(user_food)
                })
        }
    }

    playWithPet(){
        const boughtToy = this.props.bought.filter(user_item => user_item.item.kind === 'toy')
        const user_toy = boughtToy[0]
        // console.log(user_toy)
        // debugger
        if (this.props.pet.happiness < 10 && boughtToy.length > 0){
            Promise.all([
              fetch(`http://localhost:5000/api/v1/user_items/${user_toy.id}`, {
                method: 'DELETE'
               }),
              fetch(`http://localhost:5000/api/v1/pets/${this.props.pet.id}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                  'Accepts': 'application/json'
                },
                body: JSON.stringify({happiness: this.state.happiness + 1})
                })
              ]).then(([userItemResp, petResp ]) => {
                userItemResp.json()
                petResp.json()
              }).then(() => {
                  this.setState({happiness: this.state.happiness + 1})
                  this.props.useToy(user_toy)
                })
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
               
                    {/* {this.state.clicked ?  */}
                            <button className="care-button" onClick={() => this.feedPet()}>Feed</button>
                            <button className="care-button" onClick={() => this.playWithPet()}>Play</button>
                       
                    {/* {:
                        null
                    }} */}
                
            </div>
        )
    }
}

function mdp(dispatch) {
    return { 
        setCurrentPet: (pet) => dispatch(setCurrentPet(pet))
       
     }
}
export default connect(null, mdp)(PetCard);
  