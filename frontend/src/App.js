import './App.css'
import React from 'react'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'


import CreateTask from './Components/CreateTask'
import NavBar from './Components/NavBar'
import SideBar from "./Components/SideBar";
import Login from "./Components/Login";
import InstagramTaskForm from './Components/InstagramTaskForm'
import InstagramTaskList from "./Components/InstagramTaskList";
import VKTaskForm from "./Components/VKTaskForm";
import FacebookTaskForm from "./Components/FacebookTaskForm";
import HomePage from "./Components/HomePage";


class App extends React.Component{

    render() {
        return (
            <div className='App'>

                <Router>
                    <NavBar/>
                    <SideBar/>
                    <Switch>
                        <Route exact path='/' component={Login}/>
                        <Route path='/home' component={HomePage}/>
                        <Route path='/create-task' component={CreateTask}/>
                        <Route path='/create_inst_task' component={InstagramTaskForm}/>
                        <Route path='/inst_tasks' component={InstagramTaskList}/>
                        <Route path='/create_vk_task' component={VKTaskForm}/>
                        <Route path='/create_facebook_task' component={FacebookTaskForm}/>
                    </Switch>
                </Router>

            </div>
        );
    }
}

export default App;
