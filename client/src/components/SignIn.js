import React, {useState} from "react";
import Sign_img from "./Sign_img";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { NavLink, useNavigate } from "react-router-dom";


const SignIn = () => {
    const history = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const LoginUser = async (e) => {
        e.preventDefault();

        const res = await fetch("/signin",{
            method: "POST",
            headers: {"Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = res

        if(res.status === 400 || !data){
            window.alert("Please fill all the fields.");
            console.log("Please fill all the fields.")
        }else if(res.status === 422){
            window.alert("Invalid Cradentails");
            console.log("Invalid Cradentails")
        }else{
            window.alert("Login Success");
            // console.log("Login Success");
            history("/Home")
        }

    }
    return (
    <>
            <div className="container mt-3">
                <section className="d-flex justify-content-between">
                    <div className="left_data mt-3" style={{ width: "100%" }}>
                        <h2 className="text-center col-lg-6">Sign In</h2>
                        <Form>

                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                <Form.Control
                                    type="Email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your Email"
                                />
                            </Form.Group>

                            <Form.Group
                                className="mb-3 col-lg-6"
                                controlId="formBasicPassword"
                            >
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                />
                            </Form.Group>

                            <Button
                                variant="primary"
                                onClick={LoginUser}
                                className="col-lg-6"
                                style={{ background: "rgb(67, 185, 127" }}
                                type="submit"
                            >
                                Submit
                            </Button>
                        </Form>
                        <p className="mt-3">Dont have an account <span><NavLink to="/">SignUp</NavLink></span></p>
                    </div>
                    <Sign_img />
                </section>
            </div>
        </>
  )
}

export default SignIn
