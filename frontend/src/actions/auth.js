import axios from "axios";
import { toast } from "react-toastify";
import {
    SIGN_IN_SUCCESS,
    SIGN_IN_FAIL,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAIL,
    LOGOUT
} from "./types";


export const signIn = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ email, password })
    try {
        const response = await axios.post('http://localhost:8000/api/accounts/signin', body, config)
        dispatch({
            type: SIGN_IN_SUCCESS,
            payload: response.data
        })
        toast.success('Successfully Sign In')
    } catch (error) {
        dispatch({
            type: SIGN_IN_FAIL
        })
        toast.error('Sign In Error')
    }
}


export const signUp = ({ email, phone, first_name, last_name, password, password2 }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ email, phone, first_name, last_name, password, password2 })
    try {
        const response = await axios.post('http://localhost:8000/api/accounts/signup', body, config)
        dispatch({
            type: SIGN_UP_SUCCESS,
            payload: response.data
        })
        console.log(response.data)
        dispatch(signIn(email, password))
    } catch (error) {
        dispatch({
            type: SIGN_UP_FAIL
        })
        toast.error('Sign Up Error')
    }
}


export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    })
}
