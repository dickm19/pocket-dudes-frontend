import React, {useState} from 'react'
import Dropdown from 'react-dropdown';
import ItemCard from '../Components/ItemCard'
import 'react-dropdown/style.css';

export default function Shop({items}){

    const [selection, setSelection] = useState('all')

    const filteredItems = () => {
        if (selection === 'all'){
            return items.map(itemObj => <ItemCard key={itemObj.id} item={itemObj}/>)
        }else{
            const filtered = items.filter(itemObj => itemObj.type === selection)
            return filtered.map(itemObj => <ItemCard key={itemObj.id} item={itemObj}/>)
        }
    }

    const options = ['all', 'food', 'toys']

    const selectOption = (e) => {
        setSelection(e.target)
    }

    return(
        <div className="shop">
            <Dropdown options={options} onChange={selectOption} value={selection} placeholder="Select an option" />
            {filteredItems}
        </div>
    )
}