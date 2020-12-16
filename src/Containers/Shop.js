import React, {useState} from 'react'
import Dropdown from 'react-dropdown';
import ItemCard from '../Components/ItemCard'
import 'react-dropdown/style.css';

export default function Shop({items, user, bought, buyItem}){

    const [selection, setSelection] = useState('all')

    const filteredItems = () => {
        
        if (selection === 'all'){
            return items.map(itemObj => <ItemCard bought={bought} buyItem={buyItem} user={user}  key={itemObj.id} item={itemObj}/>)
        }else{
            const filterSelection  = selection.replace('s', '')
            const filtered = items.filter(itemObj => itemObj.kind === filterSelection)
            return filtered.map(itemObj => <ItemCard bought={bought} buyItem={buyItem} user={user} key={itemObj.id} item={itemObj}/>)
        }
    }

    const options = ['all', 'food', 'toys']

    function selectOption(e){
        setSelection(e.value)
    }

    return(
        <div className="center">
            <Dropdown options={options} onChange={selectOption} value={selection} placeholder="Select an option" />
            {filteredItems()}
        </div>
    )
}

