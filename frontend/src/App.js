import React from 'react'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import Header from "./components/Header";
import Footer from "./components/Footer";


class App extends React.Component{

    render() {
        return (
            <div className='App'>
                <Header/>
                <Footer/>
            </div>
        );
    }
}

export default App;
