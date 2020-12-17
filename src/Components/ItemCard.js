import React from 'react'

function ItemCard({item, buyItem, bought}){


   const localBuyItem = () => {
       buyItem(item)
       window.location.reload(false)
       
   }
    
       
        return(
            <div className='item-card'>
                <img src={item.image} alt={item.name}/>
                <p>{item.name}</p>
                {bought ?
                    bought.includes(item) ? 
                        null
                    :
                        <button onClick={localBuyItem}>Buy</button>
                    
                :
                    <button onClick={localBuyItem}>Buy</button>
                }
                
            </div>
        )
}



export default ItemCard;
  