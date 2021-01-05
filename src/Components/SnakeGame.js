import Snake from 'react-simple-snake'
import React from 'react'
import { awardPoints, setHighScore } from '../redux/actions';
import { connect } from 'react-redux'
import './SnakeGame.css'

class SnakeGame extends React.Component {

    constructor(props){
        super(props)
        if (props.user){
            this.state = {
                clicked: false,
                // same: props.user.high_score === parseInt(localStorage.snakeHighScore),
                userHighScore: this.props.user.high_score,
                currentHighScore: parseInt(localStorage.snakeHighScore)
            }
        }
    }

    localAwardPoints = () => {
        const points = parseInt(localStorage.snakeHighScore) + parseInt(this.props.points)
        if (this.props.user){
            this.setHighScore(parseInt(localStorage.snakeHighScore))
            this.props.awardPoints(points, this.props.user)
            this.setState({
                currentHighScore: parseInt(localStorage.snakeHighScore),
            })
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
        .then(() => this.setState({
            userHighScore: points
        }))
    }
    handleEndGame = () => {
        this.setState({
            clicked: !this.state.clicked,
            currentHighScore: parseInt(localStorage.snakeHighScore)
        })
    }

    render(){
        // console.log(this.props.user['high_score'] === parseInt(localStorage.snakeHighScore))
        // console.log(this.props.key)
        // console.log('user:', this.props.user['high_score'], 'local:', localStorage.snakeHighScore)
        return(
            <div  className="snake-game">
                <h4 className='snake-header'>Beat Your High Score to Earn Points!</h4>
                {this.state.clicked ? null : <div id='game'><Snake percentageWidth={100}/></div>}
                {this.state.clicked ? 
                   (this.state.userHighScore === this.state.currentHighScore) ? 
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