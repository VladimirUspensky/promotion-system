import React from "react";
import PropTypes from "prop-types"
import {makeStyles} from "@material-ui/core/styles";
import {InputLabel} from "@material-ui/core";
import Box from "@material-ui/core/Box";


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
        marginTop: '5%'
    },
    fields: {
        display: 'inline-flex',
    },
    field: {
        margin: '4%'
    },
    left: {
        display: 'flex',
        marginLeft: '20%',
        justifyContent: 'flex-start'
    },
    right: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    textarea: {
        display: 'flex',
        justifyContent: 'center'
    }

}))


const Reply = ({ first_name, last_name, content, send_date }) => {

    const classes = useStyles()

    return (
        <div className={classes.root}>
            <div className={classes.fields}>
                <InputLabel className={`${classes.field} ${classes.left}`}>{first_name} {last_name}</InputLabel>
                <InputLabel className={`${classes.field} ${classes.right}`}>{send_date}</InputLabel>
            </div>
            <Box className={classes.textarea}>{content}</Box>
            <br/>
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
