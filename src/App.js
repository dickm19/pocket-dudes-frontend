import React, { Component} from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom';
import SnakeGame from './Components/SnakeGame'
import PetsContainer from './Containers/PetsContainer'
import Shop from './Containers/Shop'
import NavBar from './Components/NavBar'
import { connect } from 'react-redux'
import AdoptPet from './Components/AdoptPet'
import { getBought, getItems, getUser, getPets, getPoints} from './redux/actions';
import './App.css';

class App extends Component {


  componentDidMount(){
    this.props.getUser()
    this.props.getPets()
    this.props.getPoints()
    this.props.getBought()
    this.props.getItems()
  }

  
  render(){
    return (
      
      <div>
        
      {this.props.user ? 
          <div  className="App">
            <h1 className="header">POCKET DUDES</h1>
          <NavBar/>
          <Route
            exact
            path="/"
            render={() =>
                <Redirect to="/adopt" />
            }
          />
          <Route
            exact
            path="/game"
            render={()=>
              <SnakeGame points={this.props.points} user={this.props.user}/>
            }
            />
          <Route
            exact
            path="/adopt"
            render={()=>
              <AdoptPet history={this.props.history} user={this.props.user}/>
            }
            />
          <Route
            exact
            path="/pets"
            render={() => 
              <PetsContainer points={this.props.points} history={this.props.history} bought={this.props.bought} pets={this.props.pets}  user={this.props.user}/>
            }
          />
          <Route
            exact
            path="/shop"
            render={() => 
              <Shop  points={this.props.points} bought={this.props.bought} items={this.props.items} user={this.props.user}/>
            }
          />
          <div className='user-points'>
            Points: {this.props.points}
          </div>
           </div>
            
            :
            'LOADING'
          }
          </div>
        
    );
  }
  
}

function msp(state) {
  return {
      bought: state.bought,
      user: state.user,
      pets: state.pets,
      items: state.items,
      points: state.points,
  }
}


function mdp(dispatch) {
  return { 
      getBought: () => dispatch(getBought()),
      getUser: () => dispatch(getUser()),
      getPets: () => dispatch(getPets()),
      getItems: () => dispatch(getItems()),
      getPoints: () => dispatch(getPoints()),
   }
}

export default withRouter(connect(msp, mdp)(App));