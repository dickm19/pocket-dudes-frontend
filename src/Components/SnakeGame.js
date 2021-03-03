import Snake from 'react-simple-snake'
import React from 'react'
import { awardPoints, setHighScore } from '../redux/actions';
import { connect } from 'react-redux'

class SnakeGame extends React.Component {

    constructor(props){
        super(props)
        if (props.user){
            this.state = {
                clicked: false,
                userHighScore: this.props.user.high_score,
                currentHighScore: parseInt(localStorage.snakeHighScore)
            }
        }
    }

    localAwardPoints = () => {
        const points = ((parseInt(localStorage.snakeHighScore) * 3) + parseInt(this.props.points))
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
        return(
            <div  className="snake-game">
                {this.state.clicked ? <h4 className='snake-header'>Good Game!</h4> : <h4 className='snake-header'>Beat Your High Score to Earn Points!</h4>}
                {this.state.clicked ? null : <div id='game'><Snake startSnakeSize={3} percentageWidth={100}/></div>}
                {this.state.clicked ? 
                   (this.state.userHighScore === this.state.currentHighScore) ? 
                        null 
                   : 
                        <button className="points-button" onClick={this.localAwardPoints}>Collect Points! { parseInt(localStorage.snakeHighScore) * 3 }</button> 
                :
                    null}
                <button className='toggle-game-button' onClick={this.handleEndGame}>{this.state.clicked ? "Play Again" : 'End Game'}</button>
                
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