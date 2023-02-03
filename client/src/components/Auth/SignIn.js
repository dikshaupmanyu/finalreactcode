import React, { useContext, useState, useEffect } from "react";
import Sign_img from "../Sign_img";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import GoogleLogin from "react-google-login";
import "./signIn.css";
import { NavLink, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { gapi } from "gapi-script";

import { UserContext } from "../../App";
import { DataGrid } from "@material-ui/data-grid";

const SignIn = () => {
  const { state, dispatch } = useContext(UserContext);
  // console.log(state, dispatch)
  const Dispatch = useDispatch()

  const [loginData, setLoginData] = useState(
    localStorage.getItem('loginData')
      ? JSON.parse(localStorage.getItem('loginData'))
      : null
  );

  const [inpval, setInpval] = useState({
    email: "",
    password: "",
  });

  const setVal = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;

    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };

  const history = useNavigate();

  const LoginUser = async (e) => {
    e.preventDefault();

    const { email, password } = inpval;

    // console.log("user login succesfully done");

    const data = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const res = await data.json();
    console.log(res);

    if (res.status === 201) {
      localStorage.setItem("usersdatatoken", res.result.token);
      localStorage.setItem("userDataEmail", res.result.userValid.email);
      history("/");
      setInpval({ ...inpval, email: "", password: "" });
    }else if(res.status === 422){
      alert("Plz. Login with Google account")
    } 
  };

  //////////////////////////////  GOOGLE LOGIN //////////////////////////////////

  const clientId =
    "604995091388-io13bqqg3g6sv6o70mjv3mh6gh2laev6.apps.googleusercontent.com";

  const onFailure = (err) => {
    console.log("failed:", err);
  }
  const handlelogin = async (googleData) => {
    // localStorage.setItem('usersdatatoken', googleData.tokenId);
    // console.log("success:", googleData);
    const res = await fetch('/api/google-login', {
      method: 'POST',
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(res) 

    const data = await res.json();
    
    if(data.status === 201){
      
      setLoginData(data);
      localStorage.setItem('usersdatatoken', data.result.token);
      localStorage.setItem('loginData', JSON.stringify(data));
      localStorage.setItem('userDataEmail', JSON.stringify(data.result.userExist.email));
      history('/');
    }else{
      localStorage.setItem('usersdatatoken', data.result.token);
      localStorage.setItem('loginData', JSON.stringify(data));
      localStorage.setItem('userDataEmail', JSON.stringify(data.result.user.email));
      history('/');

    }
  };

  return (
    <>
      <div className="login_container">
        <div className="login_form_container">
          <div className="left1">
            <form className="form_container" onSubmit={LoginUser}>
              <h1>Login to Your Account</h1>
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={setVal}
                value={inpval.email} 
                required
                className="input"
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={setVal}
                value={inpval.password}
                required
                className="input"
              />

              <Button type="submit" className="green_btn">
                Sing In
              </Button>
            </form>
            <GoogleLogin
              clientId={clientId}
              buttonText="Sign in with Google"
              // onSuccess={googleAuth}
              onSuccess={handlelogin}
              onFailure={onFailure}
              cookiePolicy={"single_host_origin"}
            />
          </div>
          <div className="right">
            <h1>New Here ?</h1>
            <Link to="/signup">
              <button type="button" className="white_btn">
                Sing Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
