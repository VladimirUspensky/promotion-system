import React from "react";
import "./TasksList.css"
import {Link} from "react-router-dom";
import PropTypes from "prop-types"


const Task = ({ slug, title, payment, description, published_date, deadline, status }) => {


    return (
        <div className="task__block">
            <div className="task__title__block">
                <Link className="task__title__link" to={`/tasks/${slug}`}>
                    {title}
                    На сайте на битриксе добавить поля телефонов
                </Link>
            </div>
            <div className="payment">
                {payment}
                5000
            </div>
            <div className="description">
                {description}
                Имеется небольшой сайт на битриксе

                1. На сайте имеется несколько поддоменов(филиалы) у них нужно добавить по телефону,
                чтобы можно из админки указывать

                2. Обновить гугл-капчу на форме обратного звонка. Сейчас она стоит, но не срабатывает

                Напишите, пожалуйста, стоимость.
            </div>
            <div className="date__pub">
                {published_date}
                08.05.2021
            </div>
            <div className="deadline">
                {deadline}
                20.05.2021
            </div>
        </div>
    )
}

Task.propTypes = {
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    payment: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    published_date: PropTypes.instanceOf(Date).isRequired,
    deadline: PropTypes.instanceOf(Date).isRequired
}

export default Task
