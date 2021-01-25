import React from 'react'

import './CreateTask.css'


function CreateTask() {


    return (
        <div className='create-task-block'>
           <ul className='create-task-list'>
               <input className='task-field' placeholder='лайки'/>
               <input className='task-field' placeholder='подписки'/>
               <input className='task-field' placeholder='отписки'/>
               <input className='task-field' placeholder='сообщения'/>
               <input className='task-field' placeholder='комментарии'/>
               <input className='task-field' placeholder='сторис'/>
               <textarea className='accounts-input-area' placeholder='аккаунты для сбора аудитории'/>
               <button className='create-task-btn'>Создать задачу</button>
           </ul>
        </div>
    )
}

export default CreateTask


