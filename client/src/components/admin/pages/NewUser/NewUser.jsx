import React, {useState} from 'react';
import "./newUser.css";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../../slice/authSlice";
import { useDispatch, useSelector }  from "react-redux";
import Sidebar from "../../Sidebar/Sidebar";
import Topbar from "../../topbar/Topbar";

export default function NewUser() {

  const history = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    username:"",  fullname:"", email:"", phone:"", address:"",  password:""
  })


  const handleInputs = (e) => {
      const {value,name} = e.target;
      setUser(() => {
            return {  ...user,  [name]:value }
        })
  };

  const addUser = async (e) => {
    e.preventDefault();
    // dispatch(registerUser(data))

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
      history("/user")
    }
    else{
      window.alert("Invalid Registartion");
      console.log("Invalid registartion")
    }
}

  return (
    <>
    <Topbar/>
    <div className='container-4'>
        <Sidebar/>
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input type="text" name='username' value={user.username} placeholder="john" onChange={handleInputs}/>
        </div>
        <div className="newUserItem">
          <label>Full Name</label>
          <input type="text" name='fullname'  value={user.fullname} placeholder="John Smith" onChange={handleInputs}/>
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="email" name='email' value={user.email} placeholder="john@gmail.com" onChange={handleInputs}/>
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input type="text" name='phone' value={user.phone} placeholder="+1 123 456 78" onChange={handleInputs}/>
        </div>
        <div className="newUserItem">
          <label>Address</label>
          <input type="text" name='address' value={user.address} placeholder="New York | USA" onChange={handleInputs}/>
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input type="password" name="password" value={user.password} onChange={handleInputs} placeholder="********" />
        </div>
        <hr/>
        <button type='submit' className="newUserButton" onClick={addUser}>Create</button>
      </form>
    </div>
    </div>
    </>
  );
}