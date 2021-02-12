import React from 'react'

import './InstagramTaskForm.css'
import {Link} from "react-router-dom";



class InstagramTaskForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        return (
            <div>
            <form className='create-task-form'>
                <div className='create-task-area'>
                    <ol className='create-task-area'>
                        <div className='choice-area'>
                            <label className='action-info-label'>Choose the account</label>
                            <ul className='action-list'>
                                <button className='choice-btn'>@first_account</button>
                                 <button className='choice-btn'>@second_account</button>
                                 <button className='choice-btn'>@third_account</button>
                            </ul>
                        </div>
                        <div className='choice-area'>
                            <label className='action-info-label'>Name of the task</label>
                            <ul className='action-list'>
                                <input className='choice-btn' placeholder='Task name'/>
                            </ul>
                        </div>
                        <div className='choice-area'>
                            <label className='action-info-label'>What should we do and how many</label>
                            <ul className='action-list'>
                                <input className='choice-btn' placeholder='Likes'/>
                                 <input className='choice-btn' placeholder='Subscribes'/>
                                 <input className='choice-btn' placeholder='Unsubscribes'/>
                                 <input className='choice-btn' placeholder='Comments'/>
                                  <input className='choice-btn' placeholder='Direct'/>
                                  <input className='choice-btn' placeholder='Stories'/>
                            </ul>
                        </div>
                        <div className='choice-area'>
                            <label className='action-info-label'>Where should we find users</label>
                            <ul className='action-list'>
                                <textarea className='order-area' placeholder='Locations'/>
                                 <textarea className='order-area' placeholder='Tags'/>
                                 <textarea className='order-area' placeholder='Users'/>
                            </ul>
                        </div>
                    </ol>
                    <div className='submit-btn-area'>
                        <Link to='#' className='submit-btn'> Create task </Link>
                    </div>
                </div>
            </form>
            </div>
        )
    }
}


export default InstagramTaskForm
