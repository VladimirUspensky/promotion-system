import axios from "axios";
import {
    ADD_MESSAGE,
    SET_MESSAGES,
    GET_CHATS_SUCCESS,
    GET_CHATS_FAIL
} from "./types";


export const setChats = (email, access_token) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        }
    }
    try {
        const response = await axios.get(`http://localhost:8000/api/chat/?email=${email}`, config)
        dispatch({
            type: GET_CHATS_SUCCESS,
            payload: response.data.results
        })
    } catch (error) {
        dispatch({
            type: GET_CHATS_FAIL
        })
    }
}

export const setMessages = messages => {
    return {
        type: SET_MESSAGES,
        payload: messages
    }
}

export const addMessage = message => async dispatch => {
    dispatch({
        type: ADD_MESSAGE,
        payload: message
    })
}

