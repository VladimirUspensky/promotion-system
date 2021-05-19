import React, {useState} from "react";
import "./TaskCreate.css"
import axios from "axios";


const TaskCreate = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        deadline: '',
        payment: '',
        customer: localStorage.getItem('id')
    })

    const { title, description, deadline, payment, customer } = formData

    const onChange = event => setFormData({...formData, [event.target.name]: event.target.value})
    const onSubmit = event => {
        event.preventDefault()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        const body = JSON.stringify(formData)
        axios.post('http://localhost:8000/api/tasks/create', body, config).then(response => {
            console.log('success')
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <div className='task__create'>
            <div className="task__create__header">
                <div className="task__create__header__title">
                    Create New Task
                </div>
            </div>
            <div className="task__create__block">
                <form className="task__create__form" onSubmit={event => onSubmit(event)}>
                    <input className="task__create__title__input"
                           placeholder="title"
                           name='title'
                           value={title}
                           onChange={event => onChange(event)}/>
                    <textarea className="task__create__description__textarea"
                              placeholder="description"
                              name='description'
                              value={description}
                              onChange={event => onChange(event)}/>
                    <div className="task__create__oneline__inputs">
                        <input className="task__create__deadline__input"
                               placeholder="deadline"
                               name='deadline'
                               value={deadline}
                               onChange={event => onChange(event)}/>
                        <input className="task__create__payment__input"
                               placeholder="payment"
                               name='payment'
                               value={payment}
                               onChange={event => onChange(event)}/>
                    </div>
                    <button type="submit" className="task__create__button">Create New Task</button>
                </form>
            </div>

        </div>
    )
}

export default TaskCreate
