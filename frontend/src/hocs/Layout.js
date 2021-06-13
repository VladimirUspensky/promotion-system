import React from "react";
import "./Layout.css"
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import {CssBaseline} from "@material-ui/core";


const layout = (props) => {

    return (
            <div className='main__template'>
                <CssBaseline/>
                <NavBar/>
                <SideBar/>
                {props.children}
            </div>
    )
}

export default layout
