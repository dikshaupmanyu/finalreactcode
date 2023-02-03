import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import axios from "axios";
import moment from "moment";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../topbar/Topbar";

const ListSubcategory = () => {
  const [subdata, setSubData] = useState([]);

  const [show, setShow] = useState(false);

  const history = useNavigate();

  const getSubCategory = async () => {
    const result = await axios.get("/subcategoryData", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (result.data.status === 401 || !result.data) {
      console.log("error");
    } else {
      setSubData(result.data.getSubcat);
    }
  };

  const SCdelete = async (id) => {
    alert(id);
    const res = await axios.delete(`/Subcategory/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // console.log(res)

    if (res.data.status === 401 || !res.data) {
      console.log("errror");
    } else {
      console.log("user delete");
      setShow(false);
    }
  };

  useEffect(() => {
    getSubCategory();
  }, [SCdelete]);

  const scEdit = (id) => {
    history(`/editSubCategory/${id}`);
  };

  return (
    <>
      <Topbar />
      <div className="container-4">
        <Sidebar />
        <div className="userList">
          <div className="mt-5">
            <div className="container">
              <Table striped bordered hover variant="light">
                <thead>
                  <tr>
                    <th>#ID</th>
                    <th>Category Name</th>
                    <th>SubCategory Name</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                {subdata.length > 0
                  ? subdata.map((el, i) => {
                      return (
                        <>
                        
                          <tbody>
                            <tr>
                              <td>{el._id}</td>
                              <td>{el.category}</td>
                              <td>{el.sname}</td>
                              <td>{moment(el.date).format("L")}</td>
                              <td className="d-flex justify-content-between">
                                <button
                                  className="btn btn-primary"
                                  onClick={() => scEdit(el._id)}
                                >
                                  Edit
                                </button>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => SCdelete(el._id)}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </>
                      );
                    })
                  : " "}
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListSubcategory;
