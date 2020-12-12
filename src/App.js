import React, { Component} from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom';
import Home from './Components/Home'
import PetsContainer from './Components/PetsConainer'
import Shop from './Containers/Shop'
import NavBar from './Components/NavBar'
import './App.css';

export default class App extends Component {
  
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
          path="/home"
          render={() => 
            <PetsContainer/>
          }
        />
        <Route
          exact
          path="/home"
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

