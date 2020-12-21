import React, { Component} from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom';
// import Home from './Components/Home'
import PetsContainer from './Containers/PetsContainer'
import Shop from './Containers/Shop'
import NavBar from './Components/NavBar'
import { connect } from 'react-redux'
import AdoptPet from './Components/AdoptPet'
import { getBought, getItems, getUser, getPets } from '../redux/actions';
import './App.css';

class App extends Component {

  state = {
    images: []
  }

  componentDidMount(){

    getUser(),
    getPets(),
    getBought(),
    getItems()
  }
  
  render(){
    return (
      <div>

        { this.props.user
           ?
          (<div className="App">
          <NavBar/>
          <Route
            exact
            path="/"
            render={() =>
              {this.props.pets.length > 0 
              ?
                <Redirect to="/pets" />
              :
                <Redirect to="/adopt" />
              }
            }
          />
          <Route
            exact
            path="/home"
            render={() => 
              <Home currentPet={this.props.currentPet} user={this.props.user}/>
            }
          />
          <Route
            exact
            path="/adopt"
            render={()=>
              <AdoptPet user={this.props.user}/>
            }
            />
          <Route
            exact
            path="/pets"
            render={() => 
              <PetsContainer history={this.props.history} bought={this.props.bought} pets={this.props.pets} currentPet={this.props.currentPet} user={this.props.user}/>
            }
          />
          <Route
            exact
            path="/shop"
            render={() => 
              <Shop  bought={this.props.bought} items={this.props.items} currentPet={this.props.currentPet} user={this.props.user}/>
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


function mdp(dispatch) {
  return { 
      getBought: () => dispatch(getBought()),
      getUser: () => dispatch(getUser()),
      getPets: () => dispatch(getPets()),
      getItems: () => dispatch(getItems())
   }
}

export default withRouter(connect(msp, mdp)(App));