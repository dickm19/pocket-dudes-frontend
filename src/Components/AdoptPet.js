import React from 'react'

export default class AdoptPet extends React.Component{

    state = {
        count: 0,
        image: {},
        clicked: false,
        name: '',
    }


    handleImgClick = () => {
        if (this.state.count === (this.props.images.length - 1)){
            return this.setState({count: 0})
        }else if (this.state.count < this.props.images.length){
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
            pet_image_url_id: this.props.images[this.state.count].id,
            user_id: this.props.user.id
        }
        this.props.handleFormSubmit(petObj)
    }

    handleNameChange = (e) => {
        return this.setState({name: e.target.value})
       
    }


    render(){
       
        return(
            <div className="adopt-pet">
                <form onSubmit={this.handleFormSubmit} className="adopt-pet-form">
                    Click to choose an image<br/>
                    {this.props.images.length > 0 ?
                        <div className='adopt-pet-img'>
                            <img onClick={ this.handleImgClick} src={this.props.images[this.state.count].image_url} alt='pet'/><br/>
                        </div>
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