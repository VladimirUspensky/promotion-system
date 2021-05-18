import React, {useEffect, useState} from "react";
import "./Notifications.css"
import axios from "axios";
import Notification from "./Notification";


const Notifications = () => {
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
                console.log('Success')
            }).catch(error => {
                console.log('Fail')
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
        <div className='notifications'>
            {displayNotifications()}
        </div>
    )
}

export default Notifications







