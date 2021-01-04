import React from 'react'
import { useItem, incrementHappiness, incrementHunger, getPetHappiness, getPetHunger,  decrementHappiness, decrementHunger } from '../redux/actions';
import { connect } from 'react-redux'
import './PetCard.css'

const petsUrl = `http://localhost:5000/api/v1/pets`

const PetCard = React.memo(class extends React.Component{

    state = {
        happiness: this.props.pet.happiness,
        hunger: this.props.pet.hunger,
        deadImage: 'data:image/png;base64,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'
    }


     componentDidMount(){
        setInterval(() => {
                this.decrementHappiness()
        }, 1*10000)

        setInterval(() => {
            (this.decrementHunger())
        }, 1*10000)
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
                    })
                })
                
            }
    }
    decrementHunger(){
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

    // localSetCurrentPet = () => {
        
    //     if (this.props.pet === this.props.currentPet){
    //         this.setState({
    //             currentPet: null
    //         })
    //         return this.props.unsetCurrentPet(this.props.pet)
    //     }else{
    //         this.setState({
    //             currentPet: this.props.pet,
    //             happiness: this.props.pet.happiness,
    //             hunger: this.props.pet.hunger
    //         })
    //         this.props.getHunger(this.props.pet)
    //         this.props.getHappiness(this.props.pet)
    //         return this.props.setCurrentPet(this.props.pet)
    //     }
    // }

    

    render(){
        
        return(
            <div  className='pet-card'>
                <p>{this.props.pet.name}</p>
                <img className='pet-image' src={this.props.pet.happiness === 0 && this.props.pet.hunger === 0 ? this.state.deadImage : this.props.pet.pet_image_url.image_url} alt={this.props.pet.name}/>
                <p className='happiness'>Happiness: {this.state.happiness}/10</p>
                <p className='hunger'>Hunger: {this.state.hunger}/10</p>
                    <div>
                        {this.props.pet.happiness === 0 && this.props.pet.hunger === 0 ?
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
  