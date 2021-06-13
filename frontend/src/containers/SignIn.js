import React, {useState} from "react";
import { signIn } from "../actions/auth"
import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import "./SignIn.css"
import {Button, makeStyles, TextField, Typography} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '80%',
        width: '30%',
        padding: '3%',
        marginLeft: '30%',
        marginTop: '10%',
        gridArea: 'content',
        backgroundColor: 'white',
        border: '1px solid blue',
        boxShadow: '0 0 10px'
    },
    inputs: {
        padding: '3%',
        width: '100%'
    },
    input: {
        padding: '3%',
        margin: '3%',
        width: '100%'
    },
    title: {
        display: 'flex',
        fontWeight: 'bold',
        justifyContent: 'center'
    },
    button: {
        marginTop: '5%',
        width: '30%',
        marginLeft: '38%'
    }
}))


const SignIn = ({ signIn, isAuthenticated }) => {
    const classes = useStyles()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    if (isAuthenticated) {
        return <Redirect to='/'/>
    }
    const {email, password} = formData
    const onChange = event => setFormData({ ...formData, [event.target.name]: event.target.value })
    const onSubmit = event => {
        event.preventDefault()
        signIn(email, password)
    }

    return (
        <form className={classes.root} onSubmit={event => onSubmit(event)}>
            <Typography variant='h5' component='h5' className={classes.title}>Sign In</Typography>
            <div className={classes.inputs}>
                <TextField className={classes.input}
                       placeholder="email"
                       name='email'
                       value={email} onChange={event => onChange(event)}/>
                <TextField className={classes.input}
                       placeholder="password"
                       name='password'
                       value={password} onChange={event => onChange(event)}/>
            </div>
            <Button type="submit" className={classes.button} variant='contained' color='primary'>Login</Button>
        </form>
    )
}

signIn.propTypes = {
    signIn: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { signIn })(SignIn)
