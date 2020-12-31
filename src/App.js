import React, { Component} from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom';
// import Home from './Components/Home'
import SnakeGame from './Components/SnakeGame'
import PetsContainer from './Containers/PetsContainer'
import Shop from './Containers/Shop'
import NavBar from './Components/NavBar'
import { connect } from 'react-redux'
import AdoptPet from './Components/AdoptPet'
import { getBought, getItems, getUser, getPets, setVal } from './redux/actions';
import './App.css';

class App extends Component {

  state = {
    images: [],
  }

  componentDidMount(){
    // console.log("in CDM")
    this.props.getUser()
    this.props.getPets(this.props.user)
    this.props.getBought(this.props.user)
    this.props.getItems()
  }

  spend = (item, user) => {
    fetch(`http://localhost:5000/api/v1/users/${user.id}`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
          'Accepts': 'application/json'
      },
      body: JSON.stringify({points: user.points - item.cost})
    })
    .then(resp => resp.json())
    .then(() => this.setState({points: this.state.points - item.cost}))
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
                <Redirect to="/pets" />
            }
          />
          <Route
            exact
            path="/game"
            render={()=>
              <SnakeGame points={this.props.points} user={this.props.user} awardPoints={this.awardPoints}/>
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
              <PetsContainer happiness={this.props.happiness} hunger={this.props.hunger} history={this.props.history} bought={this.props.bought} pets={this.props.pets} currentPet={this.props.currentPet} user={this.props.user}/>
            }
          />
          <Route
            exact
            path="/shop"
            render={() => 
              <Shop spend={this.spend} bought={this.props.bought} items={this.props.items} user={this.props.user}/>
            }
          />
          <div className='user-points'>
            Points: {this.props.points ? this.props.points : this.props.user.points}
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
      currentPet: state.currentPet,
      bought: state.bought,
      user: state.user,
      pets: state.pets,
      items: state.items,
      happiness: state.happiness,
      hunger: state.hunger,
      points: state.points
  }
}


function mdp(dispatch) {
  return { 
      getBought: () => dispatch(getBought()),
      getUser: () => dispatch(getUser()),
      getPets: () => dispatch(getPets()),
      getItems: () => dispatch(getItems()),
      setVal: (e) => dispatch(setVal(e))
   }
}

export default withRouter(connect(msp, mdp)(App));