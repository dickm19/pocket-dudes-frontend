import React from 'react'
import { setCurrentPet } from '../redux/actions';
import { connect } from 'react-redux'
import './PetCard.css'

class PetCard extends React.Component{

    state = {
        hunger: this.props.pet.hunger,
        happiness: this.props.pet.happiness,
        clicked: false,

    }


    componentDidMount(){
        this.decrementPetCount()
    }


    decrementPetCount = () => {
        
        setInterval(() => {
            if (this.state.happiness > 0 && this.state.hunger > 0){
                this.decrementPet()
                //window.location.reload(false);
            }
        }, 1*15000);
    }

    feedPet(){
        if (this.props.pet.hunger < 10){

            
            fetch(`http://localhost:5000/api/v1/pets/${this.props.pet.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accepts': 'application/json'
                },
                body: JSON.stringify({
                    hunger: this.state.hunger + 1
                })
            })
            .then(resp => resp.json())
            .then(() => this.setState({hunger: this.state.hunger + 1}))
            this.props.useFood()
            

        }
    }

    playWithPet(){
        if (this.props.pet.happiness < 10){
            fetch(`http://localhost:5000/api/v1/pets/${this.props.pet.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accepts': 'application/json'
                },
                body: JSON.stringify({
                    happiness: this.state.happiness + 1
                })
            })
            .then(resp => resp.json())
            .then(() => this.setState({happiness: this.state.happiness + 1}))
        
            this.props.useToy()
            
        }
    }

    

    localSetCurrentPet = () => {
        this.setState({clicked: true})
        return setCurrentPet(this.props.pet)
    }

    decrementPet = () => {
            
            const decrementedHappiness = this.state.happiness - 1
            const decrementedHunger = this.state.hunger - 1

            fetch(`http://localhost:5000/api/v1/pets/${this.props.pet.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accepts': 'application/json'
                },
                body: JSON.stringify({
                    happiness: decrementedHappiness,
                    hunger: decrementedHunger
                })
            })
            .then( resp => resp.json())
            .then(() => {
                this.setState({
                    happiness: decrementedHappiness,
                    hunger: decrementedHunger
                })})
    }



    render(){
        
        return(
            <div  className='pet-card'>
                <p>{this.props.pet.name}</p>
                <img className='pet-image' src={this.props.pet.pet_image_url.image_url} onClick={() =>  this.localSetCurrentPet()} alt={this.props.pet.name}/>
                <p className='happiness'>Happiness: {this.state.happiness}/10</p>
                <p className='hunger'>Hunger: {this.state.hunger}/10</p>
               
                    {/* {this.state.clicked ?  */}
                        <div className='care-buttons'>
                            <button className="feed" onClick={() => this.feedPet()}>Feed</button>
                            <button className="play" onClick={() => this.playWithPet()}>Play</button>
                        </div>
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
  