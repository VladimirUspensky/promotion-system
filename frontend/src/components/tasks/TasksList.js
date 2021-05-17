import React, {useEffect, useState} from "react";
import "./TasksList.css"
import axios from "axios";
import Task from "./Task";
import Pagination from "../Pagination";


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
            <form className="tasks__list__search" onSubmit={event => onSubmit(event)}>
                <div className="search__filters__block">
                    <label className="filters__label"> status
                        <select className="filters__select"
                                onChange={event => onChange(event)}
                                name='status'
                                value={status}>
                            <option className="filters__select__option">open</option>
                            <option className="filters__select__option">done</option>
                            <option className="filters__select__option">in_process</option>
                        </select>
                    </label>
                    <label className="filters__label"> payment
                        <select className="filters__select"
                                onChange={event => onChange(event)}
                                name='payment'
                                value={payment}>
                            <option className="filters__select__option">0+</option>
                            <option className="filters__select__option">1000+</option>
                            <option className="filters__select__option">2000+</option>
                            <option className="filters__select__option">5000+</option>
                            <option className="filters__select__option">10000+</option>
                            <option className="filters__select__option">25000+</option>
                        </select>
                    </label>
                    <input className='publication__date__input'
                           name='publication_date'
                           value={publication_date}
                           onChange={event => onChange(event)}/>
                    <input className='deadline__input'
                           name='deadline'
                           value={deadline}
                           onChange={event => onChange(event)}/>
                    <label className='tasks__checkbox__label'> My Tasks
                        <input type='checkbox'
                               className='tasks__checkbox'
                               name='email'
                               value={email}
                               onChange={event => handleCheckbox(event)}/>
                    </label>
                </div>
                <div className="search__input__block">
                    <label className="search__input__label">
                        <input className="search__input"
                               onChange={event => onChange(event)}
                               name='title'
                               value={title}/>
                    </label>
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


