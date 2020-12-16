import React from 'react'

export default function ItemCard({item}){

    const buyItem = () => {

    }
    return(
        <div className='item-card'>
            <img src={item.image} alt={item.name}/>
            <p>{item.name}</p>
            <button onClick={buyItem}>Buy</button>
        </div>
    )
}