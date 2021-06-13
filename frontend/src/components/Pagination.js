import React from "react";
import PropTypes from "prop-types";
import "./Pagination.css"
import {Button, makeStyles} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        width: '20%',
        height: '10%',
        marginLeft: '36%',
        marginTop: '5%'
    },
    arrowButton: {
        display: 'flex',
        height: '30px',
    },
    numButton: {
        display: 'flex',
        height: '30px'
    }
}))


const PaginationItem = props => {
    const classes = useStyles()
    return (
        <Button type='submit'
                variant='text'
                className={classes.numButton}
                onClick={() => props.changePage(props.page + 1)}>
            {props.page}
        </Button>
    )
}


const Pagination = props => {
    const classes = useStyles()
    const getPageNums = () => {
        let pages = []
        let pageNum = 1
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
        <div className={classes.root}>
            <Button type='submit'
                    color='primary'
                    variant='contained'
                    className={classes.arrowButton}
                    onClick={props.prevPage}>
                Prev
            </Button>
            {getPageNums()}
            <Button type='submit'
                    color='primary'
                    variant='contained'
                    className={classes.arrowButton}
                    onClick={props.nextPage}>
                Next
            </Button>
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
