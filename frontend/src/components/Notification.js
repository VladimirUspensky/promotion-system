import React from "react";
import "./Notification.css"


const Notification = ({ task, from_user, send_date, status, content }) => {

    return (
        <div className='notification'>
            {
                //TODO if status is CHECKED make it less light
            }
            <label className='notification__title'>New</label>
            <label className='notification__date'>{send_date}</label>
            <text className='notification__task__title'>{task.title}</text>
            <label className='notification__from'>
                {from_user.email} {from_user.first_name} {from_user.last_name}
            </label>

        </div>
    )
}

export default Notification
