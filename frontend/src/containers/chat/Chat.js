import React, {Component, useEffect, useState} from "react";
import { useParams } from "react-router-dom"
import { MDBCard, MDBCardBody, MDBRow, MDBCol, MDBListGroup, MDBListGroupItem, MDBBadge, MDBIcon, MDBBtn }
    from "mdbreact";
import "./Chat.css"
import axios from "axios";
import WebSocketInstance from "./websocket";


const data = {
friends: [
{
name: "John Doe",
avatar: "https://mdbootstrap.com/img/Photos/Avatars/avatar-8",
message: "Hello, Are you there?",
when: "Just now",
toRespond: 1,
seen: false,
active: true
},
{
name: "Danny Smith",
message: "Lorem ipsum dolor sit",
avatar: "https://mdbootstrap.com/img/Photos/Avatars/avatar-1",
when: "5 min ago",
toRespond: 0,
seen: false,
active: false
},
{
name: "Alex Steward",
message: "Lorem ipsum dolor sit",
avatar: "https://mdbootstrap.com/img/Photos/Avatars/avatar-2",
when: "Yesterday",
toRespond: 0,
seen: false,
active: false
},
{
name: "Ashley Olsen",
message: "Lorem ipsum dolor sit",
avatar: "https://mdbootstrap.com/img/Photos/Avatars/avatar-3",
when: "Yesterday",
toRespond: 0,
seen: false,
active: false
},
{
name: "Kate Moss",
message: "Lorem ipsum dolor sit",
avatar: "https://mdbootstrap.com/img/Photos/Avatars/avatar-4",
when: "Yesterday",
toRespond: 0,
seen: true,
active: false
},
{
name: "Lara Croft",
message: "Lorem ipsum dolor sit",
avatar: "https://mdbootstrap.com/img/Photos/Avatars/avatar-5",
when: "Yesterday",
toRespond: 0,
seen: false,
active: false
},
{
name: "Brad Pitt",
message: "Lorem ipsum dolor sit",
avatar: "https://mdbootstrap.com/img/Photos/Avatars/avatar-6",
when: "5 min ago",
toRespond: 0,
seen: true,
active: false
},
{
name: "Ken Ditto",
avatar: "https://mdbootstrap.com/img/Photos/Avatars/img(3).jpg",
message: "Hello, Are you there?",
when: "Yesterday",
toRespond: 0,
seen: false,
active: false
},
{
name: "Marta Wozniak",
message: "Lorem ipsum dolor sit.",
avatar: "https://mdbootstrap.com/img/Photos/Avatars/img(2).jpg",
when: "5 min ago",
toRespond: 0,
seen: false,
active: false
}
],
messages: [
{
author: "Brad Pitt",
avatar: "https://mdbootstrap.com/img/Photos/Avatars/avatar-6",
when: "12 mins ago",
message:
"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore"
},
{
author: "Lara Croft",
avatar: "https://mdbootstrap.com/img/Photos/Avatars/avatar-5",
when: "13 mins ago",
message:
" Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
},
{
author: "Brad Pitt",
avatar: "https://mdbootstrap.com/img/Photos/Avatars/avatar-6",
when: "14 mins ago",
message:
"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore"
},
{
author: "Lara Croft",
avatar: "https://mdbootstrap.com/img/Photos/Avatars/avatar-5",
when: "16 mins ago",
message:
" Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
},
{
author: "Brad Pitt",
avatar: "https://mdbootstrap.com/img/Photos/Avatars/avatar-6",
when: "17 mins ago",
message:
"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore"
}
]
}


class Chat3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

}



const Chat2 = ({ setChats, messages, members }) => {
    const [message, setMessage] = useState('')
    const { id } = useParams()
    const email = localStorage.getItem('email')
    const token = localStorage.getItem('token')
    useEffect(() => {
        setChats(email, token)
    }, [id])

    const renderMessages = messages => {
        return (
            <MDBListGroup className="list-unstyled pl-3 pr-3">
                {messages.map(message => (
                    <Message2 key={message.from_user.id + message.send_date}
                              first_name={message.from_user.first_name}
                              last_name={message.from_user.last_name}
                              send_date={message.send_date}
                              content={message.content}
                    />
                    //<Message key={message.from_user + message.send_date} message={message} />
                ))}
            </MDBListGroup>
        )
    }

    const sendMessageHandler = event => {
        event.preventDefault()
        const messageObj = {
            from_user: email,
            content: message,

        }
    }

    return (
        <div>

        </div>
    )
}


