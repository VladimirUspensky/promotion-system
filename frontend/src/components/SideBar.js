import React, {useState} from "react";
import {Link} from "react-router-dom";

import "./SideBar.css"
import {makeStyles} from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CreateIcon from '@material-ui/icons/Create';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ChatIcon from '@material-ui/icons/Chat';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        height: '100%',
        width: '11%',
        position: 'fixed',
        border: '2px solid rgba(0,0,0,.1)',
        boxShadow: '0 3px 10px -2px blue',
    },
    items: {
        backgroundColor: 'white'
    },
    item: {
        display: 'flex',
        margin: '5%',
        justifyContent: 'start',
    },
    link: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        textDecoration: 'none',
        marginBottom: '10%',
        fontSize: '22px',
        marginTop: '15%',
        color: 'black',
        '&:hover': {
            fontSize: '23px',
            fontWeight: 'bold'
        },
    },
    profileLink: {
        display: 'flex',
        justifyContent: 'center',
        textDecoration: 'none',
        fontSize: '22px',
        marginTop: '50%',
        textAlign: 'center',
        justifyItems: 'center',
        color: 'black',
    },
    icon: {
        fontSize: '30px',
        width: '50px'
    }
}))


const SideBar = () => {

    const [showDropdown, setShowDropdown] = useState(true)

    const showDropdownMenu = event => {
        event.preventDefault()
        setShowDropdown(!showDropdown)
    }
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <div className={classes.items}>
                <div className={classes.item}>
                    <Link className={classes.profileLink} to="/">
                        <AccountCircleIcon className={classes.icon}/>Profile
                    </Link>
                </div>
                <div className={classes.item}>
                    <Link className={classes.link} to="/tasks">
                        <AssignmentIcon className={classes.icon}/>Tasks
                    </Link>
                </div>
                <div className={classes.item}>
                    <Link className={classes.link} to="/my_tasks">
                        <AssignmentTurnedInIcon className={classes.icon}/>My Tasks
                    </Link>
                </div>
                <div className={classes.item}>
                    <Link className={classes.link} to="/tasks/create">
                        <CreateIcon className={classes.icon}/>New Task
                    </Link>
                </div>
                <div className={classes.item}>
                    <Link className={classes.link} to="/notifications">
                        <NotificationsIcon className={classes.icon}/>Notifications
                    </Link>
                </div>
                <div className={classes.item}>
                    <Link className={classes.link} to="/chats">
                        <ChatIcon className={classes.icon}/>Chats
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SideBar
