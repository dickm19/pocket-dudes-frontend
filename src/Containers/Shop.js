import React, {useState} from 'react'
import Dropdown from 'react-dropdown';
import ItemCard from '../Components/ItemCard'
import ItemBar from './ItemBar'
import 'react-dropdown/style.css';

export default function Shop({items, user, boughtItems, buyItem}){

    const [selection, setSelection] = useState('all')

    const filteredItems = () => {
        if (selection === 'all'){
            return items.map(itemObj => {
                   return <ItemCard boughtItems={boughtItems} buyItem={buyItem} user={user}  key={itemObj.id} item={itemObj}/>
            })
        }else{
            const filterSelection  = selection.replace('s', '')
            const filtered = items.filter(itemObj => itemObj.kind === filterSelection)
            return filtered.map(itemObj => <ItemCard boughtItems={boughtItems} buyItem={buyItem} user={user} key={itemObj.id} item={itemObj}/>)
        }
    }

    const options = ['all', 'food', 'toys']

    function selectOption(e){
        setSelection(e.value)
    }

    return(

        <div className="shop">
            <ItemBar boughtItems={boughtItems} user={user}/>
            <Dropdown options={options} onChange={selectOption} value={selection} placeholder="Select an option" />
            {filteredItems()}
        </div>
    )
}

