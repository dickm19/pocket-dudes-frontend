import React, { Component} from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom';
// import Home from './Components/Home'
import PetsContainer from './Containers/PetsContainer'
import Shop from './Containers/Shop'
import NavBar from './Components/NavBar'
import { connect } from 'react-redux'
import AdoptPet from './Components/AdoptPet'

import './App.css';

class App extends Component {

  state = {
    user: null,
    items: [],
    bought: [],
    images: [],
    pets: []
  }

  componentDidMount(){
   this.fetchItems()
   this.fetchUser()
   this.fetchImages()
    
  }

  
  fetchUser = () => {
    fetch('http://localhost:5000/api/v1/users/1')
    .then(resp => resp.json())
    .then(data => {
      const owned = data.user.user_items
      this.setState({
        user: data.user,
        bought: owned,
        pets: data.user.pets
      })
      // return console.log(data.user)
    })
  }
  fetchImages = () => {
    fetch("http://localhost:5000/api/v1/pet_image_urls")
        .then(resp => resp.json())
        .then(data => {
            this.setState({images: data})
        })
  }

  fetchItems = () => {
    fetch('http://localhost:5000/api/v1/items')
          .then(resp => resp.json())
          .then(data => this.setState({items: data}))  
  }

  buyItem = (item) => {
  
    fetch(`http://localhost:5000/api/v1/user_items`, {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json',
               'Accepts': 'application/json'
           },
           body: JSON.stringify({
             user_id: this.state.user.id,
             item_id: item.id
            })
       })
       .then(resp => resp.json())
       .then(data => {
        //  console.log(data)
         this.setState({bought: [...this.state.bought, data.user_item]})
        })
  }

  useToy = (user_toy) => {
    // const toy = this.state.user.user_items.find(user_item => user_item.item.kind === 'toy' )
    const boughtCopy = [...this.state.bought]
    const index = boughtCopy.findIndex(item => item === user_toy)
    boughtCopy.splice(index, 1)
    this.setState({bought: boughtCopy})
          // window.location.reload(false)

  }
  
  useFood = (user_food) => {
    // const food = this.state.user.user_items.find(user_item => user_item.item.kind === 'food' )
    const boughtCopy = [...this.state.bought]
    const index = boughtCopy.findIndex(item => item === user_food)
    boughtCopy.splice(index, 1)
    //console.log(boughtCopy)
    this.setState({bought: boughtCopy})
  
  }

  handleFormSubmit = (petObj) => {
    fetch("http://localhost:5000/api/v1/pets", {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify({
        name: petObj.name,
        age: petObj.age,
        happiness: 10,
        hunger: 10,
        pet_image_url_id: petObj.pet_image_url_id,
        user_id: petObj.user_id
      })
    })
    .then(resp => resp.json())
    .then((data) => {
        this.setState({pets: [...this.state.pets, data]}, ()=>{
          this.props.history.push('/pets')
          window.location.reload(false)
        })
      
    })
  }
  
  render(){
    //console.log(this.state.bought)
    const boughtItems = this.state.bought.map(user_item => user_item.item)
    return (
      <div>

        { this.state.user
           ?
           
          (<div className="App">
          <NavBar/>
          <Route
            exact
            path="/"
            render={() =>
              <Redirect to="/adopt" />
            }
          />
          {/* <Route
            exact
            path="/home"
            render={() => 
              
              <Home useToy={this.useToy} currentPet={this.props.currentPet} user={this.state.user}/>
            }
          /> */}
          <Route
            exact
            path="/adopt"
            render={()=>
              <AdoptPet handleFormSubmit={this.handleFormSubmit} images={this.state.images} user={this.state.user}/>
            }
            />
          <Route
            exact
            path="/pets"
            render={() => 
              <PetsContainer history={this.props.history} bought={this.state.bought} pets={this.state.pets} useFood={this.useFood} useToy={this.useToy} currentPet={this.props.currentPet} user={this.state.user}/>
            }
          />
          <Route
            exact
            path="/shop"
            render={() => 
              <Shop  buyItem={this.buyItem} boughtItems={boughtItems} items={this.state.items} currentPet={this.props.currentPet} user={this.state.user}/>
            }
          />
  
          {/* modal */}
            {/* <NewPetModal/> */}
            </div>)
            :
            null
        }
      </div>
        
    );
  }
  
}

function msp(state) {
  return {
      currentPet: state.currentPet,
      bought: state.bought,
      user: state.user,
      pets: state.pets,
      items: state.items
  }
}


export default withRouter(connect(msp)(App));