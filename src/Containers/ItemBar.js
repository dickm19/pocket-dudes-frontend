import React from 'react'
import ItemCard from '../Components/ItemCard'

export default function ItemBar({user, boughtItems}) {

    const renderItems = () => {
        return boughtItems.map(itemObj => <ItemCard boughtItems={boughtItems} user={user} key={itemObj.id} item={itemObj}/>)
        
    }

    return(
        <div className="item-bar">
            {renderItems()}
        </div>
    )

}