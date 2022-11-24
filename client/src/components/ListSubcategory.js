import React, { useEffect, useState , useCallback} from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { NavLink, Link, useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import axios from "axios";
import moment from "moment";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";

const ListSubcategory = () => {

    const [ subdata , setSubData] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true); 
    const [show, setShow] = useState(false);

    const history = useNavigate();

    const getSubCategory = async () => {
        const result = await axios.get("/subcategoryData", {
            headers:{
                "Content-Type": "application/json",
            }
        });

        if(result.data.status === 401 || !result.data){
            console.log("error");
        }else{
            setSubData(result.data.getSubcat)
        }
    };

    const SCdelete = async (id) => {
        alert(id)
        const res = await axios.delete(`/Subcategory/${id}`,  {
            headers: {
                "Content-Type": "application/json"
            }
        });

      
        // console.log(res)
    
        if (res.data.status === 401 || !res.data) {
            console.log("errror")
        } else {
            console.log("user delete");
            setShow(false)
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
       <h1>List Sub Category</h1>
       <div className="mt-5">
        <div className="container">
          <Table striped bordered hover  variant="dark">
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
                    {/* <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this !
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => SCdelete(el._id)}
                    >
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal> */}
            
                    <tbody>
                      <tr>
                        <td>{el._id}</td>
                        <td>{el.category}</td>
                        <td>{el.sname}</td>
                        <td>{moment(el.date).format("L")}</td>
                        <td className="d-flex justify-content-between">
                          <button className="btn btn-primary" onClick={() => scEdit(el._id)}>Edit</button>
                          <button className="btn btn-danger"  onClick={() => SCdelete(el._id)}>Delete</button>
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
    </>
  )
}

export default ListSubcategory
