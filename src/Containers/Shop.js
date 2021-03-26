import React, {useState} from 'react'
import Dropdown from 'react-dropdown';
import ItemCard from '../Components/ItemCard'
import ItemBar from './ItemBar'
import 'react-dropdown/style.css';

    export default function Shop({ items, user, bought, points}){

    const [selection, setSelection] = useState('all')

    const boughtItems = bought.map(user_item => user_item.item)
    const filteredItems = () => {
        if (selection === 'all'){
            return items.map(item => {
                   return <ItemCard   points={points} boughtItems={boughtItems} user={user} key={item.id} item={item}/>
            })
        }else{
            const filterSelection  = selection.replace('s', '')
            const filtered = items.filter(item => item.kind === filterSelection)
            return filtered.map(item => <ItemCard   points={points} boughtItems={boughtItems} user={user} key={item.id} item={item}/>)
        }
    }

    const options = ['all', 'food', 'toys']

    function selectOption(e){
        setSelection(e.value)
    }

    return(
        <> 
            <div className='item-bar'>
                <ItemBar  points={points} boughtItems={boughtItems} user={user}/>
            </div>
            <div className='dropdown'>
                <Dropdown className='dropdown' options={options} onChange={selectOption} value={selection} placeholder="Select an option" />
            </div>
            <div className="shop">
                {filteredItems()}
            </div>
        </>
    )
}


  