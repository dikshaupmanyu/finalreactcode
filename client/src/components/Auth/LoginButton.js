
import React from 'react';
import { useNavigate } from 'react-router-dom';



const LoginButton = () => {

  const history = useNavigate();

  const Login  = ( ) => {
    history("/signin")
  } 

  return (

  //   <GoogleLogin 
  //   clientId='gogoole id'
  //   render={(renderProps) => (
  //     <Button 
  //     // className={classes.googleButton}
  //     onClick={renderProps.onClick} 
  //     disabled={renderProps.disabled}
  //     >
  //       Google Sign In
  //     </Button>
  // )}
  //   />
    <button
      className="btn btn-primary btn-block"
      onClick={() => Login()}
    >
      Log In
    </button>
  );
};

export default LoginButton;