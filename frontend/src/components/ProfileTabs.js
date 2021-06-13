import React, {useEffect, useState} from "react";
import Stats from "./stats/Stats";
import "./ProfileTabs.css"
import ProfileEditTab from "./ProfileEditTab";
import {makeStyles} from "@material-ui/core/styles";
import {Tab, Tabs} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        gridArea: 'content',
        width: '100%'
    },
    body: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
    },
    header: {
        display: 'flex',
        height: '100%',
        paddingBottom: '3%',
        justifyContent: 'start',
        fontWeight: 'bold',
        borderBottom: '1px solid'
    },
    title: {
        marginLeft: '2%',
        fontSize: '25px'
    },
    tabs: {
        display: 'flex',
        flexDirection: 'column',
        width: '20%',
        borderRight: '1px solid'

    },
    tab: {
        display: 'flex',
        height: '50px',
        justifyContent: 'center',
        fontSize: '18px'
    },
    active: {
        display: 'flex'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
    },
    tabContent: {
        width: '100%',
        height: '100%'
    }

}))


const TabContent = props => {
    const classes = useStyles()
    const {component, value, index, active, ...other} = props

    return (
        <div className={classes.tabContent}>
            {
                active === value ? component : null
            }
        </div>
    )
}


const ProfileTabs = () => {
    const classes = useStyles()
    const [active, setActive] = useState('editProfile')
    const handleChange = (event, value) => {
        if (value === 0) {
            setActive('editProfile')
        } else {
            setActive('stats')
        }
    }

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <div className={classes.title}>
                    My Profile
                </div>
            </div>
            <div className={classes.body}>
                <Tabs orientation='vertical'
                      value={active === 'editProfile' ? 0 : 1}
                      onChange={event => handleChange(event)}
                      textColor='primary'
                      indicatorColor='primary'
                      variant='fullWidth'
                      className={classes.tabs}>
                    <Tab className={classes.tab}
                         onClick={() => setActive('editProfile')}
                         label='Edit Profile' />
                    <Tab className={classes.tab}
                         onClick={() => setActive('stats')}
                         label='Stats'/>
                </Tabs>
                <div className={classes.content}>
                        <TabContent value='editProfile'
                                    index={0}
                                    active={active}
                                    component={<ProfileEditTab/>}
                        />
                        <TabContent value='stats'
                                    active={active}
                                    index={1}
                                    component={<Stats/>}
                        />
                </div>
            </div>
        </div>
    )
}


export default ProfileTabs
