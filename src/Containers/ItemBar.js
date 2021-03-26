import React from 'react'
import ItemCard from '../Components/ItemCard'
import '../App.css'
export default class ItemBar extends React.Component {

    renderItems = () => {
        return this.props.boughtItems.map(itemObj => <ItemCard points={this.props.points}  boughtItems={this.props.boughtItems} user={this.props.user} key={itemObj.id} item={itemObj}/>)
    }
    render(){
        return(
            <div>
                {this.props.boughtItems.length > 0 ? 
                <>
                    <h1 className="items-header">Your Items</h1>
                    {this.renderItems()}
                </>
                :
                <h3 className="items-header">Buy Some Items!</h3>
            }
            </div>
        )
    }

}