const Message2 = ({ first_name, last_name, send_date, content }) => {
    return (
        <li className="chat-message d-flex justify-content-between mb-4">
            <MDBCard>
              <MDBCardBody>
                <div>
                  <strong className="primary-font">{first_name} {last_name}</strong>
                  <small className="pull-right text-muted">
                    <i className="far fa-clock" /> {send_date}
                  </small>
                </div>
                <hr />
                <p className="mb-0">{content}</p>
              </MDBCardBody>
            </MDBCard>
        </li>
    )
}




const Chat = () => {
    //const data = props

    return (
        <MDBCard className="grey lighten-3 chat-room">
        <MDBCardBody>
             <MDBRow className="px-lg-2 px-2">
                 <MDBCol md="6" xl="4" className="px-0 mb-4 mb-md-0 scrollable-friends-list">
                    <h6 className="font-weight-bold mb-3 text-lg-left">Member</h6>
                      <div className="white z-depth-1 p-3">
                        <MDBListGroup className="friend-list">
                          {data.friends.map(friend => (
                          <User key={friend.name} friend={friend} />
                          ))}
                        </MDBListGroup>
                      </div>
                 </MDBCol>
                 <MDBCol md="6" xl="8" className="pl-md-3 mt-4 mt-md-0 px-lg-auto">
                    <div className="scrollable-chat">

                        <MDBListGroup className="list-unstyled pl-3 pr-3">
                          {data.messages.map(message => (
                          <Message key={message.author + message.when} message={message} />
                          ))}
                        </MDBListGroup>

                    </div>
                     <div className="form-group basic-textarea">
                         <textarea className="form-control pl-2 my-0" id="exampleFormControlTextarea2" rows="3"
                            placeholder="Type your message here..." />
                    {/*    <MDBBtn*/}
                    {/*          color="info"*/}
                    {/*          rounded*/}
                    {/*          size="sm"*/}
                    {/*          className="float-right mt-4"*/}
                    {/*    >*/}
                    {/*        Send*/}
                    {/*</MDBBtn>*/}
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
      </MDBCard>
    )
}





const Message = ({ message: { author, avatar, when: send_date, message } }) => {
    return (
        <li className="chat-message d-flex justify-content-between mb-4">

    <MDBCard>
      <MDBCardBody>
        <div>
          <strong className="primary-font">{author}</strong>
          <small className="pull-right text-muted">
            <i className="far fa-clock" /> {send_date}
          </small>
        </div>
        <hr />
        <p className="mb-0">{message}</p>
      </MDBCardBody>
    </MDBCard>
  </li>
    )
}


const User = ({friend: { name, avatar, message, when, toRespond, seen, active }
}) => {
    return (
        <MDBListGroupItem
    href="#!"
    className="d-flex justify-content-between p-2 border-light"
    style={{ backgroundColor: active ? "#eeeeee" : "" }}
  >

    <div style={{ fontSize: "0.95rem" }}>
      <strong>{name}</strong>
      <p className="text-muted">{message}</p>
    </div>
    <div>
      <p className="text-muted mb-0" style={{ fontSize: "0.75rem" }}>
        {when}
      </p>
      {seen ? (
        <span className="text-muted float-right">
          <MDBIcon className="fa-check" aria-hidden="true" />
        </span>
      ) : toRespond ? (
        <MDBBadge color="danger" className="float-right">
          {toRespond}
        </MDBBadge>
      ) : (
        <span className="text-muted float-right">
          <MDBIcon icon="reply" aria-hidden="true" />
        </span>
      )}
    </div>
  </MDBListGroupItem>
    )
}

export default Chat

