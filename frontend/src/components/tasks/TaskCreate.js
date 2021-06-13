import React, {useState} from "react";
import "./TaskCreate.css"
import axios from "axios";
import {makeStyles} from "@material-ui/core/styles";
import {Button, TextareaAutosize, TextField} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        gridArea: 'content',
        width: '100%',
        marginTop: '2%',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '90%',
        marginLeft: '2%'
    },
    inputs: {
        display: 'flex',
        marginTop: '2%',
        marginBottom: '2%'
    },
    input: {
        width: '100%',
        marginBottom: '2%'
    },
    left: {

    },
    right: {

    },
    button: {
        width: '20%',
        marginLeft: '40%'
    },
    textarea: {
        borderRadius: '5px',
        outline: 'none'
    }

}))


const TaskCreate = () => {
    const classes = useStyles()
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
        <div className={classes.root}>
            {/*<div className="task__create__header">*/}
            {/*    <div className="task__create__header__title">*/}
            {/*        Create New Task*/}
            {/*    </div>*/}
            {/*</div>*/}

            <form className={classes.form} onSubmit={event => onSubmit(event)}>
                <TextField className={classes.input}
                           label="title"
                           name='title'
                           value={title}
                           onChange={event => onChange(event)}/>
                <TextareaAutosize className={classes.textarea}
                                  rows={20}
                                  placeholder="description"
                                  name='description'
                                  value={description}
                                  onChange={event => onChange(event)}/>
                <div className={classes.inputs}>
                    <TextField className={classes.input}
                               variant='outlined'
                               label="deadline"
                               name='deadline'
                               value={deadline}
                               onChange={event => onChange(event)}/>
                    <TextField className={classes.input}
                               variant='outlined'
                               label="payment"
                               name='payment'
                               value={payment}
                               onChange={event => onChange(event)}/>
                </div>
                <Button variant='contained'
                        color='primary'
                        type="submit"
                        className={classes.button}>
                    Create New Task
                </Button>
            </form>
        </div>
    )
}

export default TaskCreate
