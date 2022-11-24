import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom"

const Header = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark" style={{height:"60px"}}>
                <Container className='justify-content-around'>
                    <NavLink to="/home" className="text-decoration-none text-light mx-2">Home</NavLink>
                    {/* <Nav className="me-auto"> */}
                        <NavLink to="/categoryList" className="text-decoration-none text-light mx-2">Category List</NavLink>
                    {/* </Nav> */}
                    {/* <Nav className="me-auto"> */}
                        <NavLink to="/subcategoryList" className="text-decoration-none text-light">SubCategory List</NavLink>
                    {/* </Nav> */}
                </Container>
            </Navbar>
        </>
    )
}

export default Header