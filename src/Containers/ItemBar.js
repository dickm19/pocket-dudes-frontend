import React from 'react'
import ItemCard from '../Components/ItemCard'
import '../App.css'
export default class ItemBar extends React.Component {

    renderItems = () => {
        return this.props.boughtItems.map(itemObj => <ItemCard itemBool={this.props.itemBool} points={this.props.points} spend={this.props.spend} boughtItems={this.props.boughtItems} user={this.props.user} key={itemObj.id} item={itemObj}/>)
    }
    // componentDidUpdate(prevProps){
    //     if (this.props !== prevProps){
    //         this.setState({bought: this.props.item.bought})
    //     }
    // }
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