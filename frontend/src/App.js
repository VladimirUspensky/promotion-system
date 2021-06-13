import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import About from "./containers/About";
import Contacts from "./containers/Contacts";
import SignUp from "./containers/SignUp";
import SignIn from "./containers/SignIn"
import TaskDetail from "./components/tasks/TaskDetail"
import NotFound from "./components/NotFound"
import Layout from "./hocs/Layout";
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
                            <Route exact path='/about' component={About}/>
                            <Route exact path='/contacts' component={Contacts}/>
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
