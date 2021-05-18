import React, {useEffect, useState} from "react";
import "./Stats.css"
import BarChart from "./BarChart";
import axios from "axios";
import LineChart from "./LineChart";


const Stats = () => {
    const [barChartData, setBarChartData] = useState({
        solved_tasks_num: 0,
        failed_tasks_num: 0,
        created_tasks_num: 0,
        total_tasks_num: 0
    })
    const { solved_tasks_num, failed_tasks_num, created_tasks_num, total_tasks_num } = barChartData

    const [lineChartData, setLineChartData] = useState({
        average_mark: 0,
        reviews_num: 0
    })
    const { average_tasks_num, reviews_num } = lineChartData

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }
    useEffect(() => {
        const fetchStats = () => {
            axios.get(`http://localhost:8000/api/stats/detail`, config).then(response => {
                const data = response.data
                setBarChartData({
                    solved_tasks_num: data.solved_tasks_num,
                    failed_tasks_num: data.failed_tasks_num,
                    created_tasks_num: data.created_tasks_num,
                    total_tasks_num: data.total_tasks_num
                })
                setLineChartData({
                    average_mark: data.average_mark,
                    reviews_num: data.reviews_num
                })
                console.log('Success')
            }).catch(error => {
                console.log('Fail')
            })

        }
        fetchStats()
    }, [])


    return (
        <div className='stats'>
            <div>
                <BarChart solved_tasks_num={solved_tasks_num}
                          failed_tasks_num={failed_tasks_num}
                          created_tasks_num={created_tasks_num}
                          total_tasks_num={total_tasks_num}
                />
                <LineChart average_mark={average_tasks_num}
                           reviews_num={reviews_num}
                />
            </div>
        </div>
    )
}


export default Stats
