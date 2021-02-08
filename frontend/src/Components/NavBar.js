import React from "react";
import { Link } from 'react-router-dom'
import './NavBar.css'


function NavBar() {
  return (
    <div className='navbar'>
        <span className='project-name'>Promotion System</span>
        <div className='navbar-items-block'>
            <ul className='navbar-items'>
                <Link to='/login' className='navbar-item'>Logout</Link>
            </ul>
        </div>
    </div>
  );
}

export default NavBar;
