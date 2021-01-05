import React from 'react'
import { useItem, incrementHappiness, incrementHunger, getPetHappiness, getPetHunger,  decrementHappiness, decrementHunger } from '../redux/actions';
import { connect } from 'react-redux'
import './PetCard.css'

const petsUrl = `http://localhost:5000/api/v1/pets`
const deadImage = 'https://i.ibb.co/DLfZBLy/graveCut.png'
const PetCard = React.memo(class extends React.Component{

    state = {
        happiness: this.props.pet.happiness,
        hunger: this.props.pet.hunger,
        image: this.props.pet.pet_image_url.image_url
    }


     componentDidMount(){
        setInterval(() => {
                this.decrementHappiness()
        }, 1*5000)

        setInterval(() => {
            (this.decrementHunger())
        }, 1*5000)
    }


    decrementHappiness(){
            if (this.props.pet.happiness > 0 && this.state.happiness > 0){
                fetch(`${petsUrl}/${this.props.pet.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accepts': 'application/json'
                },
                body: JSON.stringify({
                    happiness: this.state.happiness - 1
                })
                })
                .then(resp => resp.json())
                .then(() => {
                    // window.location.reload()
                    this.setState({
                        happiness: this.state.happiness - 1
                    },
                    () => {
                        if (this.state.happiness === 0 && this.state.hunger === 0){
                            this.setState({image: deadImage})
                        }
                    })
                })
                
            }
    }
    decrementHunger = () => {
        if (this.props.pet.hunger > 0 && this.state.hunger > 0){
            fetch(`${petsUrl}/${this.props.pet.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify({
                hunger: this.state.hunger - 1
            })
            })
            .then(resp => resp.json())
            .then( () => {
                // window.location.reload()
                this.setState({
                    hunger: this.state.hunger - 1
                },
                () => {
                    if (this.state.happiness === 0 && this.state.hunger === 0){
                        this.setState({image: deadImage})
                    }
                })
            })
           
        }
    }

    localFeedPet = () => {
        this.interactWithPet('food', 'hunger')
    }

    localPlayWithPet = () => {
        this.interactWithPet('toy', 'happiness')
    }
    
    interactWithPet = (itemType, need) => {
        // console.log(this.props.pet[need])
        if (this.state[need] < 10){
            const boughtItems = this.props.bought.filter(user_item => user_item.item.kind === itemType)
            if (boughtItems.length > 0){
                const user_item = boughtItems[0]
                const boughtCopy = [...this.props.bought]
                const index = boughtCopy.findIndex(item => item === user_item)
                boughtCopy.splice(index, 1)
                if (need === 'hunger'){
                    this.props.incrementHunger(this.props.pet)
                    Promise.all([
                        fetch(`${petsUrl}/${this.props.pet.id}`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accepts': 'application/json'
                            },
                            body: JSON.stringify({
                                hunger: this.state.hunger + 1
                            })
                        }),
                        fetch(`http://localhost:5000/api/v1/user_items/${user_item.id}`, {
                            method: 'DELETE'
                        }),
                        fetch(`http://localhost:5000/api/v1/items/${user_item.item.id}`, {
                            method: 'PATCH',
                            headers: {
                                "Content-Type": 'application/json',
                                'Accepts': 'application/json'
                            },
                            body: JSON.stringify({
                                bought: false
                            })
                        })
                    ])
                    .then(([res1, res2, res3]) => (
                        {
                            res1: res1.json(),
                            res2: res2.json(),
                            res3: res3.json()

                        }
                    ))
                    .then(() =>{
                        this.setState({hunger: this.state.hunger + 1})
                        this.props.useItem(boughtCopy)
                        // this.forceUpdate()
                        // this.props.unBuy(boughtCopy)
                        // this.props.setItemBool(user_item.item, boughtCopy)
                        // this.props.setBoughtGlobal(user_item.item)
                    })
                }else{
                    this.props.incrementHappiness(this.props.pet)
                
                    Promise.all([
                        fetch(`${petsUrl}/${this.props.pet.id}`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accepts': 'application/json'
                            },
                            body: JSON.stringify({
                                happiness: this.state.happiness + 1
                            })
                        }),
                        fetch(`http://localhost:5000/api/v1/user_items/${user_item.id}`, {
                            method: 'DELETE'
                        }),
                        fetch(`http://localhost:5000/api/v1/items/${user_item.item.id}`, {
                            method: 'PATCH',
                            headers: {
                                "Content-Type": 'application/json',
                                'Accepts': 'application/json'
                            },
                            body: JSON.stringify({
                                bought: false
                            })
                        })
                    ])
                    .then(([res1, res2, res3]) => (
                        {
                            res1: res1.json(),
                            res2: res2.json(),
                            res3: res3.json()

                        }
                    ))
                    .then(() =>{
                        this.setState({happiness: this.state.happiness + 1})
                        this.props.useItem(boughtCopy)
                        // this.props.setItemBool(user_item.item, boughtCopy)
                    })
                }
            }
        
        }
    }

    renderEmotion = () => {
        if (this.state.happiness === 10 || this.state.happiness === 9){
            return  '🥰'
        }else if (this.state.happiness ===  8 || this.state.happiness ===  7){
            return '🙂'
        }else if (this.state.happiness ===  6 || this.state.happiness ===  5){
            return '😐'
        }else if (this.state.happiness ===  4 || this.state.happiness ===  3){
            return '😕'
        }else if (this.state.happiness ===  2 || this.state.happiness ===  1){
            return '😞'
        }else if (this.state.happiness ===  0 && this.state.hunger === 0) {
            return '☠️'
        }else if (this.state.happiness === 0){
            return '😭'
        }
    }

    renderHealth = () => {
        if (this.state.hunger === 10 || this.state.hunger === 9){
            return  '😋'
        }else if (this.state.hunger ===  8 || this.state.hunger ===  7){
            return '🤤'
        }else if (this.state.hunger ===  6 || this.state.hunger ===  5){
            return '😐'
        }else if (this.state.hunger ===  4 || this.state.hunger ===  3){
            return '😨'
        }else if (this.state.hunger ===  2 || this.state.hunger ===  1){
            return '🥺'
        }else if (this.state.hunger ===  0 && this.state.happiness === 0) {
            return '☠️'
        }else if (this.state.hunger === 0){
            return '😩'
        }
    }
    render(){
        
        return(
            <div  className='pet-card'>
                <p>{this.props.pet.name}</p>
                <img className='pet-image' src={this.state.happiness === 0 && this.state.hunger === 0 ? deadImage : this.state.image} alt={this.props.pet.name}/>
                <div classNmae='emotions'>
                    <p className='happiness'>Happiness: {this.state.happiness}/10 {this.renderEmotion()}</p>
                    <p className='hunger'>Hunger: {this.state.hunger}/10 {this.renderHealth()}</p>
                </div>
                    <div>
                        {this.state.happiness === 0 && this.state.hunger === 0 ?
                            null
                        :
                            <>
                                <button className="care-button" onClick={() => this.localFeedPet()}>Feed</button>
                                <button className="care-button" onClick={() => this.localPlayWithPet()}>Play</button>
                            </>
                        }
                    </div>
                  
                
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
        // setCurrentPet: (pet) => dispatch(setCurrentPet(pet)),
        // feedPet: (pet) => dispatch(feedPet(pet)),
        // playWithPet: (pet) => dispatch(playWithPet(pet)),
        useItem: (user_item, bought) => dispatch(useItem(user_item, bought)),
        // decrementPetHappiness: (pet) => dispatch(decrementPetHappiness(pet)),
        // decrementPetHunger: (pet) => dispatch(decrementPetHunger(pet)),
        getHappiness: (pet) => dispatch(getPetHappiness(pet)),
        getHunger: (pet) => dispatch(getPetHunger(pet)),
        // unsetCurrentPet: (pet) => dispatch(unsetCurrentPet(pet)),
        // unBuy: (item, bought) => dispatch(unBuy(item, bought)),
        // setItemBool: (item, bought) => dispatch(setItemBool(item, bought))
     }
}
export default connect(null, mdp)(PetCard);
  