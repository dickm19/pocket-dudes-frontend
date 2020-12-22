import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'

export default function NavBar(){
    return(
        <div className='navbar'>
            <Link to={"/home"}>
                <span>Home</span>
            </Link><br/>
            <Link to={'/adopt'}>
                <span>Adopt</span>
            </Link><br/>
            <Link to={"/pets"}>
                <span>Pets</span>
            </Link><br/>
            <Link to={"/shop"}>
                <span>Shop</span>
            </Link>
            
        </div>
    )
}