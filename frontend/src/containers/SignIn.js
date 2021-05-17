import React, {useState} from "react";
import { signIn } from "../actions/auth"
import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import "./SignIn.css"


const SignIn = ({ signIn, isAuthenticated }) => {
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
        <form className="login__form" onSubmit={event => onSubmit(event)}>
            <div className="login__input__block">
                <input className="login__email__input"
                       placeholder="email"
                       name='email'
                       value={email}
                        onChange={event => onChange(event)}/>
                <input className="login__password__input"
                       placeholder="password"
                       name='password'
                       value={password}
                        onChange={event => onChange(event)}/>
            </div>
            <button type="submit" className="login__button">Login</button>
        </form>
        // <Form onSubmit={event => onSubmit(event)}>
        //     <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
        //             <input type="text"
        //                    className="form-control"
        //                    placeholder="email"
        //                    name="email"
        //                    value={email}
        //                    onChange={event => onChange(event)}/>
        //         </div>
        //         <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
        //             <input type="text"
        //                    className="form-control"
        //                    placeholder="password"
        //                    name="password"
        //                    value={password}
        //                    onChange={event => onChange(event)}/>
        //         </div>
        //     <Button variant="primary" type="submit">
        //         Sign In
        //     </Button>
        //     <ToastContainer />
        // </Form>
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
