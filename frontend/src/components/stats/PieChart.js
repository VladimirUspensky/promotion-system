import React from "react";
import "./BarChart.css"
import {Bar, Pie} from "react-chartjs-2"
import PropTypes from "prop-types"
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    }
}))


const PieChart = ({ solved_tasks_num, failed_tasks_num, created_tasks_num, total_tasks_num }) => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Pie height={400}
                 width={300}
                 data={{
                     labels: ['solved', 'failed', 'created', 'total'],
                     datasets: [{
                         label: 'tasks stat',
                         backgroundColor: ['green', 'red', 'blue', 'grey'],
                         data: [4, 2, created_tasks_num, total_tasks_num]
                     }]
                 }}
                 options={{
                     maintainAspectRatio: false
                 }}
                 type='bar'
            />
        </div>
    )
}


PieChart.propTypes = {
    solved_tasks_num: PropTypes.number.isRequired,
    failed_tasks_num: PropTypes.number.isRequired,
    created_tasks_num: PropTypes.number.isRequired,
    total_tasks_num: PropTypes.number.isRequired
}


export default PieChart
