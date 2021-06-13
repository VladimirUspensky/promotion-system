import React, {useEffect, useState} from "react";
import "./UserTasks.css"
import axios from "axios";
import PropTypes from "prop-types";
import ReviewCreateModal from "../ReviewCreateModal";
import Pagination from "../Pagination";
import NotFound from "../NotFound";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        gridArea: 'content'
    }
}))


const Task = ({ slug, title, deadline, payment, customer, performer, status, id }) => {
    const classes = useStyles()
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
                    localStorage.getItem('email') === performer.email ? (
                        <div className='in__process__task__info'>
                            <label className='title'>{title}</label>
                            <label className='task__label'>{performer.email}</label>
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
                            <label className='title'>{title}</label>
                            <label className='task__label'>{customer.email}</label>
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
    const classes = useStyles()
    const [userTasks, setUserTasks] = useState([])
    const [inProcessTasks, setInProcessTasks] = useState([])
    const [count, setCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [nextPage, setNextPage] = useState('')
    const [previousPage, setPreviousPage] = useState('')
    const [filterStatus, setFilterStatus] = useState({choice: 'customer__email'})

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }

    const onChange = event => {
        console.log(event.target.name)
        console.log(event.target.value)
        setFilterStatus({choice: event.target.value})
    }

    useEffect(() => {
        const fetchTasks = () => {
            if (filterStatus.choice === 'performer__email') {
                axios.get(`http://localhost:8000/api/tasks/?performer__email=${localStorage.getItem('email')}`,
                config).then(response => {
                        setInProcessTasks(response.data.results)
                        setCount(response.data.count)
                        console.log('Success')
                        console.log(response.data)
                     }).catch(error => {
                        console.log('Fail')
                        console.log(error)
                     })
            } else {
                console.log(2)
                axios.get(`http://localhost:8000/api/tasks/?customer__email=${localStorage.getItem('email')}`,
                config).then(response => {
                        setUserTasks(response.data.results)
                        setCount(response.data.count)
                        console.log('Success')
                        console.log(userTasks)
                     }).catch(error => {
                        console.log('Fail')
                        console.log(error)
                     })
            }
        }
        fetchTasks()
    }, [filterStatus])

    const displayTasks = () => {
        let tasks = []
        if (filterStatus.choice === 'performer__email') {
            tasks = inProcessTasks
        } else {
            tasks = userTasks
        }
        const displayedTasks = []
        tasks.map(task => {
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

    const showNextPage = () => {
        axios.get(nextPage).then(response => {
            filterStatus.choice === 'performer__email' ?
                setInProcessTasks(response.data.results) : (
                    setUserTasks(response.data.results)
                )
            setNextPage(response.data.next)
            setPreviousPage(response.data.previous)
            if (nextPage) {
                setCurrentPage(currentPage + 1)
            }
            console.log('Success')
        }).catch(error => {
            console.log('Fail')
            console.log(error)
        })
    }

    const showPrevPage = () => {
        axios.get(previousPage).then(response => {
            filterStatus.choice === 'performer__email' ?
                setInProcessTasks(response.data.results) : (
                    setUserTasks(response.data.results)
                )
            setNextPage(response.data.next)
            setPreviousPage(response.data.previous)
            if (previousPage) {
                setCurrentPage(currentPage - 1)
            }
        }).catch(error => {
            console.log('Fail')
            console.log(error)
        })
    }

    const changePage = page => {
        console.log('Change page')
    }

    return (
        <div className={classes.root}>
            <div className='filters'>
                <select className='user__tasks__filters'
                        onChange={event => onChange(event)}>
                    <option className='user__tasks__filter'
                            name='choice'
                            value='customer__email'
                            onChange={event => onChange(event)}>published by me</option>
                    <option className='user__tasks__filter'
                            name='choice'
                            value='performer__email'
                            onChange={event => onChange(event)}>in process</option>
                </select>
            </div>
            {
                userTasks.length > 0 || inProcessTasks.length > 0 ? (
                    <div>
                        <div className='user__tasks__list'>
                            {displayTasks()}
                        </div>
                        <Pagination itemsPerPage={3}
                                    count={count}
                                    currentPage={currentPage}
                                    changePage={changePage}
                                    nextPage={showNextPage}
                                    prevPage={showPrevPage}
                        />
                    </div>
                ) :
                    <NotFound title='There is no tasks'/>
            }
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

