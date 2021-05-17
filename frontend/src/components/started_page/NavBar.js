import React from "react";
import "./NavBar.css"
import {Link} from "react-router-dom";


const NavBar = () => {

    return (
        <div className='navbar'>
            <div className="navbar__logo">
                Promotion
            </div>
            <div className="signup__block">
                <Link className="navbar__item" to='/signin'><label className="item__text">Login</label></Link>
                <Link className="navbar__item" to='/signup'><label className="item__text">Sign Up</label></Link>
            </div>
        </div>
    )
}

export default NavBar
