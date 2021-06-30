import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { signUp } from "../../actions/auth";
import {connect} from "react-redux";
import "react-toastify/dist/ReactToastify.css"
import {Button, makeStyles, TextField, Typography} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        gridArea: 'content',
        height: '80%',
        width: '30%',
        padding: '3%',
        justifyContent: 'center',
        marginLeft: '30%',
        marginTop: '10%',
        backgroundColor: 'white',
        border: '1px solid blue',
        boxShadow: '0 0 10px'
    },
    inputs: {
        display: 'flex',
        flexDirection: 'column'
    },
    input: {
        margin: '2%'
    },
    button: {
        display: 'flex',
        marginTop: '5%',
        width: '30%',
        marginLeft: '37%'
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        fontWeight: 'bold'
    }
}))


const SignUp = ({ signUp, isAuthenticated }) => {
    const classes = useStyles()
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        first_name: '',
        last_name: '',
        password: '',
        password2: ''
    })
    const { email, phone, first_name, last_name, password, password2 } = formData
    const onChange = event => setFormData({...formData, [event.target.name]: event.target.value})
    const onSubmit = event => {
        event.preventDefault()
        signUp({ email, phone, first_name, last_name, password, password2 })
    }
    if (isAuthenticated) {
        return <Redirect to='/' />
    }

    return (
        <form className={classes.root} onSubmit={event => onSubmit(event)}>
            <Typography variant='h5' component='h5' className={classes.title}>Sign Up</Typography>
            <div className={classes.inputs}>
                <TextField className={classes.input}
                       placeholder="email"
                       name='email'
                       value={email}
                       onChange={event => onChange(event)}/>
                <TextField className={classes.input}
                       placeholder="phone"
                       name='phone'
                       value={phone}
                       onChange={event => onChange(event)}/>
                <TextField className={classes.input}
                       placeholder="first name"
                       name='first_name'
                       value={first_name}
                        onChange={event => onChange(event)}/>
                <TextField className={classes.input}
                       placeholder="last name"
                       name='last_name'
                       value={last_name}
                       onChange={event => onChange(event)}/>
                <TextField className={classes.input}
                       placeholder="password"
                       name='password'
                       value={password}
                       onChange={event => onChange(event)}/>
                <TextField className={classes.input}
                       placeholder="confirm password"
                       name='password2'
                       value={password2}
                       onChange={event => onChange(event)}/>
            </div>
            <Button type="submit" className={classes.button} variant='contained' color='primary'>Sign Up</Button>
        </form>
    )
}

SignUp.propTypes = {
    signUp: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { signUp })(SignUp)
