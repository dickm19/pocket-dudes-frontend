import React, { Component} from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom';
import NavBar from './Components/navBar'
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
          <NewPetModal/>

      </div>
    );
  }
}

export default App;
