import React from "react";
import { Link } from 'react-router-dom'
import './NavBar.css'


function NavBar() {
  return (
    <div className='navbar'>
        <span className='project-name'>Promotion System</span>
        <div className='navbar-items-block'>
            <ul className='navbar-items'>
                <Link to='/accounts' className='navbar-item'>Мои Аккаунты</Link>
                <Link to='/tasks' className='navbar-item'>Мои задачи</Link>
                <Link to='/create-task' className='navbar-item'>Создать задачу</Link>
                <Link to='/stats' className='navbar-item'>Статистика</Link>
                <Link to='/sign-in' className='navbar-item'>Выйти</Link>
            </ul>
        </div>
    </div>
  );
}

export default NavBar;
