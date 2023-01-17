import React, { useEffect, useState} from "react";
import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../dummyData";
import Sidebar from "../../Sidebar/Sidebar";
import Topbar from "../../topbar/Topbar";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { NavLink, Link, useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import moment from "moment";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";

export default function ProductList() {
  const [data, setData] = useState(productRows);
  const [show, setShow] = useState(false);

  const getUserData = async () => {
    const res = await axios.get("/productList", {
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
    const res = await axios.delete(`/product/${id}`, {
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (res.data.status === 401 || !res.data) {
        console.log("errror")
    } else {
        console.log("user delete");
        setShow(false)
    }
};
const history = useNavigate();

  useEffect(() => {
    getUserData();
  }, [handleDelete])

  const Cedit = (id) => {
    history(`/product/${id}`);
  };

  return (
    <>
    <Topbar />
    <div className='container-4'>
    <Sidebar/>
      <div className="userList">
      <h1></h1> 
      <div className="mt-5">
        <div className="container">
          <Table striped bordered hover  variant="light">
            <thead>
              <tr>
                <th>#ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            {data.length > 0
              ? data.map((el, i) => {
                  return (
                    <>
                    <tbody key={el.toString()}>
                      <tr>
                        <td>{el._id}</td>
                        <td>{el.fname}</td>
                        <td>{el.description}</td>
                        <td>{el.price}</td>
                        <td>{moment(el.date).format("L")}</td>
                        <td className="d-flex justify-content-between">
                          <button className="btn btn-primary"  onClick={() => Cedit(el._id)}>Edit</button>
                          <button className="btn btn-danger" onClick={() => handleDelete(el._id)}>Delete</button>
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