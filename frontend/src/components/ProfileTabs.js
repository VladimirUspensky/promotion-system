import React, {useEffect, useState} from "react";
import Stats from "./stats/Stats";
import "./ProfileTabs.css"
import axios from "axios";
import ProfileEditTab from "./ProfileEditTab";



const ChatTab = () => {

    return (
        <div>
            Chat
        </div>
    )
}


const ProfileTabs = () => {
    const [active, setActive] = useState('editProfile')

    return (
        <div className="profile">
            <div className="profile__header">
                <div className="header__title">
                    My Profile
                </div>
            </div>
            <div className='profile__tabs'>
                <div className={active === 'editProfile' ? 'profile__tab' : 'profile__tab'}
                     onClick={() => setActive('editProfile')}>
                    Edit Profile
                </div>
                <div className={active === 'stats' ? 'profile__tab' : 'profile__tab'}
                     onClick={() => setActive('stats')}>
                    Stats
                </div>
                <div className={active === 'chats' ? 'profile__tab' : 'profile__tab'}
                     onClick={() => setActive('chats')}>
                    Chats
                </div>
            </div>
            <div className='profile__tabs__content'>
                    <div className={active === 'editProfile' ? 'tab__content active__tab__content' : 'tab__content'}>
                        <ProfileEditTab />
                    </div>
                    <div className={active === 'stats' ? 'tab__content active__tab__content' : 'tab__content'}>
                        <Stats />
                    </div>
                    <div className={active === 'chats' ? 'tab__content active__tab__content' : 'tab__content'}>
                        <ChatTab />
                    </div>
            </div>
        </div>
    )
}


export default ProfileTabs
