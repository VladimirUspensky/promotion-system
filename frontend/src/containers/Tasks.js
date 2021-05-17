import React, {useEffect, useState} from "react";
import axios from "axios";
import Pagination from "../components/Pagination";
import Card from "../components/Card";
//import Container from "react-bootstrap/Container"


const Tasks = () => {
    const [tasks, setTasks] = useState([])
    const [count, setCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [nextPage, setNextPage] = useState(2)
    const [prevPage, setPrevPage] = useState(null)

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/tasks/?page=1')
                setCount(response.data.count)
                setTasks(response.data.results)
                setNextPage(response.data.next)
                setPrevPage(response.data.previous)
            } catch (error) {
                console.log('Some error')
            }
        }
        fetchTasks()
    }, [])

    const showTasks = () => {
        let showedTasks = []
        tasks.map(task => {
            return showedTasks.push(
                <Card deadline={task.deadline}
                      status={task.status}
                      payment={task.payment}
                      first_name={task.customer.first_name}
                      last_name={task.customer.last_name}
                      slug={task.slug}
                />
            )
        })
        return showedTasks
    }

    const getPrevPage = () => {
        if (prevPage === null) {
            return
        }
        axios.get(prevPage.toString()).then(response => {
            setTasks(response.data.results)
            setPrevPage(response.data.previous)
            setNextPage(response.data.next)
            if (prevPage) {
                setCurrentPage(currentPage - 1)
            }
        }).catch(error => {
            console.log('Prev Error')
        })
    }

    const getNextPage = () => {
        axios.get(nextPage).then(response => {
            setTasks(response.data.results)
            setPrevPage(response.data.previous)
            setNextPage(response.data.next)
            if (nextPage) {
                setCurrentPage(currentPage + 1)
            }
        }).catch(error => {
            console.log('Some error')
        })
    }

    const changePage = (page) => {
        axios.get(`http://localhost:8000/api/tasks/?page=${page}`)
            .then(response => {
                setTasks(response.data.results)
                setCount(response.data.count)
                setNextPage(response.data.next)
                setPrevPage(response.data.previous)
                setCurrentPage(page)
            })
            .catch(error => {
                console.log('Some error')
            })
    }

    return (
        <div>
            <section>
                {showTasks()}
            </section>
            <section>
                <Pagination itemsPerPage={3}
                            count={count}
                            currentPage={currentPage}
                            changePage={changePage}
                            nextPage={getNextPage}
                            prevPage={getPrevPage}
                />
            </section>
        </div>
    )
}

export default Tasks
