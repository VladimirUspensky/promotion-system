import React, {useEffect, useState} from "react";
import axios from "axios";
import Notification from "./Notification";
import {makeStyles} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        gridArea: 'content',
        width: '45%',
        marginLeft: '25%'
    }
}))


const Notifications = () => {
    const classes = useStyles()
    const [notifications, setNotifications] = useState([])
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }
    useEffect(() => {
        const fetchNotifications = () => {
            axios.get('http://localhost:8000/api/notifications/', config).then(response => {
                setNotifications(response.data)
            }).catch(error => {

            })
        }
        fetchNotifications()
    }, [])


    const displayNotifications = () => {
        const displayedNotifications = []
        notifications.map(notification => {
            return (
                displayedNotifications.push(
                    <Notification id={notification.id}
                                  task={notification.task}
                                  from_user={notification.from_user}
                                  send_date={notification.send_date}
                                  status={notification.status}
                                  content={notification.content}
                                  notifications={notifications}
                                  notification_type={notification.notification_type}
                    />
                )
            )
        })
        return displayedNotifications
    }

    return (
        <div className={classes.root}>
            {displayNotifications()}
        </div>
    )
}

export default Notifications




