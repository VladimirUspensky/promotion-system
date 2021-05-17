import React, {useEffect, useState} from "react";
import axios from "axios";
import "./TaskDetail.css"
import Reply from "./Reply";


const TaskDetail = (props) => {
    const [replies, setReplies] = useState([])
    const [taskDetail, setTaskDetail] = useState({})
    const [customer, setCustomer] = useState({})
    const [isEditable, setIsEditable] = useState(false)
    const [submitType, setSubmitType] = useState('')
    const [formData, setFormData] = useState({
        content: '',
        send_date: '',
        from_user: 0,
        task: 0
    })
    const [editFormData, setEditFormData] = useState({
        title: '',
        description: '',
        deadline: '',
        payment: ''
    })

    const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }

    const { title, description, deadline, payment } = editFormData

    const { content } = formData

    const onChange = event => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const onEditFormChange = event => {
        setEditFormData({...editFormData, [event.target.name]: event.target.value})
    }

    const onSubmit = event => {
        event.preventDefault()
        const send_date = new Date().getUTCDate()
        const task = taskDetail.id
        const from_user = localStorage.getItem('id')
        const body = JSON.stringify({ content, send_date, from_user, task })

        axios.post('http://localhost:8000/api/tasks/reply/create', body, config).then(response => {
            console.log('Success reply post')
        }).catch(error => {
            console.log('Error reply post')
        })
    }

    const handleEditButton = event => setIsEditable(!isEditable)

    const clear = obj => {
        Object.entries(obj).forEach(([key, value]) => {
            if (value === "") {
                delete obj[key]
            }
        })
    }

    const handleEditDeleteTask = event => {
        event.preventDefault()
        clear(editFormData)
        const body = JSON.stringify(editFormData)
        const slug = window.location.pathname.split('/').pop()

        if (submitType === 'delete') {
            axios.delete(`http://localhost:8000/api/tasks/delete/${slug}`, config).then(response => {
                console.log('Deleted task successfully')
            }).catch(error => {
                console.log('Deleted task failed')
            })
        } else {
            axios.put(`http://localhost:8000/api/tasks/update/${slug}`, body, config).then(response => {
                setTaskDetail(response.data)
                console.log('Updated task successfully')
            }).catch(error => {
                console.log('Updated task failed')
            })
        }
    }

    useEffect(() => {
        const fetchTaskDetail = () => {
            const slug = props.match.params.slug
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
            axios.get(`http://localhost:8000/api/tasks/${slug}`, config).then(response => {
                setTaskDetail(response.data)
                setCustomer(response.data.customer)
                setReplies(response.data.replies)
            }).catch(error => {
                console.log(error)
            })
        }
        fetchTaskDetail()
    }, [])

    const displayReplies = () => {
        let displayedReplies = []
        console.log(replies)
        replies.map(reply => {
            return displayedReplies.push(
                <Reply send_date={reply.send_date}
                       content={reply.content}
                       last_name={reply.from_user.last_name}
                       first_name={reply.from_user.first_name}/>
            )
        })
        return displayedReplies
    }

    return (
        <div className='task__detail'>
            <div className='task__detail__oneline__fields'>
                <label className='task__detail__field'>{taskDetail.published_date}</label>
                <label className='task__detail__field'>{taskDetail.deadline}</label>
            </div>
            <text className='task__detail__description'>{taskDetail.description}</text>
            <div className='task__detail__oneline__fields'>
                <label className='task__detail__field'>{taskDetail.status}</label>
                <label className='task__detail__field'>{taskDetail.payment}</label>
            </div>
            {
                customer.email === localStorage.getItem('email') ? (
                    <button className='edit__task__button' onClick={event => handleEditButton(event)}>Edit</button>
                ) : null
            }
            {
                isEditable ? (
                    <form className='task__edit__form' onSubmit={event => handleEditDeleteTask(event)}>
                        <input className='edit__task__field'
                               placeholder='title'
                               name='title'
                               value={title}
                               onChange={event => onEditFormChange(event)}/>
                        <textarea className='task__edit__description'
                                  placeholder='description'
                                  name='description'
                                  value={description}
                                  onChange={event => onEditFormChange(event)}/>
                        <input className='edit__task__field'
                               placeholder='payment'
                               name='payment'
                               value={payment}
                               onChange={event => onEditFormChange(event)}/>
                        <input className='edit__task__field'
                               placeholder='deadline'
                               name='deadline'
                               value={deadline}
                               onChange={event => onEditFormChange(event)}/>
                        <button className='update__task__button'
                                type='submit'
                                onClick={event => setSubmitType('update')}>
                            Update
                        </button>
                        <button className='delete__task__button'
                                type='submit'
                                onClick={event => setSubmitType('delete')}>
                            Delete
                        </button>
                    </form>
                ) : null
            }
            <form className='send__reply__form' onSubmit={event => onSubmit(event)}>
                <textarea className='send__reply__textarea'
                          placeholder='type your reply'
                          name='content'
                          value={content}
                          onChange={event => onChange(event)}/>
                <button className='send__reply__button'>Send</button>
            </form>
            <div className='reply__list'>
                {displayReplies()}
            </div>
        </div>

    )
}

export default TaskDetail
