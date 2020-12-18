import React, {useState} from 'react'

function ItemCard({item, buyItem, boughtItems}){

    const [bought, setBought] = useState(false)

   const localBuyItem = () => {
       buyItem(item)
        setBought(true)
   }

   const checkBought = () => {
       return boughtItems.includes(item) ? null : console.log(boughtItems)
   }
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



export default ItemCard;
  