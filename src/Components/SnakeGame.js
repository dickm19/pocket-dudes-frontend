import Snake from 'react-simple-snake'
import React from 'react'
import { awardPoints, setHighScore } from '../redux/actions';
import { connect } from 'react-redux'

class SnakeGame extends React.Component {

    state = {
        clicked: false,
        same: false
    }

    localAwardPoints = () => {
        const points = parseInt(localStorage.snakeHighScore) + parseInt(this.props.user.points)
        if (this.props.user['high_score'] === parseInt(localStorage.snakeHighScore)){
            this.setState({same: true})
            // return null
        }else{
            this.setState({same: false})
            this.setHighScore(parseInt(localStorage.snakeHighScore))
            this.props.awardPoints(points, this.props.user)
        }
    }

    setHighScore(points){
        fetch(`http://localhost:5000/api/v1/users/${this.props.user.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify({high_score: points})
        })
        .then(resp => resp.json())
        .then(() => this.setState({same: true}))
    }
    handleEndGame = () => {
        if (this.props.user['high_score'] === parseInt(localStorage.snakeHighScore)){
            this.setState({
                clicked: !this.state.clicked,
                same: true
            })
        }else{
            this.setState({
                clicked: !this.state.clicked,
                same: false
            })
        }
    }

    render(){
        // console.log(this.props.key)
        // console.log('user:', this.props.user['high_score'], 'local:', localStorage.snakeHighScore)
        return(
            <div  className="snake-game">
                {this.state.clicked ? null : <Snake percentageWidth={100}/>}
                {this.state.clicked ? 
                   (this.state.same) ? 
                        null 
                   : 
                        <button className="points-button" onClick={this.localAwardPoints}>Collect Points! {localStorage.snakeHighScore}</button> 
                :
                   null}
                   <button className='toggle-game-button' onClick={this.handleEndGame}>{this.state.clicked ? "Play Again" : 'Done Playing'}</button>
            </div>
        )
    }
}
function msp(state) {
    return {
        val: state.val,
        highScore: state.highScore
    }
  }
function mdp(dispatch) {
    return { 
        awardPoints: (points, user) => dispatch(awardPoints(points, user)),
        setHighScore: (points) => dispatch(setHighScore(points))
    }
}

export default connect(msp, mdp)(SnakeGame)