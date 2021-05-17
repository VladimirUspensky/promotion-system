import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { signUp } from "../actions/auth";
import {connect} from "react-redux";
import "react-toastify/dist/ReactToastify.css"

const SignUp = ({ signUp, isAuthenticated }) => {
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
        <form className="signup__form" onSubmit={event => onSubmit(event)}>
            <div className="signup__input__block">
                <input className="signup__email__input"
                       placeholder="email"
                       name='email'
                       value={email}
                       onChange={event => onChange(event)}/>
                <input className="signup__phone__input"
                       placeholder="phone"
                       name='phone'
                       value={phone}
                       onChange={event => onChange(event)}/>
                <input className="signup__firstname__input"
                       placeholder="first name"
                       name='first_name'
                       value={first_name}
                        onChange={event => onChange(event)}/>
                <input className="signup__lastname__input"
                       placeholder="last name"
                       name='last_name'
                       value={last_name}
                       onChange={event => onChange(event)}/>
                <input className="signup__password__input"
                       placeholder="password"
                       name='password'
                       value={password}
                       onChange={event => onChange(event)}/>
                <input className="signup__password2__input"
                       placeholder="confirm password"
                       name='password2'
                       value={password2}
                       onChange={event => onChange(event)}/>
            </div>
            <button type="submit" className="signup__button">Sign Up</button>
        </form>
        // <Form onSubmit={event => onSubmit(event)}>
        //     <div className="col-lg">
        //         <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
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
        //                    placeholder="phone"
        //                    name="phone"
        //                    value={phone}
        //                    onChange={event => onChange(event)}/>
        //         </div>
        //         <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
        //             <input type="text"
        //                    className="form-control"
        //                    placeholder="first name"
        //                    name="first_name"
        //                    value={first_name}
        //                    onChange={event => onChange(event)}/>
        //         </div>
        //          <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
        //             <input type="text"
        //                    className="form-control"
        //                    placeholder="last name"
        //                    name="last_name"
        //                    value={last_name}
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
        //          <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
        //             <input type="text"
        //                    className="form-control"
        //                    placeholder="confirm password"
        //                    name="password2"
        //                    value={password2}
        //                    onChange={event => onChange(event)}/>
        //         </div>
        //     </div>
        //
        //     <Button variant="primary" type="submit">
        //         Sign Up
        //     </Button>
        //     <ToastContainer />
        // </Form>
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
