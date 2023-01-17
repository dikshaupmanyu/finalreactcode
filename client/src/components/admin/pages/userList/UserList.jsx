import "./userList.css";
import React from 'react';
import { NavLink, Link, useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import moment from "moment";
import axios from "axios";
import { useState, useEffect } from "react";
import Sidebar from "../../Sidebar/Sidebar";
import Topbar from "../../topbar/Topbar";

export default function UserList() {
  const [data, setData] = useState({});

  // console.log(user)
  const [show, setShow] = useState(false);


  const getUserData = async () => {
    const res = await axios.get("/userList", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    

    if (res.data.status === 401 || !res.data) {
      console.log("errror");
    } else {
      setData(res.data.getCat);
    }
  };



  const handleDelete = async (id) => {
    // alert(id)
    const res = await axios.delete(`/user/${id}`, {
        headers: {
            "Content-Type": "application/json"
        }
    });
  
    // console.log(res)

    if (res.data.status === 401 || !res.data) {
        console.log("errror")
    } else {
        console.log("user delete");
        setShow(true)
    }
};
const history = useNavigate();

  useEffect(() => {
    getUserData();

  }, [handleDelete])
  
  const userEdit = (id) => {
    history(`/user/${id}`);
  };

  return (
    <>
    <Topbar />
    <div className='container-4'>
    <Sidebar/>
      <div className="userList">
      <div className="mt-5">
        <div className="container">
          <Table striped bordered hover  variant="light">
            <thead>
              <tr>
                <th>#ID</th>
                <th>UserName</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            {data.length > 0
              ? data.map((el, i) => {
                  return (
                    <>
                    <tbody key={i}>
                      <tr>
                        <td>{el._id}</td>
                        <td>{el.username}</td>
                        <td>{el.fullname}</td>
                        <td>{el.email}</td>
                        <td>{el.phone}</td>
                        <td>{el.address}</td>
                        <td className="d-flex justify-content-between">
                          <button className="btn btn-primary" onClick={() => userEdit(el._id)} >Edit</button>
                          <button className="btn btn-danger" onClick={() =>  { 
                            const confirmBox = window.confirm("Are you shure you want to Delete this User...?")
                            if(confirmBox === true){
                              handleDelete(el._id)}
                            }
                          }>Delete</button>
                        </td>
                      </tr>
                    </tbody>
                    </>
                  );
                }): " "
                }
          </Table>
        </div>
      </div>
    </div>
    </div>
    </>
  );
}