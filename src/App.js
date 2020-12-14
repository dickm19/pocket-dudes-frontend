import React, { Component} from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom';
import Home from './Components/Home'
import PetsContainer from './Containers/PetsContainer'
import Shop from './Containers/Shop'
import NavBar from './Components/NavBar'
import { connect } from 'react-redux'

import './App.css';

class App extends Component {

  state = {
    user: null
  }

  componentDidMount(){
    return fetch('http://localhost:5000/api/v1/users/1')
          .then(resp => resp.json())
          .then(data => this.setState({user: data}))

  }
  
  render(){
    console.log(this.state.user)
    return (
      <div className="app">

        { this.state.user
           ?
           
          (<div className="App">
          <NavBar/>
            
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
              
              <Home currentPet={this.props.currentPet} user={this.state.user}/>
            }
          />
          <Route
            exact
            path="/pets"
            render={() => 
              <PetsContainer currentPet={this.props.currentPet} user={this.state.user}/>
            }
          />
          <Route
            exact
            path="/shop"
            render={() => 
              <Shop currentPet={this.props.currentPet} user={this.state.user}/>
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
      user: state.user
  }
}


export default withRouter(connect(msp)(App));