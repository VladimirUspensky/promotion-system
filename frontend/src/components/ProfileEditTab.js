import React, {useEffect, useState} from "react";
import axios from "axios";
import "./ProfileTabs.css"
import "./ProfileEditTab.css"
import {makeStyles} from "@material-ui/core/styles";
import {Button, TextField} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '10%',
        marginLeft: '5%',
        width: '70%'
    },
    editName: {
        display: 'flex',
        flexDirection: 'row'
    },
    nameInput: {
        margin: '2% 0 2%',
        width: '100%'
    },
    input: {
        margin: '2% 0 2%'
    },
    button: {
        width: '30%',
        marginLeft: '35%'
    }
}))


const ProfileEditTab = () => {
    const classes = useStyles()
    const [profile, setProfile] = useState({
        email: '',
        phone: '',
        first_name: '',
        last_name: '',
        password: ''
    })

    useEffect(() => {
        const fetchProfileDetail = () => {
            axios.get(`http://localhost:8000/api/accounts/${userEmail}`, config).then(response => {
                setProfile(response.data)
                console.log(response.data)
                console.log('Profile received successfully')
            }).catch(error => {
                console.log('Profile received fail')
            })
        }
        fetchProfileDetail()
    }, [])
     const { email, phone, first_name, last_name, password } = profile
     const config = {
         headers: {
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${localStorage.getItem('token')}`
         }
     }
     const userEmail = localStorage.getItem('email')

     const onChange = event => setProfile({...profile, [event.target.name]: event.target.value})

     const clear = obj => {
        Object.entries(obj).forEach(([key, value]) => {
            if (value === "") {
                delete obj[key]
            }
            if (key === 'phone' && value.substr(0, 0) === '8') {
                obj.phone = '+7' + value.substr(2)
            }
        })
    }

    const onSubmit = event => {
        event.preventDefault()
        clear(profile)
        const body = JSON.stringify(profile)
        axios.put(`http://localhost:8000/api/accounts/update/${userEmail}`, body, config).then(response => {
            console.log('Profile updated successfully')
            setProfile(response.data)
        }).catch(error => {
            console.log('Profile updated fail')
        })
    }

    return (
        <div>
            <form className={classes.root} onSubmit={event => onSubmit(event)}>
                {/*<div className="avatar">*/}
                {/*    <img src=""/>*/}
                {/*</div>*/}
                <div className={classes.editName}>
                    <TextField className={classes.nameInput}
                               variant='outlined'
                               label="First Name"
                               name='first_name'
                               placeholder={first_name}
                               value={first_name}
                               onChange={event => onChange(event)}/>
                    <TextField className={classes.nameInput}
                               name='last_name'
                               value={last_name}
                               placeholder={last_name}
                               variant='outlined'
                               label='Last Name'
                               onChange={event => onChange(event)}/>
                </div>
                <TextField className={classes.input}
                           name='email'
                           variant='outlined'
                           label='Email'
                           placeholder={email}
                           value={email}
                           onChange={event => onChange(event)}/>
                <TextField className={classes.input}
                           variant='outlined'
                           label='Phone'
                           placeholder={phone}
                           name='phone'
                           value={phone}
                           onChange={event => onChange(event)}/>
                <TextField className={classes.input}
                           variant='outlined'
                           label='Password'
                           type="password"
                           name='password'
                           value={password}
                           onChange={event => onChange(event)}/>
                <Button className={classes.button} variant='contained' color='primary' type='submit'>Save</Button>
            </form>
        </div>
    )
}

export default ProfileEditTab
