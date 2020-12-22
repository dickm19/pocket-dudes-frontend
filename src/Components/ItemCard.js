import React, {Component} from 'react'
import { buyItem } from '../redux/actions';
import { connect } from 'react-redux'
import '../Containers/Shop.css'
class ItemCard extends Component {
  
    // const {item, this.props.boughtItems, user, buyItem} = this.props
    // const [bought, setBought] = useState(true)

    state = {bought: this.props.item.bought}

    localBuyItem = () => {
        fetch(`http://localhost:5000/api/v1/items/${this.props.item.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify({
                bought: true
            })
        })
        .then(resp => resp.json())
        .then(() => {
            this.setState({bought: true})
            this.props.buyItem(this.props.item, this.props.user)
        })
   }
    render(){
        
        return(
            <>

                <div className='item-card'>
                    <img className="item-image" src={this.props.item.image} alt={this.props.item.name}/>
                    <p>{this.props.item.name}</p>
                    
                    {this.state.bought ? 
                        null
                    :
                        <button className='buy-btn' onClick={this.localBuyItem}>Buy</button>
                }
                </div>
            </>
        )
        
    }
}



function mdp(dispatch) {
    return { 
        buyItem: (item, user) => dispatch(buyItem(item, user)),
       
     }
}
export default connect(null, mdp)(ItemCard);
  