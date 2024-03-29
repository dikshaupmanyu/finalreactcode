import React, { useContext, useEffect, useState , } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FiShoppingCart , FiHeart} from "react-icons/fi";
import LoginButton from "../Auth/LoginButton";
import LogoutButton from "../Auth/Logout-button";
import { LoginContext } from "../../context/Context";


const Nav = ({size, bag}) => {

  const { logindata, setLoginData } = useContext(LoginContext);
  console.log(logindata)

  const [ user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  // console.log(user);


  useEffect(()=> {
    // const token = user.token;

    setLoginData((localStorage.getItem("usersdatatoken")))
  },[]);

  const [menuIcon, setMenuIcon] = useState();

  const Nav = styled.nav`
    .navbar-lists {
      display: flex;
      gap: 4.8rem;
      align-items: center;
      .navbar-link {
        &:link,
        &:visited {
          display: inline-block;
          text-decoration: none;
          font-size: 1.8rem;
          font-weight: 500;
          text-transform: uppercase;
          color: #c1c1c1;
          transition: color 0.3s linear;
        }
        &:hover,
        &:active {
          // color: ${({ theme }) => theme.colors.helper};
          color:teal
        }
      }
    }
    .mobile-navbar-btn {
      display: none;
      background-color: transparent;
      cursor: pointer;
      border: none;
    }
    .mobile-nav-icon[name="close-outline"] {
      display: none;
    }
    .close-outline {
      display: none;
    }
    .cart-trolley--link {
      position: relative;
      .cart-trolley {
        position: relative;
        font-size: 3.2rem;
      }
      .cart-total--item {
        width: 2.4rem;
        height: 2.4rem;
        position: absolute;
        background-color: #000;
        color: #000;
        border-radius: 50%;
        display: grid;
        place-items: center;
        top: -20%;
        left: 70%;
        // background-color: ${({ theme }) => theme.colors.helper};
        background-color:teal;
      }
    }
    .user-login--name {
      text-transform: capitalize;
    }
    .user-logout,
    .user-login {
      font-size: 1.4rem;
      padding: 0.8rem 1.4rem;
    }
    @media (max-width: ${({ theme }) => theme.media.mobile}) {
      .mobile-navbar-btn {
        display: inline-block;
        z-index: 9999;
        border: ${({ theme }) => theme.colors.black};
        .mobile-nav-icon {
          font-size: 4.2rem;
          color: ${({ theme }) => theme.colors.black};
        }
      }
      .active .mobile-nav-icon {
        display: none;
        font-size: 4.2rem;
        position: absolute;
        top: 30%;
        right: 10%;
        color: ${({ theme }) => theme.colors.black};
        z-index: 9999;
      }
      .active .close-outline {
        display: inline-block;
      }
      .navbar-lists {
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        visibility: hidden;
        opacity: 0;
        transform: translateX(100%);
        /* transform-origin: top; */
        transition: all 3s linear;
      }
      .active .navbar-lists {
        visibility: visible;
        opacity: 1;
        transform: translateX(0);
        z-index: 999;
        transform-origin: right;
        transition: all 3s linear;
        .navbar-link {
          font-size: 4.2rem;
        }
      }
      .cart-trolley--link {
        position: relative;
        .cart-trolley {
          position: relative;
          font-size: 5.2rem;
        }
        .cart-total--item {
          width: 4.2rem;
          height: 4.2rem;
          font-size: 2rem;
        }
      }
      .user-logout,
      .user-login {
        font-size: 2.2rem;
        padding: 0.8rem 1.4rem;
      }
    }
  `;

  const RenderMenu = () => {
    if(logindata){
      return( 
        <>
          <li>
                        <NavLink
                            to="/"
                            className="navbar-link "
                            onClick={() => setMenuIcon(false)}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/products"
                            className="navbar-link "
                            onClick={() => setMenuIcon(false)}>
                            Products
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/myorders"
                            className="navbar-link "
                            onClick={() => setMenuIcon(false)}>
                            My Orders
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/signin"
                            className="navbar-link "
                            onClick={() => setMenuIcon(false)}>
                            <LogoutButton/>
                        </NavLink>
                        {/* <button onClick={logout}>Logoout</button> */}
                    </li>
                    <li>
                        <NavLink to="/wishList" className="navbar-link cart-trolley--link">
                            <FiHeart className="cart-trolley" />
                            <span className="cart-total--item"> {bag} </span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/cartItem" className="navbar-link cart-trolley--link">
                            <FiShoppingCart className="cart-trolley" />
                            <span className="cart-total--item"> {size} </span>
                        </NavLink>
                    </li>
        </>
      )
    }else{
      return(
        <>
          <li>
                        <NavLink
                            to="/"
                            className="navbar-link "
                            onClick={() => setMenuIcon(false)}>
                            Home
                        </NavLink>
                    </li>
                    {/* <li>
                        <NavLink
                            to="/admin"
                            className="navbar-link "
                            onClick={() => setMenuIcon(false)}>
                            Admin
                        </NavLink>
                    </li> */}
                    <li>
                        <NavLink
                            to="/products"
                            className="navbar-link "
                            onClick={() => setMenuIcon(false)}>
                            Products
                        </NavLink>
                    </li>
                    <li>
                      <LoginButton/>
                        {/* <NavLink
                            to="/signin"
                            className="navbar-link "
                            onClick={() => setMenuIcon(false)}>
                        </NavLink> */}
                    </li>
                    <li>
                        <NavLink to="/wishList" className="navbar-link cart-trolley--link">
                            <FiHeart className="cart-trolley" />
                            <span className="cart-total--item">{bag}</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/cartItem" className="navbar-link cart-trolley--link">
                            <FiShoppingCart className="cart-trolley" />
                            <span className="cart-total--item"> {size} </span>
                        </NavLink>
                    </li>
        </>
      )
    }
  }
    return (
        
        <Nav style={{padding:"0"}}>
            <div className={menuIcon ? "navbar active" : "navbar"}>
                <ul className="navbar-lists">
                    <RenderMenu/>
                </ul>

                {/* two button for open and close of menu */}
                {/* <div className="mobile-navbar-btn">
                    <CgMenu
                        name="menu-outline"
                        className="mobile-nav-icon"
                        onClick={() => setMenuIcon(true)}
                    />
                    <CgMenu
                        name="menu-outline"
                        className="mobile-nav-icon"
                        onClick={() => setMenuIcon(true)}
                    />
                    <CgClose
                        name="close-outline"
                        className="mobile-nav-icon close-outline"
                        onClick={() => setMenuIcon(false)}
                    />
                </div> */}
            </div>
        </Nav>
    );
};

export default Nav;