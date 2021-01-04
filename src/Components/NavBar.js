import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'

export default function NavBar(){
    return(
        <div className='navbar'>
            <Link id='pets' to={"/pets"}>
                <span >Pets</span>
            </Link>
            <Link id='adopt' to={'/adopt'}>
                <span >Adopt</span>
            </Link>
            <Link id='shop' to={"/shop"}>
                <span >Shop</span>
            </Link>
            <Link id='game' to={"/game"}>
                <span >Play</span>
            </Link>
            
        </div>
    )
}