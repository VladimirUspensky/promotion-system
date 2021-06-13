import React from "react";
import "./TasksList.css"
import {Link} from "react-router-dom";
import PropTypes from "prop-types"
import {InputLabel, makeStyles} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '70%',
        border: '2px solid rgba(0,0,0,.1)',
        boxShadow: '0 3px 10px -2px rgba(0,0,0,.1)',
        margin: '1%',
        marginLeft: '15%'
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
    },
    payment: {
        display: 'flex',
        marginLeft: '3%',
        marginBottom: '3%',
        marginTop: '4%'
    },
    description: {
        display: 'flex',
        margin: '2%',
        marginTop: '0'
    },
    dates: {
        display: 'flex',
        flexDirection: 'row',

    },
    publication_date: {
        display: 'flex',
        margin: '1%',
        marginRight: '50%',
    },
    deadline: {
        display: 'flex',
        margin: '1%'
    },
    label: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: '2%'
    }
}))


const Task = ({ slug, title, payment, description, published_date, deadline, status }) => {

    const classes = useStyles()


    return (
        <div className={classes.root}>
            <div className={classes.title}>
                <Link className="task__title__link" to={`/tasks/${slug}`}>
                    {title}
                </Link>
            </div>
            <InputLabel className={classes.label}>Payment</InputLabel>
            <div className={classes.payment}>
                {payment}
            </div>
            <div className={classes.description}>
                {description}
            </div>
            <div className={classes.dates}>
                <InputLabel className={classes.label}>Publication date</InputLabel>
                <div className={classes.publication_date}>
                    {published_date}
                </div>
                <InputLabel className={classes.label}>Deadline</InputLabel>
                <div className={classes.deadline}>
                    {deadline}
                </div>
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
