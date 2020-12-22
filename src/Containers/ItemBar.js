import React from 'react'
import ItemCard from '../Components/ItemCard'
import '../App.css'
export default function ItemBar({user, bought}) {

    const renderItems = () => {
        return bought.map(itemObj => <ItemCard boughtItems={bought} user={user} key={itemObj.id} item={itemObj}/>)
    }

    return(
        <div>
            {bought.length > 0 ? 
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