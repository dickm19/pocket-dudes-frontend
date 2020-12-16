import React, { Component} from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom';
import Home from './Components/Home'
import PetsContainer from './Containers/PetsContainer'
import Shop from './Containers/Shop'
import NavBar from './Components/NavBar'
import ItemBar from './Containers/ItemBar'
import { connect } from 'react-redux'

import './App.css';

class App extends Component {

  state = {
    user: null,
    items: [],
    bought: []
  }

  componentDidMount(){
   this.fetchItems()
   this.fetchUser()
    
  }

  fetchUser = () => {
    fetch('http://localhost:5000/api/v1/users/1')
    .then(resp => resp.json())
    .then(data => {
      this.setState({
      user: data.user,
      bought: data.user.items
    })})
  }

  fetchItems = () => {
    fetch('http://localhost:5000/api/v1/items')
          .then(resp => resp.json())
          .then(data => this.setState({items: data}))  
  }

  buyItem = (item) => {
    fetch(`http://localhost:5000/api/v1/items/${item.id}`, {
           method: 'PATCH',
           headers: {
               'Content-Type': 'application/json',
               'Accepts': 'application/json'
           },
           body: JSON.stringify({user_id: this.state.user.id})
       })
       .then(resp => resp.json())
       .then(() => this.setState({user: item.user}))
  }

  useToy = () => {
    const toy = this.state.user.items.find(item => item.kind === 'toy' )
    const boughtCopy = [...this.state.bought]
    const index = boughtCopy.findIndex(item => item === toy)
    boughtCopy.splice(index, 1)
    this.setState({bought: boughtCopy})
    fetch(`http://localhost:5000/api/v1/items/${toy.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify({user_id: null})
        })
        .then(resp => resp.json())
  }
  
  useFood = () => {
    const food = this.state.user.items.find(item => item.kind === 'food' )
    const boughtCopy = [...this.state.bought]
    const index = boughtCopy.findIndex(item => item === food)
    boughtCopy.splice(index, 1)
    this.setState({bought: boughtCopy})
    fetch(`http://localhost:5000/api/v1/items/${food.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify({user_id: null})
        })
        .then(resp => resp.json())
  }
  
  render(){

    return (
      <div>

        { this.state.user
           ?
           
          (<div className="App">
          <NavBar/>
          <ItemBar buyItem={this.buyItem} bought={this.state.bought} user={this.state.user}/>
          <Route
            exact
            path="/"
            render={() =>
              <Redirect to="/home" />
            }
          />
          <Route
            exact
            path="/home"
            render={() => 
              
              <Home useToy={this.useToy} currentPet={this.props.currentPet} user={this.state.user}/>
            }
          />
          <Route
            exact
            path="/pets"
            render={() => 
              <PetsContainer useFood={this.useFood} useToy={this.useToy} currentPet={this.props.currentPet} user={this.state.user}/>
            }
          />
          <Route
            exact
            path="/shop"
            render={() => 
              <Shop  buyItem={this.buyItem} bought={this.state.bought} items={this.state.items} currentPet={this.props.currentPet} user={this.state.user}/>
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
      currentPet: state.currentPet
  }
}


export default withRouter(connect(msp)(App));