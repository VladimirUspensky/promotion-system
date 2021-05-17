import React from "react";
import "./BarChart.css"
import { Bar } from "react-chartjs-2"


const BarChart = ({ solved_tasks_num, failed_tasks_num, created_tasks_num, total_tasks_num }) => {

    return (
        <div className='barchart'>
            <Bar height={300}
                 width={500}
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


export default BarChart
