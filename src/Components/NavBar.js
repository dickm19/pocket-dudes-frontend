import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'

export default function NavBar(){
    return(
        <div className='navbar'>
            <Link to={"/home"}>
                <span id='home'>Home</span>
            </Link><br/>
            <Link to={'/adopt'}>
                <span id='adopt'>Adopt</span>
            </Link><br/>
            <Link to={"/pets"}>
                <span id='pets'>Pets</span>
            </Link><br/>
            <Link to={"/shop"}>
                <span id='shop'>Shop</span>
            </Link>
            
        </div>
    )
}