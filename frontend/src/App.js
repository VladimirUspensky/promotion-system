import './App.css'
import React from 'react'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'


import CreateTask from './Components/CreateTask'
import NavBar from './Components/NavBar'



class App extends React.Component{

    render() {
        return (
            <div className='App'>

                <Router>
                    <NavBar/>
                    <Switch>
                        <Route path='/create-task' component={CreateTask}/>
                    </Switch>
                </Router>

            </div>
        );
    }
}

export default App;
