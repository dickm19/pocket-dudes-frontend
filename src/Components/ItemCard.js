import React, {useState} from 'react'
import { buyItem } from '../redux/actions';
import { connect } from 'react-redux'
import './ItemCard.css'
function ItemCard({item, boughtItems, user, buyItem}){
    
    const [bought, setBought] = useState(boughtItems.includes(item))

    const localBuyItem = () => {
        // console.log(buyItem)
       setBought(!boughtItems.includes(item))
       return buyItem(item, user)
   }

        return(
            
            <div className='item-card'>
                {/* {checkBought()} */}
                <img className="item-image" src={item.image} alt={item.name}/>
                <p>{item.name}</p>
                
                {bought ? 
                    null
                :
                    <button className='buy-btn' onClick={localBuyItem}>Buy</button>
            }
            </div>
        )
}



function mdp(dispatch) {
    return { 
        buyItem: (item, user) => dispatch(buyItem(item, user)),
       
     }
}
export default connect(null, mdp)(ItemCard);
  