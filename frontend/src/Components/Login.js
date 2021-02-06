import React from 'react'
import './Login.css'
import axios from "axios";
import {Link} from 'react-router-dom';
import {FaFacebookSquare, FaInstagram, FaYoutube} from 'react-icons/fa'

//
// class Login2 extends React.Component {
//
//     constructor(props) {
//         super(props);
//         this.handleSubmit = this.handleSubmit.bind(this)
//         this.handleUsernameChange = this.handleUsernameChange.bind(this)
//         this.handlePasswordChange = this.handlePasswordChange.bind(this)
//         this.getCookie = this.getCookie.bind(this)
//         this.state = {
//             username: '',
//             password: ''
//         }
//     }
//
//     getCookie(name) {
//         let cookieValue = null;
//         if (document.cookie && document.cookie !== '') {
//             let cookies = document.cookie.split(';');
//             for (let i = 0; i < cookies.length; i++) {
//                 let cookie = cookies[i].trim();
//                 // Does this cookie string begin with the name we want?
//                 if (cookie.substring(0, name.length + 1) === (name + '=')) {
//                     cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                     break;
//                 }
//             }
//     }
//     return cookieValue;
// }
//
//
//     handleSubmit(event) {
//         let csrftoken = this.getCookie('csrftoken')
//         const headers = {
//             'csrftoken': csrftoken,
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         }
//         event.preventDefault()
//         console.log(headers)
//         console.log('SUBMIT')
//         console.log(this.state.username)
//         console.log(this.state.password)
//         axios.post('/login/', {
//             username: this.state.username,
//             password: this.state.password
//         }, {headers: headers}).then(r => {console.log(r)})
//     }
//
//     handleUsernameChange(event) {
//         console.log('USERNAME', this)
//         this.setState({username: event.target.value})
//     }
//
//     handlePasswordChange(event) {
//         console.log('PASSWORD', this)
//         this.setState({password: event.target.value})
//     }
//
//     render() {
//         return (
//             <div>
//                 <form onSubmit={this.handleSubmit} className='login-form'>
//                     <input className='field' type='text' placeholder='username'
//                            value={this.state.username}
//                            onChange={this.handleUsernameChange}/>
//                     <input className='field' type='text' placeholder='password'
//                            value={this.state.password}
//                            onChange={this.handlePasswordChange}/>
//                     <Link to='/me' className='login-btn'>Submit</Link>
//                 </form>
//             </div>
//         )
//     }
// }


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handleSubmitForm = this.handleSubmitForm.bind(this)
        this.getCookie = this.getCookie.bind(this)
    }

    handleUsernameChange(e) {
        this.setState({username: e.target.value})
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value})
    }

    handleSubmitForm(e) {
        const csrftoken = this.getCookie('csrftoken')
        e.preventDefault()
        axios.post('/login/', {
            username: this.state.username,
            password: this.state.password,
        }, {
            headers: {
                'csrftoken': csrftoken,
                'Accept': 'application/json',
                'Content-Type': 'application/jso n',
            }
        }).then(r => {}) // TODO if sth went wrong -> notify the user
    }

    getCookie(cookieName) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            let allCookies = document.cookie.split(';');
            for (let i = 0; i < allCookies.length; i++) {
                let cookie = allCookies[i].trim();
                if (cookie.substring(0, cookieName.length + 1) === (cookieName + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(cookieName.length + 1));
                    break;
                }
            }
    }
    return cookieValue;
}

    render() {
        return (
            <div>
                <form className='login-form' onSubmit={this.handleSubmitForm}>
                    <div className='additional-info'>
                        <span className='login-main-label'>Promotion System</span>
                        <div className='icons-block'>
                            <FaInstagram className='fa-3x' style={{ fontSize: 30}}/> &nbsp;
                            <FaYoutube className='fa-3x' style={{ fontSize: 30 }}/> &nbsp;
                            <FaFacebookSquare className='fa-3x' style={{ fontSize: 30 }}/>
                        </div>
                    </div>
                    <div className='form-input-area'>
                        <div className='form-fields'>
                            <input className='login-field' type='text' placeholder='username'
                                value={this.state.username} onChange={this.handleUsernameChange}/>
                            <input className='login-field' type='text' placeholder='password'
                                value={this.state.password} onChange={this.handlePasswordChange}/>
                        </div>
                        <Link to='/home' className='login-btn'>Login</Link>
                    </div>
                </form>
            </div>
        )
    }

}



export default Login
