import React from 'react'
import ItemCard from '../Components/ItemCard'
import '../App.css'
export default function ItemBar({user, boughtItems}) {

    const renderItems = () => {
        return boughtItems.map(itemObj => <ItemCard boughtItems={boughtItems} user={user} key={itemObj.id} item={itemObj}/>)
    }

    return(
        <div>
            {boughtItems.length > 0 ? 
            <>
                <h1 className="items-header">Your Items</h1>
                {renderItems()}
            </>
            :
            <h3 className="items-header">Buy Some Items!</h3>
        }
        </div>
    )

}