import React, {Component} from 'react'
import { buyItem } from '../redux/actions';
import { connect } from 'react-redux'
import '../Containers/Shop.css'
class ItemCard extends Component {
  
    // const {item, this.props.boughtItems, user, buyItem} = this.props
    // const [bought, setBought] = useState(true)

    state = {bought: this.props.boughtItems.includes(this.props.item)}

    setBought = () => {
        if (this.props.boughtItems.length > 0){
            this.setState({bought: this.props.boughtItems.includes(this.props.item)})
        }
    }
    localBuyItem = () => {
        // console.log(buyItem)
       this.setState({bought: !this.state.bought})
       return this.props.buyItem(this.props.item, this.props.user)
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
  