import React, {useState} from "react";
import {Link} from "react-router-dom";
import "./SideBar.css"


const SideBar = () => {

    const [showDropdown, setShowDropdown] = useState(true)

    const showDropdownMenu = event => {
        event.preventDefault()
        setShowDropdown(!showDropdown)
    }

    return (
        <div className="sidebar">
            <div className="sidebar__items">
                <div className="sidebar__item">Logo</div>
                <div className="sidebar__item"><Link className="item__link" to="/">Profile</Link></div>
                <div className="sidebar__item"><Link className="item__link" to="/tasks">Tasks</Link></div>
                <div className="sidebar__item"><Link className="item__link" to="#">In Process Tasks</Link></div>
                <div className="sidebar__item"><Link className="item__link" to="#">Solved Tasks</Link></div>
                <div className="sidebar__item"><Link className="item__link" to="#">Failed Tasks</Link></div>
                <div className="sidebar__item"><Link className="item__link" to="/tasks/create">New Task</Link></div>
                <div className="sidebar__item"><Link className="item__link" to="/signup">Sign Up</Link></div>
                <div className="sidebar__item"><Link className="item__link" to="/signin">Sign In</Link></div>
            </div>
        </div>
    )
}

export default SideBar
