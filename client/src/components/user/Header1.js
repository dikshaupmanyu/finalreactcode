import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Nav from "./Nav";

const Header1 = ({cart, bag}) => {
  return(

  <MainHeader>
      <NavLink to="/">
        <img className='logo' src='../images/sneakers.png' alt="my logo img" />
        
      </NavLink>
    <Nav size={cart} bag={bag}/>
  </MainHeader>
  )
}

const MainHeader = styled.header`
padding:0 4.8rem;
height:7rem;
background-image: linear-gradient(352deg , #000000, #4db6ac);
display: flex;
justify-content: space-between;
align-items:center;
position:relative;


`;

export default Header1