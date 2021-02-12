import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { IconContext } from 'react-icons'
import './SideBar.css'


const SideBarlabel = styled.span`
    margin-left: 35px;  
`


class SubMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdown: false,
        }
        this.showDropdown = this.showDropdown.bind(this)
    }

    showDropdown() {
        this.setState({dropdown: !this.state.dropdown})
    }

    render() {

        return (
        <>
            <IconContext.Provider value={{color: '#fff'}}>
                <div className='sidebar-link-area'>
                    <Link className='sidebar-link'
                          to={this.props.item.path}
                          onClick={this.props.item.subItem && this.showDropdown}>
                        <div>
                            {this.props.item.icon}
                            <SideBarlabel>{this.props.item.title}</SideBarlabel>
                            {this.props.item.subItem && this.state.dropdown ?
                                this.props.item.iconOpened :
                                this.props.item.subItem ?
                                    this.props.item.iconClosed : null}
                        </div>
                    </Link>
                </div>
                <div className='dropdown-link-area'>
                    {this.state.dropdown && this.props.item.subItem.map((item, index) => {
                        return (
                            <Link className='dropdown-link' to={item.path} key={index}>
                                {item.icon}
                                <span className='sidebar-label'>{item.title}</span>
                                <hr style={{color: '#c0c0c0'}}/>
                            </Link>
                        )
                    })}
                </div>
            </IconContext.Provider>
        </>
        )
    }
}


export default SubMenu
