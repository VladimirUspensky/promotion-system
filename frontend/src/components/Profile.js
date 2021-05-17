import React, {useEffect, useState} from "react";
import "./Profile.css"
import {Link} from "react-router-dom";
import axios from "axios";


const Profile = () => {
    const [profile, setProfile] = useState({
        email: '',
        phone: '',
        first_name: '',
        last_name: '',
        password: ''
    })
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }
    const userEmail = localStorage.getItem('email')

    useEffect(() => {
        const fetchProfileDetail = () => {
            axios.get(`http://localhost:8000/api/accounts/${userEmail}`, config).then(response => {
                setProfile(response.data)
                console.log(response.data)
                console.log('Profile received successfully')
            }).catch(error => {
                console.log('Profile received fail')
            })
        }
        fetchProfileDetail()
    }, [])

    const { email, phone, first_name, last_name, password } = profile

    const onChange = event => setProfile({...profile, [event.target.name]: event.target.value})
    const clear = obj => {
        Object.entries(obj).forEach(([key, value]) => {
            if (value === "") {
                delete obj[key]
            }
            if (key === 'phone' && value.substr(0, 0) === '8') {
                obj.phone = '+7' + value.substr(2)
            }
        })
    }
    const onSubmit = event => {
        event.preventDefault()
        clear(profile)
        const body = JSON.stringify(profile)
        axios.put(`http://localhost:8000/api/accounts/update/${userEmail}`, body, config).then(response => {
            console.log('Profile updated successfully')
            setProfile(response.data)
        }).catch(error => {
            console.log('Profile updated fail')
        })
    }

    return (
        <div className="profile">
            <div className="profile__header">
                <div className="header__title">
                    My Profile
                </div>
            </div>
            <div className="profile__tabs">
                <div className="profile__tab">
                    <Link className="profile__tab__link" to="#">Edit Profile</Link>
                </div>
                <div className="profile__tab">
                    <Link className="profile__tab__link" to="#">Chats</Link>
                </div>
                <div className="profile__tab">
                    <Link className="profile__tab__link" to="#">Stats</Link>
                </div>
            </div>
            <form className="edit__profile" onSubmit={event => onSubmit(event)}>
                <div className="tab__name">
                    Edit Profile
                </div>
                <div className="avatar">
                    <img src=""/>
                </div>
                <div className="edit__name">
                    <div className="edit__name__block1">
                        <label className="edit__name__label">
                            First Name
                            <input className="edit__name__input"
                                   placeholder={profile.first_name}
                                   name='first_name'
                                   value={first_name}
                                   onChange={event => onChange(event)}/>
                        </label>
                    </div>
                    <div className="edit__name__block2">
                        <label className="edit__name__label">
                            Last Name
                            <input className="edit__name__input"
                                   placeholder={profile.last_name}
                                   name='last_name'
                                   value={last_name}
                                   onChange={event => onChange(event)}/>
                        </label>
                    </div>
                </div>
                <div className="edit__email">
                    <label className="edit__email__label">
                        Edit Email <br/>
                        <input className="edit__email__input"
                               placeholder={profile.email}
                               name='email'
                               value={email}
                               onChange={event => onChange(event)}/>
                    </label>
                </div>
                <div className="edit__phone">
                    <label className="edit__phone__label">
                        Edit Phone <br/>
                        <input className="edit__phone__input"
                               placeholder={profile.phone}
                               name='phone'
                               value={phone}
                               onChange={event => onChange(event)}/>
                    </label>
                </div>
                <div className="edit__password">
                    <label className="edit__password__label">
                        Edit Password <br/>
                        <input className="edit__password__input"
                               type="password"
                               name='password'
                               value={password}
                               placeholder='password'
                               onChange={event => onChange(event)}/>
                    </label>
                </div>
                <div className="profile__save__button__block">
                    <button className="profile__save__button" type='submit'>Save</button>
                </div>
            </form>
        </div>
    )
}

export default Profile


