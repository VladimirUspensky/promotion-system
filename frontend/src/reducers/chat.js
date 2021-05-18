import {
    GET_CHATS_SUCCESS,
    GET_CHATS_FAIL,
    ADD_MESSAGE,
    SET_MESSAGES
} from "../../../../promotion_system/frontend/src/actions/types";


const initialState = {
    members: [],
    messages: []
}


export default function (state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case GET_CHATS_SUCCESS:
            return {
                ...state,
                members: payload.members,
                messages: payload.messages
            }
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, payload]
            }
        case SET_MESSAGES:
            return {
                ...state,
                messages: payload.reverse()
            }

        default: return state
    }
}

