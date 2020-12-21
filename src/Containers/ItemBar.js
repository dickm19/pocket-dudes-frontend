import React from 'react'
import ItemCard from '../Components/ItemCard'

export default function ItemBar({user, bought}) {

    const renderItems = () => {
        return bought.map(itemObj => <ItemCard boughtItems={bought} user={user} key={itemObj.id} item={itemObj}/>)
        
    }

    return(
        <div className="item-bar">
            {renderItems()}
        </div>
    )

}