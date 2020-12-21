import React from 'react'
import { Link } from 'react-router-dom'


export default function NavBar(){
    return(
        <div className='navbar'>
            {/* <Link to={"/home"}>
                <span>Home</span>
            </Link> */}
            <Link to={'/adopt'}>
                <span>Adopt</span>
            </Link>
            <Link to={"/pets"}>
                <span>Pets</span>
            </Link>
            <Link to={"/shop"}>
                <span>Shop</span>
            </Link>
            
        </div>
    )
}