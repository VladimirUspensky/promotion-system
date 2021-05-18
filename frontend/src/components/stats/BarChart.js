import React from "react";
import "./BarChart.css"
import { Bar } from "react-chartjs-2"
import PropTypes from "prop-types"


const BarChart = ({ solved_tasks_num, failed_tasks_num, created_tasks_num, total_tasks_num }) => {

    return (
        <div className='barchart'>
            <Bar height={100}
                 width={300}
                 data={{
                     labels: ['solved', 'failed', 'created', 'total'],
                     datasets: [{
                         label: 'tasks stat',
                         data: [solved_tasks_num, failed_tasks_num, created_tasks_num, total_tasks_num]
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


BarChart.propTypes = {
    solved_tasks_num: PropTypes.number.isRequired,
    failed_tasks_num: PropTypes.number.isRequired,
    created_tasks_num: PropTypes.number.isRequired,
    total_tasks_num: PropTypes.number.isRequired
}


export default BarChart
