import React, {useState} from "react";
import "./ReviewCreateModal.css"
import axios from "axios";
import PropTypes from "prop-types"


const ReviewCreateModal = ({ show, setShow, performer, customer, id }) => {
    const [modalData, setModalData] = useState({
        from_user: localStorage.getItem('id'),
        to_user: customer.id === localStorage.getItem('id') ? performer.id : customer.id,
        task: id,
        content: '',
        mark: ''
    })
    const { from_user, to_user, task, content, mark } = modalData
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }
    const onChange = event => setModalData({...modalData, [event.target.name]: event.target.value})
    const onSubmit = event => {
        event.preventDefault()
        console.log(modalData)
        const body = JSON.stringify(modalData)
        axios.post('http://localhost:8000/api/reviews/create', body, config).then(response => {
            console.log('Success')
            setShow(!show)
        }).catch(error => {
            console.log('Fail')
            console.log(error)
        })
    }

    if (!show) {
        return null
    }

    return (
        <div className='review__modal'>
            <label className='modal__title'>Create review</label>
            <form className='modal__form' onSubmit={event => onSubmit(event)}>
                <div className='modal__form__inputs'>
                    <select className='modal__mark__select'
                            name='mark'
                            value={mark}
                            onChange={event => onChange(event)}>
                        <option className='modal__mark__option'>0</option>
                        <option className='modal__mark__option'>1</option>
                        <option className='modal__mark__option'>2</option>
                        <option className='modal__mark__option'>3</option>
                        <option className='modal__mark__option'>4</option>
                        <option className='modal__mark__option'>5</option>
                        <option className='modal__mark__option'>6</option>
                        <option className='modal__mark__option'>7</option>
                        <option className='modal__mark__option'>8</option>
                        <option className='modal__mark__option'>9</option>
                        <option className='modal__mark__option'>10</option>
                    </select>
                    <textarea className='modal__content__textarea'
                              placeholder='Type review...'
                              name='content'
                              value={content}
                              onChange={event => onChange(event)}
                    />
                </div>
                <button className='modal__form__button' type='submit' name='content' value={content}>Send</button>
            </form>
        </div>
    )
}

ReviewCreateModal.propTypes = {
    show: PropTypes.bool.isRequired,
    setShow: PropTypes.func.isRequired,
    performer: PropTypes.object.isRequired,
    customer: PropTypes.object.isRequired,
    id: PropTypes.number.isRequired
}

export default ReviewCreateModal
