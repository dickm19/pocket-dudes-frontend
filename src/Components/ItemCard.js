import React, {Component} from 'react'
import { buyItem } from '../redux/actions';
import { connect } from 'react-redux'
import '../Containers/Shop.css'
class ItemCard extends Component {
  
    // const {item, this.props.boughtItems, user, buyItem} = this.props
    // const [bought, setBought] = useState(true)

    state = {
        bought: this.props.item.bought
    }

    localBuyItem = () => {
        if (this.props.user.points > 0){
            Promise.all([
                fetch(`http://localhost:5000/api/v1/items/${this.props.item.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accepts': 'application/json'
                    },
                    body: JSON.stringify({
                        bought: true
                    })
                }),
                fetch("http://localhost:5000/api/v1/user_items", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accepts': 'application/json'
                    },
                    body: JSON.stringify({
                        user_id: this.props.user.id,
                        item_id: this.props.item.id
                    })
                }),
                fetch(`http://localhost:5000/api/v1/users/${this.props.user.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accepts': 'application/json'
                    },
                    body: JSON.stringify({points: this.props.user.points - this.props.item.cost})
                })
            ])
            
            .then(([res1, res2, res3]) => (
                {
                    res1: res1.json(),
                    res2: res2.json(),
                    res3: res3.json()
                }
            ))
            .then(({data1, data2, data3}) => {
                console.log('res2:', data2)
                this.setState({bought: true})
                this.props.buyItem(data2)
                this.props.spend(this.props.item)
            })
        }
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
                        <>
                            <p>Cost: {this.props.item.cost}</p>
                            <button className='buy-btn' onClick={this.localBuyItem}>Buy</button>
                        </>
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
  