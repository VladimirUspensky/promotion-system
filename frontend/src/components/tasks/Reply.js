import React from "react";
import PropTypes from "prop-types"


const Reply = ({ first_name, last_name, content, send_date }) => {

    return (
        <div className='reply'>
            <div className='reply__oneline__fields'>
                <label className='reply__field'>{first_name} {last_name}</label>
                <label className='reply__field'>{send_date}</label>
            </div>
            <text className='reply__text'>{content}</text>
        </div>
    )
}

Reply.propTypes = {
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    send_date: PropTypes.instanceOf(Date).isRequired
}

export default Reply
