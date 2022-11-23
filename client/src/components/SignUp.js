import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Signimg from "./Sign_img";
// import Login from "./Login"
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const SignUp = () => {
    const history = useNavigate();

    const [user, setUser] = useState({
        name:"", email:"", password:"", Cpassword:"",
    })


    const handleInputs = (e) => {
        const {value,name} = e.target;
        setUser(() => {
              return {  ...user,  [name]:value }
          })
    };

    const addData = async (e) => {
        e.preventDefault();

        const {name, email, password, Cpassword} = user;

        const res = await fetch("/register", {
          method:"POST",
          headers:{
            "Content-Type": "application/json"
          },
          body:JSON.stringify({name,email,password, Cpassword })
        });

        const data =  res
        console.log(data)

        if(data.status === 400 || !data){
          window.alert("Invalid Registartion");
          console.log("Invalid registartion")
        }else if(data.status === 422){
          window.alert("Email alread exist");
          console.log("Email alread exist")
        }else if (data.status === 420){
          window.alert("Password and Confirm password are not matching.");
          console.log("Password and Confirm password are not matching.")
        }
        else{
          window.alert("successfull Registartion");
          console.log("successfull registartion");
          history("/signin")
        }
    }
 
  return (
    <>
    <div className="container mt-3">
      <section className="d-flex justify-content-between" >
        <div className="left_data mt-3" style={{width:"100%"}}>
          <h2 className="text-center col-lg-6">Sign Up</h2>
          <Form>
            <Form.Group className="mb-3 col-lg-6" controlId="formBasictText"> 
              <Form.Control type="text" name="name" value={user.name}  onChange={handleInputs} placeholder="Your Name" />
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
              <Form.Control type="Email" name="email" onChange={handleInputs} value={user.email} placeholder="Your Email" />
            </Form.Group>             

            <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">
              <Form.Control type="password" name="password" value={user.password} onChange={handleInputs} placeholder="Password" />
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6" controlId="formBasicCPassword">
              <Form.Control type="password" name="Cpassword" value={user.Cpassword} onChange={handleInputs} placeholder="Confirm Password" />
            </Form.Group>

            <Button variant="primary" onClick={addData} className="col-lg-6" style={{background:"rgb(67, 185, 127"}} type="submit">
              Submit
            </Button>
          </Form>
          <p className="mt-3">Allready have an account <span><NavLink to="/signin">SignIn</NavLink></span></p>
        </div>
          <Signimg/>
      </section>
    </div>
  </>
  )
}

export default SignUp
