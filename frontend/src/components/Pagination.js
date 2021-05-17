import React from "react";
import PropTypes from "prop-types";
import "./Pagination.css"

const PaginationItem = props => {
    return (
        <button type='submit' className='pagination__item' onClick={() => props.changePage(props.page + 1)}>
            {props.page}
        </button>
    )
}


const Pagination = props => {
    const getPageNums = () => {
        let pages = []
        let pageNum = 0
        console.log(props.count)
        console.log(props.itemsPerPage)
        for (let i = 0; i < props.count; i += props.itemsPerPage) {
            console.log('page num')
            console.log(pageNum)
            if (pageNum === props.currentPage) {
                pages.push(
                    <PaginationItem page={pageNum} active={true} changePage={props.changePage}/>
                )
            } else {
                pages.push(
                    <PaginationItem page={pageNum} active={false} changePage={props.changePage}/>
                )
            }
            pageNum++
        }
        return pages
    }

    return (
        <div className='pagination'>
            <button type='submit' className='pagination__prev' onClick={props.prevPage}>
                Prev
            </button>
            {getPageNums()}
            <button type='submit' className='pagination__next' onClick={props.nextPage}>
                Next
            </button>
        </div>
    )
}


Pagination.propTypes = {
    itemsPerPage: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    changePage: PropTypes.func.isRequired,
    nextPage: PropTypes.func.isRequired,
    prevPage: PropTypes.func.isRequired
}

export default Pagination
