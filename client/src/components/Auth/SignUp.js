import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import { useNavigate , Link} from "react-router-dom";
import { useDispatch, useSelector }  from "react-redux";
// import { registerUser } from "../../slice/authSlice";
import 'react-phone-input-2/lib/style.css';
import "./signUp.css"


const SignUp = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
    // const auth = useSelector((state) => state.auth);
  // console.log(auth)
  // useEffect(()=>{
  //   if(auth._id){
  //     history("/cartItem")
  //   }
  // },[auth._id], history);


    const [user, setUser] = useState({
      username:"",  fullname:"", email:"", phone:"", address:"",  password:""
    })


    const handleChange = (e) => {
        const {value,name} = e.target;
        setUser(() => {
              return {  ...user,  [name]:value }
          })
    };

    const addData = async (e) => {
        e.preventDefault();
        // dispatch(registerUser(user))

        const {username, fullname, email, phone, address, password } = user;

        const res = await fetch("/register", {
          method:"POST",
          headers:{
            "Content-Type": "application/json"
          },
          body:JSON.stringify({username, fullname,email, phone, address, password })
        });

        const data =  res
        console.log(data)

        if(data.status === 422){
          window.alert("Email alread exist");
          console.log("Email alread exist")
        }else if(data.status === 200){
          window.alert("successfull Registartion");
          console.log("successfull registartion");
          history("/signin")
        }
        else{
          window.alert("Invalid Registartion");
          console.log("Invalid registartion")
        }
    }

 
  return (
    <>
    {/* <div className="container mt-3">
      <section className="d-flex justify-content-between" >
        <div className="left_data mt-3" style={{width:"100%"}}>
          <h2 className="text-center mb-4 col-lg-6">Sign Up</h2>
          <Form>
            <Form.Group className="mb-4 col-lg-6" controlId="formBasictText"> 
            <Form.Label>User name</Form.Label>
              <Form.Control type="text" name="username" value={user.name}  onChange={handleInputs} placeholder="john" />
            </Form.Group>

            <Form.Group className="mb-4 col-lg-6" controlId="formBasictText"> 
            <Form.Label>Fullname</Form.Label>
              <Form.Control type="text" name="fullname" value={user.name}  onChange={handleInputs} placeholder="John Wick" />
            </Form.Group>

            <Form.Group className="mb-4 col-lg-6" controlId="formBasicEmail">
            <Form.Label>Email Address</Form.Label>
              <Form.Control type="Email" name="email" onChange={handleInputs} value={user.email} placeholder="john@gmail.com" />
            </Form.Group>  

            <Form.Group className="mb-4 col-lg-6" controlId="formBasicphone">
            <Form.Label>Phone No.</Form.Label>
              <Form.Control type="text" name="phone" onChange={handleInputs} maxLength="10" value={user.phone} placeholder="Your mobile no." />
            </Form.Group>     

            <Form.Group className="mb-4 col-lg-6" controlId="formBasicphone">
            <Form.Label>Address</Form.Label>
              <Form.Control type="text" name="address" onChange={handleInputs} value={user.address} placeholder="India" />
            </Form.Group>             

            <Form.Group className="mb-4 col-lg-6" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" value={user.password} onChange={handleInputs} placeholder="********" />
            </Form.Group>

        

            <Button variant="primary" onClick={addData} className="col-lg-6" style={{background:"rgb(67, 185, 127"}} type="submit">
              Submit
            </Button>
          </Form>
          <p className="mt-3 h5">Allready have an account <span><NavLink to="/signin">SignIn</NavLink></span></p>

         
        </div>
          <Signimg/>
      </section>
    </div> */}

<div className="signup_container">
			<div className="signup_form_container">
				<div className="left">
					<h1>Welcome Back</h1>
					<Link to="/signin">
						<button type="button" className="white_btn">
							Sing in
						</button>
					</Link>
				</div>
				<div className="right1">
					<form className="form_container" onSubmit={addData}>
						<h1>Create Account</h1>
						<input
							type="text"
							placeholder="User Name"
							name="username"
							onChange={handleChange}
							value={user.username}
							required
							className="input"
						/>
						<input
							type="text"
							placeholder="Full Name"
							name="fullname"
							onChange={handleChange}
							value={user.fullname}
							required
							className="input"
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={user.email}
							required
							className="input"
						/>
						<input
							type="text"
							placeholder="Phone no."
							name="phone"
							onChange={handleChange}
							value={user.phone}
              maxLength="10"
							required
							className="input"
						/>
						<input
							type="text"
							placeholder="Address"
							name="address"
							onChange={handleChange}
							value={user.address}
							required
							className="input"
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={user.password}
							required
							className="input"
						/>
						
						<Button type="submit" className="green_btn">
							Sing Up
						</Button>
					</form>
				</div>
			</div>
		</div>
  </>
  )
}

export default SignUp
