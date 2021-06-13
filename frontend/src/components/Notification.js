import React, {useState} from "react";
import "./Notification.css"
import PropTypes from "prop-types"
import axios from "axios";
import {Button, InputLabel, makeStyles, TextareaAutosize} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import {Link} from "react-router-dom";


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        margin: '2%',
        border: '1px solid'
    },
    label: {
        fontSize: '20px',
        marginLeft: '30%',
        margin: '1%'
    },
    left: {
        marginLeft: '2%'
    },
    textarea: {
        marginLeft: '30%',
        fontWeight: 'bold',
        fontSize: '20px'
    },
    link: {
        textDecoration: 'none'
    },
    form: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: '30%'
    },
    button: {
        margin: '3%'
    }

}))


const Notification = ({ id, task, from_user, send_date, status, content, notifications, notification_type }) => {
    const classes = useStyles()
    const [replyChoiceType, setReplyChoiceType] = useState('')
    const [solutionChoiceType, setSolutionChoiceType] = useState('')
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

    const deleteNotification = () => {
        axios.delete(`http://localhost:8000/api/notifications/delete/${id}`, config).then(response => {
            console.log('Success')
            console.log(response.data)
        }).catch(error => {
            console.log('Error')
        })
    }

    const handleReplyChoice = event => {
        console.log('SUBMIT')
        event.preventDefault()
        if (replyChoiceType === 'accept') {
            const body = JSON.stringify({status: 'in_process', performer: from_user.id, title: task.title})
            axios.put(`http://localhost:8000/api/tasks/update/${task.slug}`, body, config).then(response => {
                deleteNotification()
                console.log(response.data)
                console.log('Success')
            }).catch(error => {
                console.log(error)
            })
        } else {
            deleteNotification()
        }
    }

    const handleSolutionChoice = event => {
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

    const startChat = () => {
        const body = JSON.stringify({
            from_user: from_user.id,
            to_user: localStorage.getItem('id')
        })
        axios.post(`http://localhost:8000/api/chat/create/`, body, config).then(response => {
            console.log('Success created chat')
            setReplyChoiceType('accept')
            //TODO delete other replies and change task status into IN_PROCESS
        }).catch(error => {
            console.log('Fail')
            console.log(error)
        })
    }

    return (
        <div className={classes.root}>
            {
                //TODO if status is CHECKED make it less light
            }
            <InputLabel className={`${classes.label} ${classes.left}`}>New</InputLabel>
            <InputLabel className={classes.label}>Date: {send_date}</InputLabel>
            <Link className={classes.link} to={`tasks/${task.slug}`}>
                <InputLabel className={classes.label}>{task.title}</InputLabel>
            </Link>
            <InputLabel className={classes.label}>
                From: {from_user.email} {from_user.first_name} {from_user.last_name}
            </InputLabel>
            <InputLabel className={classes.label}>Status: {task.status}</InputLabel>
            <Box className={classes.textarea}>{content}</Box>
            {
                notification_type === 'reply' ? (
                    <form className={classes.form} onSubmit={event => handleReplyChoice(event)}>
                        <Button className={classes.button}
                                variant='contained'
                                color='primary'
                                type='submit'
                                onClick={() => setReplyChoiceType('accept')}>
                            Accept
                        </Button>
                        <Button className={classes.button}
                                variant='contained'
                                color='secondary'
                                type='submit'
                                onClick={() => setReplyChoiceType('cancel')}>
                            Cancel
                        </Button>
                    </form>
                ) : (
                    <form className='accept__task__solution__form' onSubmit={event => handleSolutionChoice(event)}>
                        <button type='submit' className='solution__accept' onClick={() => startChat()}>
                            Accept
                        </button>
                        <button type='submit' className='solution__cancel' onClick={() => setSolutionChoiceType('cancel')}>
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
