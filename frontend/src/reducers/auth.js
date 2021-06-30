import {
    SIGN_IN_SUCCESS,
    SIGN_IN_FAIL,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAIL,
    LOGOUT
} from "../actions/types";


const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
}

const auth = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case SIGN_IN_SUCCESS:
            localStorage.setItem('token', payload.access)
            localStorage.setItem('id', payload.user.id)
            localStorage.setItem('email', payload.user.email)
            localStorage.setItem('phone', payload.user.phone)
            localStorage.setItem('first_name', payload.user.first_name)
            localStorage.setItem('last_name', payload.user.last_name)
            return {
                ...state,
                token: payload.access,
                isAuthenticated: true
            }
        case SIGN_UP_SUCCESS:
            return {
                ...state,
                isAuthenticated: false
            }
        case SIGN_UP_FAIL:
        case SIGN_IN_FAIL:
        case LOGOUT:
            localStorage.clear()
            return {
                ...state,
                isAuthenticated: false,
                token: null
            }
        default: return state
    }
}

export default auth
