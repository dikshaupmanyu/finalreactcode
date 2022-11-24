import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { NavLink, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";

const Home = () => {
  const history = useNavigate();

  const [data, setData] = useState([]);
  // console.log(data)
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const [show, setShow] = useState(false);

  const getUserData = async () => {
  //   const res = await fetch("/getdata",{
  //     method: "GET",
  //     headers: {"Content-Type": "application/json" },
  //     // body: JSON.stringify({ email, password })
  // });
    const res = await axios.get("/getdata", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(res);

    if (res.data.status === 201 || !res.data) {
      setData(res.data.getUser);
    } else {
      console.log("errror");
    }
  };

  const dltUser = async (id) => {
    const res = await axios.delete(`/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res);

    if (res.data.status === 401 || !res.data) {
      console.log("errror");
    } else {
      console.log("user delete");
      setShow(true);
    }
  };

  useEffect(() => {
    getUserData();
  }, [dltUser]);

  const updateUser = (id) => {
    history(`/product/${id}`);
  };

  return (
    <>
      {/* {
                show ? <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                    User Delete
                </Alert> : ""
            } */}
      <div className="container mt-2">
        <h1 className="text-center mt-2">Products of User</h1>
        <div className="text-end">
          <Button variant="primary mx-2">
            <NavLink to="/product" className="text-decoration-none text-light">
              Add Product
            </NavLink>
          </Button>
          <Button variant="primary ">
            <NavLink
              to="/addCategory"
              className="text-decoration-none text-light"
            >
              Add Category
            </NavLink>
          </Button>
          <Button variant="primary mx-2">
            <NavLink
              to="/addSubcategory"
              className="text-decoration-none text-light"
            >
              Add Subcategory
            </NavLink>
          </Button>
        </div>

        <div className="row d-flex justify-content-between align-iteams-center mt-5">
          {data.length > 0
            ? data.map((el, i) => {
              return (
                <>
                  <Card
                    style={{ width: "22rem", height: "18rem" }}
                    className="mb-3"
                  >
                    <Card.Img
                      variant="top"
                      style={{
                        width: "100px",
                        textAlign: "center",
                        margin: "auto",
                      }}
                      src={`/uploads/${el.imgpath}`}
                      className="mt-2"
                    />
                    <Card.Body className="text-center">
                      <Card.Title> Name : {el.fname}</Card.Title>
                      <h6>Detail : {el.description}</h6>
                      <Card.Text>
                        Date Added :{moment(el.date).format("L")}
                      </Card.Text>
                      <Button
                        variant="danger"
                        className="col-lg-4 mx-2 text-center"
                        onClick={() => dltUser(el._id)}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="warning"
                        className="col-lg-4  text-center"
                        onClick={() => updateUser(el._id)}
                      >
                        Update
                      </Button>
                      {/* <Link to={"/product/" + el._id}>update</Lin */}
                    </Card.Body>
                  </Card>

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
                      <Button variant="primary" onClick={() => dltUser(el._id)}>Yes</Button>
                    </Modal.Footer>
                  </Modal> */}
                </>
              );
            })
            : ""}
        </div>
      </div>
    </>
  );
};

export default Home;
