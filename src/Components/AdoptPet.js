import React from 'react'
import { addPet } from '../redux/actions';
import { connect } from 'react-redux'

class AdoptPet extends React.Component{

    state = {
        count: 0,
        image: {},
        images: [],
        clicked: false,
        name: '',
    }
    componentDidMount(){
        this.fetchImages()
    }

    fetchImages = () => {
        fetch("http://localhost:5000/api/v1/pet_image_urls")
            .then(resp => resp.json())
            .then(data => {
                this.setState({images: data})
            })
      }

    handleImgClick = () => {
        if (this.state.count === (this.state.images.length - 1)){
            return this.setState({count: 0})
        }else if (this.state.count < this.state.images.length){
            return this.setState({count: this.state.count + 1})
        }
    }

    handleFormSubmit = (e) => {
        
        e.preventDefault()
        const petObj = {
            name: this.state.name,
            age: 1,
            happiness: 10,
            hunger: 10,
            pet_image_url_id: this.state.images[this.state.count].id,
            user_id: this.props.user.id
        }
         this.props.addPet(petObj)
         this.props.history.push('/pets')
         window.location.reload()
    }

    handleNameChange = (e) => {
        return this.setState({name: e.target.value})
    }


    render(){
       
        return(
            <div className="adopt-pet">
                <form onSubmit={this.handleFormSubmit} className="adopt-pet-form">
                    <p className='adopt-text'>Click to choose a pet!</p><br/>
                    {this.state.images.length > 0 ?
                        <>
                            <img className='adopt-pet-img' onClick={() => this.handleImgClick()} src={this.state.images[this.state.count].image_url} alt='pet'/><br/>
                        </>
                    :
                        null
                    }
                    <input type='text'  placeholder='Pet Name' name='name' onChange={this.handleNameChange} value={this.state.name}/>
                    <button type='submit'>Adopt Pet</button>
                    
                </form>

            </div>
        )
    }
}

function mdp(dispatch) {
    return { 
        addPet: (pet) => dispatch(addPet(pet))
     }
}

export default connect(null, mdp)(AdoptPet);
