import React, {useEffect, useState} from "react";
import "./UserTasks.css"
import axios from "axios";
import PropTypes from "prop-types";
import ReviewCreateModal from "../ReviewCreateModal";


const Task = ({ slug, title, deadline, payment, customer, performer, status, id }) => {
    const [submitType, setSubmitType] = useState('done')
    const [showReviewCreateModal, setShowReviewCreateModal] = useState(false)

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }
    const onSubmit = event => {
        event.preventDefault()
        if (submitType === 'done'){
            let today = new Date()
            let dd = String(today.getDate())
            let mm = String(today.getMonth() + 1)
            let yyyy = today.getFullYear()
            today = yyyy + '-' + mm + '-' + dd

            const notificationData = {
                task: id,
                from_user: localStorage.getItem('id'),
                to_user: customer.id === localStorage.getItem('id') ? performer.id : customer.id,
                send_date: today,
                content: `${title} was done`,
                notification_type: 'change_task_status'
            }

            const body = JSON.stringify(notificationData)
            axios.post(`http://localhost:8000/api/notifications/create`, body, config).then(response => {
                console.log('Success')
                setShowReviewCreateModal(!showReviewCreateModal)
                }).catch(error => {
                    console.log('Fail')
                    console.log(error)
                })
        } else {
            console.log('Start Chat')
        }
    }

    return (
        <div className='user__task'>
                {
                    localStorage.getItem('email') === customer.email ? (
                        <div className='in__process__task__info'>
                            <label className='user__task__customer'>{customer.email}</label>
                            <label className='user__task__title'>{title}</label>
                            <div className='user__task__oneline__labels'>
                                <label className='user__task__payment'>{payment}</label>
                                <label className='user__task__deadline'>{deadline}</label>
                            </div>
                            <form className='send__task__form' onSubmit={event => onSubmit(event)}>
                                {
                                    status === 'in_process' ? (
                                        <button className='send__task__button'
                                                type='submit'
                                                onClick={() => setSubmitType('done')}>
                                            Done
                                        </button>
                                    ) : null
                                }
                            </form>
                            <ReviewCreateModal show={showReviewCreateModal}
                                               setShow={setShowReviewCreateModal}
                                               customer={customer}
                                               performer={performer}
                                               id={id}/>
                            <label className='user__task__status'>{status}</label>
                        </div>
                    ) : (
                        <div className='user__task__info'>
                            <label className='user__task__performer'>{performer.email}</label>
                            <label className='user__task__title'>{title}</label>
                            <label className='user__task__deadline'>{deadline}</label>
                            <form className='start__chat__form' onSubmit={event => onSubmit(event)}>
                                <button className='start__chat__button'
                                        type='submit'
                                        onClick={() => setSubmitType('chat')}>
                                    Chat
                                </button>
                            </form>
                            <label className='user__task__status'>{status}</label>
                        </div>
                    )
                }
        </div>
    )
}


const UserTasks = () => {
    const [userTasks, setUserTasks] = useState([])
    const [inProcessTasks, setInProcessTasks] = useState([])
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }

    useEffect(() => {
        const  fetchTasks = () => {
            axios.get(`http://localhost:8000/api/tasks/?performer__email=${localStorage.getItem('email')}`,
                config)
                .then(response => {
                    setInProcessTasks(response.data.results)
                    console.log('Success')
                }).catch(error => {
                    console.log('Fail')
                    console.log(error)
            })
            axios.get(`http://localhost:8000/api/tasks/?customer__email=${localStorage.getItem('email')}`,
                config)
                .then(response => {
                    setUserTasks(response.data.results)
                    console.log('Success')
                }).catch(error => {
                    console.log('Fail')
                    console.log(error)
            })
        }
        fetchTasks()
    }, [])

    const displayTasks = () => {
        const displayedTasks = []
        inProcessTasks.map(task => {
            return displayedTasks.push(
                <Task customer={task.customer}
                      title={task.title}
                      payment={task.payment}
                      deadline={task.deadline}
                      slug={task.slug}
                      performer={task.performer}
                      status={task.status}
                      id={task.id}
                />
            )
        })
        userTasks.map(task => {
            return displayedTasks.push(
                <Task customer={task.customer}
                      title={task.title}
                      payment={task.payment}
                      deadline={task.deadline}
                      slug={task.slug}
                      performer={task.performer}
                      status={task.status}
                      id={task.id}
                />
            )
        })
        return displayedTasks
    }

    return (
        <div className='user__tasks'>
            <div className='user__tasks__list'>
                {displayTasks()}
            </div>
        </div>
    )
}

Task.propTypes = {
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    deadline: PropTypes.instanceOf(Date),
    payment: PropTypes.string.isRequired,
    customer: PropTypes.object.isRequired,
    performer: PropTypes.object.isRequired,
    status: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
}

export default UserTasks
