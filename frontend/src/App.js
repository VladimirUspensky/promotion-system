import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn"
import TaskDetail from "./components/tasks/TaskDetail"
import NotFound from "./components/NotFound"
import Layout from "./components/Layout";
import { Provider } from "react-redux";
import store from "./store";
import TasksList from "./components/tasks/TasksList";
import TaskCreate from "./components/tasks/TaskCreate";
import Notifications from "./components/Notifications";
import ProfileTabs from "./components/ProfileTabs";
import UserTasks from "./components/tasks/UserTasks";
import ChatList from "./components/Chat";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Layout>
                        <Switch>
                            <Route exact path='/' component={ProfileTabs}/>
                            <Route exact path='/tasks' component={TasksList}/>
                            <Route exact path='/tasks/create' component={TaskCreate}/>
                            <Route exact path='/tasks/:slug' component={TaskDetail}/>
                            <Route exact path='/signup' component={SignUp}/>
                            <Route exact path='/signin' component={SignIn}/>
                            <Route exact path='/notifications' component={Notifications}/>
                            <Route exact path='/my_tasks' component={UserTasks}/>
                            <Route exact path='/chats' component={ChatList}/>
                            <Route component={NotFound}/>
                        </Switch>
                    </Layout>
                </Router>
            </Provider>
        )
    }
}

export default App;
