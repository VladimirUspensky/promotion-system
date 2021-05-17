import React from "react";
//import Navbar from "../components/NavBar"
import "./Layout.css"
import SideBar from "../components/SideBar";
import store from "../store";
import StartedPage from "../components/started_page/StartedPage";

const layout = (props) => (
    <div className='main__template'>

        <SideBar />

        {/*{*/}
        {/*    store.getState().auth.isAuthenticated ? <SideBar /> : null*/}
        {/*}*/}

        {props.children}
    </div>
)

export default layout

