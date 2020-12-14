import React, { Component} from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom';
import Home from './Components/Home'
import PetsContainer from './Containers/PetsContainer'
import Shop from './Containers/Shop'
import NavBar from './Components/NavBar'
import { connect } from 'react-redux'
import './App.css';

class App extends Component {
  
  render(){
    return (
      <div className="App">
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
            <Home/>
          }
        />
        <Route
          exact
          path="/pets"
          render={() => 
            <PetsContainer/>
          }
        />
        <Route
          exact
          path="/shop"
          render={() => 
            <Shop/>
          }
        />

        {/* modal */}
          {/* <NewPetModal/> */}

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