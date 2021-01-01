import React, {Component} from 'react'
import { buyItem, spendPoints } from '../redux/actions';
import { connect } from 'react-redux'
import '../Containers/Shop.css'
class ItemCard extends Component {
  
    // const {item, this.props.boughtItems, user, buyItem} = this.props
    // const [bought, setBought] = useState(true)

    state = {
        bought: this.props.item.bought,
        // points: this.props.user.points
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
                    body: JSON.stringify({points: this.props.points - this.props.item.cost})
                })
            ])
            
            .then(([res1, res2, res3]) => (
                Promise.all([res1.json(), res2.json(), res3.json()])
            ))
            .then((data) => {
                // console.log('res2:', data[1].key)
                // console.log(Object.keys(data[1]))
                var i;
                var userItem;
                for (i = 0; i < data.length; i++){
                    if (Object.keys(data[i]).includes('user_item')){
                        userItem = data[i].user_item
                    }
                }
                // console.log(user_item)
                this.setState({bought: true})
                this.props.buyItem(userItem)
                this.props.spendPoints(this.props.points - this.props.item.cost)
            })
        }
   }
    render(){
        console.log(this.props.points)
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
        spendPoints: (points) => dispatch(spendPoints(points))
       
     }
}
export default connect(null, mdp)(ItemCard);
  