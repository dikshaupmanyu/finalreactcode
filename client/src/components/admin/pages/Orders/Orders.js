import "../userList/userList.css";
import React from 'react';
import { NavLink, Link, useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import moment from "moment";
import axios from "axios";
import { useState, useEffect } from "react";
import Sidebar from "../../Sidebar/Sidebar";
import Topbar from "../../topbar/Topbar";

export default function Orders() {
  const [data, setData] = useState({});
    console.log(data)
  // console.log(user)
  const [show, setShow] = useState(false);


  const getUserData = async () => {
    const res = await axios.get("/orderList", {
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


  
  const view = (id) => {
    history(`/orderDetail/${id}`);
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

  }, [])
  

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
                <th>Name</th>
                <th>customerID</th>
                <th>Amount</th>
                <th>Payment Status</th>
                <th>Email</th>
                <th>Action</th>
                {/* <th>Address</th> */}
              </tr>
            </thead>
            {data.length > 0
              ? data.map((el, i) => {
                  return (
                    <>
                    <tbody key={i}>
                      <tr>
                        <td>{el.shipping.name}</td>
                        <td>{el.customerId}</td>
                        <td>{el.subtotal}</td>
                        {/* <td>{el.payment_status}</td> */}
                        <td>{el.shipping.email}</td>
                        <td>{el.shipping.phone}</td>
                        {/* <td>{el.shipping.address.city}</td> */}
                        <td className="d-flex justify-content-between">
                          <button className="btn btn-primary"  onClick={() => view(el._id)}>View</button>
                         
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