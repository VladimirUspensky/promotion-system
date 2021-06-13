import React, {useEffect, useState} from "react";
import "./TasksList.css"
import axios from "axios";
import Task from "./Task";
import Pagination from "../Pagination";
import {Checkbox, InputLabel, makeStyles, MenuItem, Select, TextField} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        border: '2px solid rgba(0,0,0,.1)',
        boxShadow: '0 2px 4px -2px blue',
        marginLeft: '25%',
        borderTop: 'none',
    },
    form: {
        width: '50%',
        height: '30%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '25%',
        marginTop: '3%',
        border: '1px solid blue',
        boxShadow: '0 0 10px'

    },

    filters: {
        padding: '30px',

    },
    filterLabel: {

    },
    selects: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
    },
    select: {
        margin: '10px',
        width: '50%'
    },
    option: {


    },
    inputs: {
        display: 'flex',
        flexDirection: 'row',
        padding: '10px',

    },
    input: {
        marginLeft: '15px',
        marginRight: '15px'
    },
    label: {
        display: 'flex',
        alignItems: 'center',
    },
    checkbox_block: {
        display: 'flex',
        flexDirection: 'row',
    },
    search: {
        display: 'flex',

    },
    search_line: {
        display: 'flex',
        width: '100%'
    }
}))


const TasksList = () => {
    const [tasks, setTasks] = useState([])
    const [count, setCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [nextPage, setNextPage] = useState('')
    const [previousPage, setPreviousPage] = useState('')
    const [filters, setFilters] = useState({
        title: '',
        status: '',
        payment: '',
        deadline: '',
        publication_date: '',
        email: ''
    })
    const classes = useStyles()
    const {title, status, payment, deadline, publication_date, email} = filters

    useEffect(() => {
        const fetchTasks = () => {
            axios.get(
                    `http://localhost:8000/api/tasks/?status=${status}&title=${title}&payment=${payment}&deadline=${deadline}&publication_date=${publication_date}&customer__email=${email}`
            ).then(response => {
                setTasks(response.data.results)
                setCount(response.data.count)
                setNextPage(response.data.next)
                console.log(filters)
                setPreviousPage(response.data.previous)
            }).catch(error => {
                console.log('Fetch tasks error')
            })
        }
        fetchTasks()
    }, [filters])

    const onSubmit = event => {
        event.preventDefault()
    }

    const onChange = event => setFilters({...filters, [event.target.name]: event.target.value})

    const handleCheckbox = event => {
        if (filters.email) {
            setFilters({...filters, email: ''})
        } else {
            setFilters({...filters, email: localStorage.getItem('email')})
        }
    }

    const displayTasks = () => {
        let displayedTasks = []
        tasks.map(task => {
            return displayedTasks.push(
                <Task
                    slug={task.slug}
                    title={task.title}
                    payment={task.payment}
                    description={task.description}
                    published_date={task.published_date}
                    deadline={task.deadline}
                    status={task.status}
                />
            )
        })
        return displayedTasks
    }

    const showNextPage = () => {
        axios.get(nextPage).then(response => {
            setTasks(response.data.results)
            setNextPage(response.data.next)
            setPreviousPage(response.data.previous)
            if (nextPage) {
                setCurrentPage(currentPage + 1)
            }
            console.log(response.data)
        }).catch(error => {
            console.log('ShowNextPage error')
        })
    }

    const showPrevPage = () => {
        axios.get(previousPage).then(response => {
            setTasks(response.data.results)
            setNextPage(response.data.next)
            setPreviousPage(response.data.previous)
            if (previousPage) {
                setCurrentPage(currentPage - 1)
            }
        }).catch(error => {
            console.log('ShowPreviousPage error')
        })
    }

    const changePage = page => {
        axios.get(`http://localhost:8000/api/tasks/?page=${page}`).then(response => {
            setTasks(response.data.results)
            setCount(response.data.count)
            setNextPage(response.data.next)
            setPreviousPage(response.data.previous)
            setCurrentPage(page)
        }).catch(error => {
            console.log('ChangePage error')
        })
    }


    return (
        <div className="tasks__list">
            <div className="tasks__list__header">
                <div className="tasks__list__header__title">
                    Tasks List
                </div>
            </div>

            <form className={classes.root}>
                <div className={classes.filters}>
                    <div className={classes.selects}>
                        <InputLabel id='status-label' className={classes.label}>Status</InputLabel>
                        <Select labelId='status-label'
                                className={classes.select}
                                name='status'
                                value={status}
                                onChange={event => onChange(event)}>
                            <MenuItem className={classes.option} value='open'>open</MenuItem>
                            <MenuItem className={classes.option} value='done'>done</MenuItem>
                            <MenuItem className={classes.option} value='in_process'>in_process</MenuItem>
                        </Select>

                        <InputLabel className={classes.label}>Payment</InputLabel>
                        <Select className={classes.select}
                                name='payment'
                                value={payment}
                                onChange={event => onChange(event)}>
                            <MenuItem className={classes.option} value='0+'>0+</MenuItem>
                            <MenuItem className={classes.option} value='1000+'>1000+</MenuItem>
                            <MenuItem className={classes.option} value='2000+'>2000+</MenuItem>
                            <MenuItem className={classes.option} value='5000+'>5000+</MenuItem>
                            <MenuItem className={classes.option} value='10000+'>10000+</MenuItem>
                            <MenuItem className={classes.option} value='25000+'>25000+</MenuItem>
                        </Select>
                    </div>

                    <div className={classes.inputs}>
                        <InputLabel className={classes.label}>Publication Date</InputLabel>
                        <TextField className={classes.input}
                                   name='publication_date'
                                   value={publication_date}
                                   onChange={event => onChange(event)}/>
                        <InputLabel className={classes.label}>Deadline</InputLabel>
                        <TextField className={classes.input}
                                   name='deadline'
                                   value={deadline}
                                   onChange={event => onChange(event)}/>
                    </div>
                    <div className={classes.checkbox_block}>
                        <InputLabel className={classes.label}>My tasks</InputLabel>
                        <Checkbox name='email' value={email} onChange={event => onChange(event)}/>
                    </div>
                    <div className={classes.search}>
                        <TextField label='Search'
                                   className={classes.search_line}
                                   name='title' value={title}
                                   onChange={event => onChange(event)}/>
                    </div>
                </div>
            </form>
            {displayTasks()}
            <Pagination count={count}
                        itemsPerPage={3}
                        currentPage={currentPage}
                        changePage={changePage}
                        nextPage={showNextPage}
                        prevPage={showPrevPage}
            />
        </div>
    )
}

export default TasksList


