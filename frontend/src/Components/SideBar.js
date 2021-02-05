import React from 'react'
import './SideBar.css'
import { SideBarData } from './SideBarData'
import SubMenu from './SubMenu'



class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: SideBarData,
        }
    }

    render() {
        return (
            <div className='sidebar'>
            <ul>
                <li className='sidebar-item'>
                    {this.state.data.map((dropdownItem, index) => {
                        return (
                            <SubMenu item={dropdownItem} key={index} />
                        )
                    })}
                </li>
            </ul>
        </div>
        )
    }
}


export default SideBar
