import React, {useEffect, useState} from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import axios from "axios";
import {Button, InputLabel, makeStyles, Tab, TextareaAutosize, TextField} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        gridArea: 'content',
        flexDirection: 'row',
        height: '100vh',
        width: '70%',
    },
    message: {
        border: '2px solid',
        borderRadius: '9px',
        margin: '5px',
        padding: '10px',

        width: '50%'
    },
    right: {
        display: 'flex',
        justifyContent: 'flex-end',
        backgroundColor: 'grey',
        color: 'black'
    },
    left: {
        display: 'flex',
        justifyContent: 'flex-start',
        backgroundColor: 'blue',
        color: 'white'
    },
    senderData: {
        display: 'flex',
        flexDirection: 'row',
    },
    label: {
        margin: '0 2% 0',
        color: 'inherit'
    },
    tabs: {
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid',
    },
    tab: {
        display: 'flex',
        width: '100%',
        borderBottom: '1px solid'
    },
    chatBody: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        marginLeft: '10%'
    },
    paper: {
        display: 'flex',
        flexDirection: 'column'
    },
    messages: {
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid',
        marginTop: '2%',
        borderRadius: '7px'
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: '35%'
    },
    button: {
        width: '20%',
        margin: '2%'
    },
    textarea: {
        margin: '3% 0 3%',
        borderRadius: '5px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    header: {
        display: 'flex',
        padding: '4%',
        border: '2px solid rgba(0,0,0,.1)',
        boxShadow: '0 3px 10px -2px #404040',
        backgroundColor: '#fff'
    },
    title: {
        fontWeight: 'bold',
        fontSize: '27px',
        color: '#404040',
    }


}))

const Message = ({ first_name, last_name, email, content }) => {
    const classes = useStyles()
    console.log(email)
    return (
        <div
            className={`${classes.message} ${localStorage.getItem('email') === email ? classes.right : classes.left}`}>
            {content}
        </div>
    )
}



const ChatContent = ({chat, active}) => {
    const classes = useStyles()
    const companion = localStorage.getItem('id') === chat.creator.id ? chat.second_member : chat.creator
    const [history, setHistory] = useState([])
    const [newMessage, setNewMessage] = useState({
        from_user: localStorage.getItem('id') !== chat.creator.id ? chat.creator : chat.second_member,
        to_user: localStorage.getItem('id') !== chat.creator.id ? chat.second_member : chat.creator,
        content: ''
    })

    const onChange = event => setNewMessage({...newMessage, [event.target.name]: event.target.value})
    const client = new W3CWebSocket('ws://127.0.0.1:8000/ws/chat/' + chat.name + '/')

    const parseHistory = history => {
        let parsedHistory = []
        history.map(message => {
            console.log(message)
            return parsedHistory.push({
                from_user: {
                    first_name: message.from_user.split(' ')[0].replace(/['"]+/g, ' '),
                    last_name: message.from_user.split(' ')[1].replace(/['"]+/g, ' '),
                    email: message.from_user.split(' ')[2].replace(/['"]+/g, ' ')
                },
                to_user: {
                    first_name: message.to_user.split(' ')[0].replace(/['"]+/g, ' '),
                    last_name: message.to_user.split(' ')[1].replace(/['"]+/g, ' '),
                    email: message.to_user.split(' ')[2].replace(/['"]+/g, ' ')
                },
                content: message.content
            })
        })
        return parsedHistory
    }

    useEffect(() => {
        const checkMessages = () => {
            console.log('USEEFFECT')
        client.onopen = () => {
            console.log('Websocket client connected')
        }
        client.onmessage = message => {
            const dataFromServer = JSON.parse(message.data)
            console.log(dataFromServer)
            if (dataFromServer.length > 1) {
                console.log(dataFromServer)
                setHistory(parseHistory(dataFromServer))
                console.log(history)
            } else {
                console.log('Send message')
                setHistory([...history, {
                    from_user: dataFromServer.from_user,
                    to_user: dataFromServer.to_user,
                    content: dataFromServer.content,
                    room_name: chat.name
                }])
            }
            console.log(history)
        }
        }
        checkMessages()

    }, [])

    const fetchHistory = event => {
        event.preventDefault()
        console.log(newMessage.to_user)
        console.log(newMessage.from_user)
        client.send(JSON.stringify({
            'type': 'send_chat_history',
            'from_user': newMessage.from_user,
            'to_user': newMessage.to_user,
            'room_name': chat.name
        }))
        console.log('Get history')
    }

    const sendNewMessage = event => {
        event.preventDefault()
        console.log(newMessage)
        setHistory([...history, newMessage])
        client.send(JSON.stringify({
            'type': 'send_new_message',
            'content': newMessage.content,
            'from_user': newMessage.from_user,
            'to_user': newMessage.to_user,
            'room_name': chat.name
        }))
    }

    const displayMessages = () => {
        let displayedMessages = []
        history.map(message => {
            console.log(message.from_user.first_name)
            return displayedMessages.push(
                <Message first_name={message.from_user.first_name}
                         last_name={message.from_user.last_name}
                         content={message.content}
                         email={message.from_user.email}
                />
            )
        })
        return displayedMessages
    }

    return (
        <>
            {
                active ? (
                    <div className={classes.paper}>
                        <div className={classes.header}>
                            <InputLabel className={classes.title}>
                                {companion.first_name} {companion.last_name}
                            </InputLabel>
                        </div>
                        <div className={classes.messages}>
                            {displayMessages()}
                        </div>
                        <form className={classes.form}>
                            <TextareaAutosize className={classes.textarea}
                                              placeholder='type new message...'
                                              name='content'
                                              rows={20}
                                              value={newMessage.content}
                                              onChange={event => onChange(event)}/>
                            <div className={classes.buttons}>
                                <Button color='primary'
                                        variant='contained'
                                        className={classes.button}
                                        type='submit'
                                        onClick={event => sendNewMessage(event)}>
                                    Send
                                </Button>
                                <Button color='primary'
                                        variant='contained'
                                        className={classes.button}
                                        onClick={event => fetchHistory(event)}>
                                    History
                                </Button>
                            </div>
                        </form>
                    </div>
                ) : null
            }
        </>
    )
}


const Chat = () => {
    const classes = useStyles()
    const [chats, setChats] = useState([])
    const [active, setActive] = useState(0)
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }

    useEffect(() => {
        const fetchChats = () => {
            axios.get('http://localhost:8000/api/chat/', config).then(response => {
                console.log('Get chats successfully')
                setChats(response.data.results)
                console.log(response.data.results)
                console.log(chats)
            }).catch(error => {
                console.log('Fail')
                console.log(error)
            })
        }
        fetchChats()
    }, [])

    const displayTabs = () => {
        let displayedTabs = []
        chats.map(chat => {
            const companion = localStorage.getItem('id') === chat.second_member.id ? chat.creator : chat.second_member
            return displayedTabs.push(
                <Tab className={classes.tab}
                     label={`${companion.first_name} ${companion.last_name}`}
                     onClick={event => setActive(chat.id)}/>
            )
        })
        return displayedTabs
    }


    return (
        <div className={classes.root}>
            <div className={classes.tabs}>
                {displayTabs()}
            </div>
            <div className={classes.chatBody}>
                {
                    chats.map(chat => {
                        console.log(active)
                        console.log(chat.id)
                        console.log(chat.creator)
                        return (
                            <div>
                                {active === chat.id ? <ChatContent chat={chat} active={true}/> : null}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )

}


export default Chat

