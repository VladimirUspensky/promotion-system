import React from "react";
//import {Button, Form, FormControl, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import "./NavBar.css"

const navbar = () => {

    // return (
    //     <>
    //         <Navbar bg="dark" variant="dark">
    //             <Navbar.Brand href="#home">Navbar</Navbar.Brand>
    //             <Nav className="mr-auto">
    //                 <Nav.Link href="/">Home</Nav.Link>
    //                 <Nav.Link href="/tasks">Tasks</Nav.Link>
    //                 <Nav.Link href="/about">About</Nav.Link>
    //                 <Nav.Link href="/contacts">Contacts</Nav.Link>
    //                 <Nav.Link href="/signin">SignIn</Nav.Link>
    //                 <Nav.Link href="/signup">SignUp</Nav.Link>
    //                 <Nav.Link href="/chats">Chats</Nav.Link>
    //             </Nav>
    //             <Form inline>
    //                 <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
    //                 <Button variant="outline-info">Search</Button>
    //             </Form>
    //         </Navbar>
    //     </>
    // )
}


const NavBar = () => {
    return (
        <div className='navbar'>
                <div className="navbar__items">
                    <div className="navbar__item1"><Link className="item__link" to="/">Logo</Link></div>
                    <div className="navbar__item2"><Link className="item__link" to="/tasks">Tasks</Link></div>
                    <div className="navbar__item3"><Link className="item__link" to="#">Best Performers</Link></div>
                    <div className="navbar__item4"><Link className="item__link" to="#">Best Customers</Link></div>
                    <div className="navbar__item5"><Link className="item__link" to="/signin">Sign In</Link></div>
                    <div className="navbar__item6"><Link className="item__link" to="/signup">Sign Up</Link></div>
                </div>
        </div>
    )
}


//export default NavBar
