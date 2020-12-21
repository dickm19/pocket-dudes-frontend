import React, {useState} from 'react'
import { buyItem } from '../redux/actions';

function ItemCard({item}){

    const [bought, setBought] = useState(false)

    const localBuyItem = () => {
       setBought(true)
       return buyItem(item, user)
   }

//    const checkBought = () => {
//        return boughtItems.includes(item) ? null : console.log(boughtItems)
//    }
        return(
            <div className='item-card'>
                {/* {checkBought()} */}
                <img src={item.image} alt={item.name}/>
                <p>{item.name}</p>
                
                {bought ? 
                    null
                :
                    <button onClick={localBuyItem}>Buy</button>
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
  