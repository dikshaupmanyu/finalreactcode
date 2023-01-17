import React, { useEffect, useState , useCallback} from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { NavLink, Link, useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import axios from "axios";
import moment from "moment";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../topbar/Topbar";

const ListCategory = () => {
  const history = useNavigate();

  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);

  const getUserData = async () => {
    const res = await axios.get("/categoryData", {
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


  const Cdelete = async (id) => {
    alert(id)
    const res = await axios.delete(`/category/${id}`, {
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



  useEffect(() => {
    getUserData();
  }, [Cdelete])

  const Cedit = (id) => {
    history(`/editCategory/${id}`);
  };

  return (
    <>
                {/* {
                show ? <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                    User Delete
                </Alert> : ""
            } */}
                    <Topbar/>
        <div className='container-4'>
        <Sidebar/>
        <div className="userList">
      <div className="mt-5">
        <div className="container">
          <Table striped bordered hover  variant="light">
            <thead>
              <tr>
                <th>#ID</th>
                <th>Name</th>
                <th>Status</th>
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
                        <td>{el.status}</td>
                        <td>{moment(el.date).format("L")}</td>
                        <td className="d-flex justify-content-between">
                          <button className="btn btn-primary"  onClick={() => Cedit(el._id)}>Edit</button>
                          <button className="btn btn-danger" onClick={() => Cdelete(el._id)}>Delete</button>
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
};

export default ListCategory;
