import React, {useEffect, useState} from "react";
import axios from "axios";
import "./TaskDetail.css"
import Reply from "./Reply";
import {Button, InputLabel, makeStyles, TextareaAutosize, TextField} from "@material-ui/core";
import Box from "@material-ui/core/Box";


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        gridArea: 'content',
        marginLeft: '30%',
        width: '60%',
        marginBottom: '2%'
    },
    customer: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '20%',
        marginTop: '5%',
    },
    customerLabel: {
        fontWeight: 'bold',
        margin: '5px'
    },
    labels: {
        display: 'inline-flex',
    },
    label: {
        margin: '2%'
    },
    description: {
        width: '50%'
    },
    right: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    left: {
        display: 'flex',
        justifyContent: 'flex-start'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '50%'
    },
    textarea: {
        outline: 'none',
        marginBottom: '4%',
        borderRadius: '5px'
    },
    replies: {
        display: 'flex',
        flexDirection: 'column'
    },
    relyButton: {
        display: 'flex',
        width: '50%',
        marginLeft: '25%'
    },
    editForm: {
        display: 'flex',
        flexDirection: 'column',
        width: '50%'
    },
    editButtons: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center'
    },
    editButton: {
        width: '50%',
        marginBottom: '2%',
        marginTop: '2%'
    },
    field: {
        display: 'flex',
        margin: '3% 0 3%'
    }
}))


const TaskDetail = (props) => {
    const classes = useStyles()
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
        payment: '',
        performer: taskDetail.performer,
        customer: taskDetail.customer
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
        const send_date = new Date().getUTCDate()
        const task = taskDetail.id
        const from_user = localStorage.getItem('id')
        const body = JSON.stringify({ content, send_date, from_user, task })

        axios.post('http://localhost:8000/api/tasks/reply/create', body, config).then(response => {
            console.log('Success reply post')
            console.log(response)
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
            const slug = props.match ? props.match.params.slug : props.slug
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
                console.log(customer)
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
    console.log(taskDetail.description)
    return (
        <div className={classes.root}>
            <div className={classes.customer}>
                <InputLabel className={classes.customerLabel}>{customer.email}</InputLabel>
                <InputLabel className={classes.customerLabel}>{customer.first_name} {customer.last_name}</InputLabel>
            </div>
            <div className={classes.labels}>
                <InputLabel className={`${classes.label} ${classes.left}`}>
                    Published: {taskDetail.published_date}
                </InputLabel>
                <InputLabel className={`${classes.label} ${classes.right}`}>Deadline: {taskDetail.deadline}</InputLabel>
            </div>
            <Box textAlign='justify'
                 fontWeight='bold'
                 fontSize={18}
                 className={classes.description}>
                {taskDetail.description}
            </Box>
            <div className={classes.labels}>
                <InputLabel className={classes.label}>Status: {taskDetail.status}</InputLabel>
                <InputLabel className={classes.label}>Payment: {taskDetail.payment}</InputLabel>
            </div>
            {
                customer.email === localStorage.getItem('email') ? (
                    <Button className={classes.editButton}
                            variant='contained'
                            color='primary'
                            onClick={event => handleEditButton(event)}>Edit</Button>
                ) : null
            }
            {
                isEditable ? (
                    <form className={classes.editForm} onSubmit={event => handleEditDeleteTask(event)}>
                        <TextField className={classes.field}
                                   placeholder='title'
                                   name='title'
                                   value={title}
                                   onChange={event => onEditFormChange(event)}/>
                        <TextareaAutosize className={classes.textarea}
                                          rows={10}
                                          placeholder='description'
                                          name='description'
                                          value={description}
                                          onChange={event => onEditFormChange(event)}/>
                        <TextField className={classes.field}
                                   placeholder='payment'
                                   name='payment'
                                   value={payment}
                                   onChange={event => onEditFormChange(event)}/>
                        <TextField className={classes.field}
                                   placeholder='deadline'
                                   name='deadline'
                                   value={deadline}
                                   onChange={event => onEditFormChange(event)}/>
                        <div className={classes.editButtons}>
                            <Button variant='contained'
                                    color='primary'
                                    className={classes.editButton}
                                    type='submit'
                                    onClick={event => setSubmitType('update')}>
                            Update
                            </Button>
                            <Button variant='contained'
                                    color='secondary'
                                    className={classes.editButton}
                                    type='submit'
                                    onClick={event => setSubmitType('delete')}>
                            Delete
                            </Button>
                        </div>
                    </form>
                ) : null
            }
            {
                localStorage.getItem('email') === customer.email ||
                (taskDetail.performer && taskDetail.performer.email === localStorage.getItem('email')) ? null : (
                    <form className={classes.form} onSubmit={event => onSubmit(event)}>
                        <TextareaAutosize rows={10}
                                          className={classes.textarea}
                                          placeholder='type your reply'
                                          name='content'
                                          value={content}
                                          onChange={event => onChange(event)}/>
                        <Button variant='contained'
                                color='primary'
                                type='submit'
                                className={classes.relyButton}>
                            Send
                        </Button>
                    </form>
                )
            }
            <div className={classes.replies}>
                {displayReplies()}
            </div>
        </div>

    )
}

export default TaskDetail
