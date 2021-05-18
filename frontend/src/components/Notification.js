import React, {useState} from "react";
import "./Notification.css"
import PropTypes from "prop-types"
import axios from "axios";


const Notification = ({ id, task, from_user, send_date, status, content, notifications, notification_type }) => {
    const [replyChoiceType, setReplyChoiceType] = useState('accept')
    const [solutionChoiceType, setSolutionChoiceType] = useState('accept')
    const [frozen, setFrozen] = useState({
        status: false
    })
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }

    const freezeNotifications = task => {
        const body = JSON.stringify({status: false})
        notifications.forEach(notification => {
            if (notification.task.id === task.id) {
                axios.put(`http://localhost:8000/api/notifications/update/${notification.id}`, body, config)
                    .then(response => {
                    console.log('Success')
                }).catch(error => {
                    console.log('Error')
                })
            }
        })
    }

    const handleReplyChoice = event => {
        event.preventDefault()
        if (replyChoiceType === 'accept') {
            const body = JSON.stringify({status: 'in_process', performer: from_user, title: task.title})
            axios.put(`http://localhost:8000/api/tasks/update/${task.slug}`, body, config).then(response => {
                freezeNotifications(task)
                console.log('Success')
            }).catch(error => {
                console.log(error)
            })
        } else {
            axios.delete(`http://localhost:8000/api/notifications/delete/${id}`, config).then(response => {
                console.log('Success')
            }).catch(error => {
                console.log('Fail')
            })
        }
    }

    const handleSolutionChoice = event => {
        event.preventDefault()
        if (solutionChoiceType === 'accept') {
            const body = JSON.stringify({status: 'done', title: task.title})
            axios.put(`http://localhost:8000/api/tasks/update/${task.slug}`, body, config).then(response => {
                console.log('Success')
            }).catch(error => {
                console.log('Fail')
                console.log(error)
            })
        } else {
            axios.delete(`http://localhost:8000/api/notifications/delete/${id}`, config).then(response => {
                console.log('Success')
            }).catch(error => {
                console.log('Error')
            })
        }
    }

    return (
        <div className='notification'>
            {
                //TODO if status is CHECKED make it less light
            }
            <label className='notification__title'>New</label>
            <label className='notification__date'>{send_date}</label>
            <text className='notification__task__title'>{task.title}</text>
            <label className='notification__from'>
                {from_user.email} {from_user.first_name} {from_user.last_name}
            </label>
            <label className='notification__status'>{status}</label>
            <label className='notification__content'>{content}</label>
            {
                notification_type === 'reply' ? (
                    <form className='reply__accept__cancel' onSubmit={event => handleReplyChoice(event)}>
                        <button className='reply__accept' onClick={() => setReplyChoiceType('accept')}>
                            Accept
                        </button>
                        <button className='reply__cancel' onClick={() => setReplyChoiceType('cancel')}>
                            Cancel
                        </button>
                    </form>
                ) : (
                    <form className='accept__task__solution__form' onSubmit={event => handleSolutionChoice(event)}>
                        <button className='solution__accept' onClick={() => setSolutionChoiceType('accept')}>
                            Accept
                        </button>
                        <button className='solution__cancel' onClick={() => setSolutionChoiceType('cancel')}>
                            Cancel
                        </button>
                    </form>
                )
            }
        </div>
    )
}

Notification.propTypes = {
    id: PropTypes.number.isRequired,
    task: PropTypes.object.isRequired,
    from_user: PropTypes.object.isRequired,
    send_date: PropTypes.instanceOf(Date).isRequired,
    status: PropTypes.bool.isRequired,
    content: PropTypes.string.isRequired,
    notifications: PropTypes.array.isRequired,
    notification_type: PropTypes.string.isRequired
}

export default Notification
