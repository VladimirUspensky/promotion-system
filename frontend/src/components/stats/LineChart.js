import React from "react";
import "./LineChart.css"
import PropTypes from "prop-types"
import { Line } from "react-chartjs-2";


const LineChart = ({ average_mark, reviews_num }) => {

    return (
        <div className='line__chart'>
            <Line type='line' data={{
                labels: ['average_mark', 'reviews'],
                datasets: [{
                    label: 'rate stats',
                    data: [average_mark, reviews_num]
                }]
            }} options={{
                     maintainAspectRatio: false
                 }}
            />
        </div>
    )
}

LineChart.propTypes = {
    average_mark: PropTypes.number.isRequired,
    reviews_num: PropTypes.number.isRequired
}


export default LineChart
