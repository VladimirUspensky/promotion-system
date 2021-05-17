
class WebSocketService {
    callbacks = {}
    static instance = null
    static getInstance() {
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocketService()
        }
        return WebSocketService.instance
    }

    constructor() {
        this.socketRef = null
    }

    connect() {
        const path = 'ws://127.0.0.1:8000/chat/test'
        this.socketRef = new WebSocket(path)

        this.socketRef.onopen = () => {

        }
        this.socketRef.onclose = () => {
            this.connect()
        }
        this.socketRef.onerror = event => {

        }
        this.socketRef.onmessage = event => {

        }
    }

    socketNewMessage(data) {
        const parsedData = JSON.parse(data)
        const command = parsedData.command
        if (Object.keys(this.callbacks).length === 0) {
            return
        }
        if (command === 'message') {
            this.callbacks[command](parsedData.messages)
        }
        if (command === 'new_message') {
            this.callbacks[command](parsedData.message)
        }
    }

    fetchMessages(email) {
        this.sendMessage({ command: 'fetch_messages', email: email })
    }

    newChatMessage(message) {
        this.sendMessage({ command: 'new_message', from_user: message.from_user, message: message.content })
    }

    addCallbacks(messagesCallback, newMessageCallback) {
        this.callbacks['messages'] = messagesCallback
        this.callbacks['new_message'] = newMessageCallback
    }

    sendMessage(data) {
        try {
            this.socketRef.send(JSON.stringify({ ...data }))
        } catch (error) {
            console.log(error.message)
        }
    }

    state() {
        return this.socketRef.readyState
    }

    waitForSocketConnection(callback) {
        const socket = this.socketRef
        const recursion = this.waitForSocketConnection
        setTimeout(
            function () {
                    if (socket.readyState === 1) {
                        console.log('connection is secure')
                        if (callback !== null) {
                            callback()
                        }
                        return
                    } else {
                        console.log('waiting for connection')
                        recursion(callback)
                    }
            }, 1
        )
    }
}

const WebSocketInstance = WebSocketService.getInstance()

export default WebSocketInstance
