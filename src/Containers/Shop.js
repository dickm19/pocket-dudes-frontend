import React, {useState} from 'react'
import Dropdown from 'react-dropdown';
import ItemCard from '../Components/ItemCard'
import ItemBar from './ItemBar'
import 'react-dropdown/style.css';

    export default function Shop({ items, user, bought, points, spend}){

    const [selection, setSelection] = useState('all')

    const boughtItems = bought.map(user_item => user_item.item)
    const filteredItems = () => {
        // console.log(bought)
        if (selection === 'all'){
            return items.map(item => {
                   return <ItemCard   points={points} spend={spend} boughtItems={boughtItems} user={user} key={item.id} item={item}/>
            })
        }else{
            const filterSelection  = selection.replace('s', '')
            const filtered = items.filter(item => item.kind === filterSelection)
            return filtered.map(item => <ItemCard   points={points} spend={spend} boughtItems={boughtItems} user={user} key={item.id} item={item}/>)
        }
    }

    const options = ['all', 'food', 'toys']

    function selectOption(e){
        setSelection(e.value)
    }

    return(
        <> 
            <div className='item-bar'>
                <ItemBar  points={points} spend={spend} boughtItems={boughtItems} user={user}/>
            </div>
            <div className='shop-pge'>
            <div className='dropdown'>
            <Dropdown options={options} onChange={selectOption} value={selection} placeholder="Select an option" />
            </div>
            <div className="shop">
                {filteredItems()}
            </div>
            </div>
        </>
    )
}


  