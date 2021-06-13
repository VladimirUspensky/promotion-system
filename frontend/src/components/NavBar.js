import React from "react";
import {AppBar, Button, Grid, makeStyles, Toolbar, Typography} from "@material-ui/core";
import {connect} from "react-redux";
import {logout} from "../actions/auth";


const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
        gridArea: 'navbar',
    },
    title: {
        marginLeft: '10%',
        color: '#404040',
        height: '100%',
        padding: '1%',
    },
    button: {
        margin: '5%'
    }
}))


const NavBar = ({auth: {isAuthenticated}, logout}) => {
    const classes = useStyles()
    return (
        <AppBar position='static' className={classes.root}>
            <Toolbar>
                <Grid container>
                    <Grid item xs={10}>
                        <Typography className={classes.title} variant='h5' component='h5'>Promotion System</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        {
                            isAuthenticated
                                ?
                                <Button className={classes.button}
                                        variant='contained'
                                        color='primary'
                                        onClick={logout}
                                        href='/logout'>Logout</Button>
                                :
                                <div>
                                    <Button className={classes.button}
                                            variant='contained'
                                            color='primary'
                                            href='/signin'>
                                            Login</Button>
                                    <Button className={classes.button}
                                            variant='contained'
                                            color='primary'
                                            href='/signup'>
                                            Sign Up</Button>
                                </div>
                        }
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(NavBar)
