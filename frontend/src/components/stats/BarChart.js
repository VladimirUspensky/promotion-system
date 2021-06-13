import React from "react";
import "./LineChart.css"
import PropTypes from "prop-types"
import { Line, Bar } from "react-chartjs-2";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        marginBottom: '3%'
    }
}))


const BarChart = ({ average_mark, reviews_num }) => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Bar type='line' height={400} width={300} data={{
                labels: ['average_mark', 'reviews'],
                datasets: [{
                    label: 'rate stats',
                    backgroundColor: ['red', 'blue'],
                    data: [7.5, 12]
                }]
            }} options={{
                     maintainAspectRatio: false
                 }}
            />
        </div>
    )
}

BarChart.propTypes = {
    average_mark: PropTypes.number.isRequired,
    reviews_num: PropTypes.number.isRequired
}


export default BarChart
