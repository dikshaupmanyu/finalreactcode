import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";

const EditCategory = () => {
  const [fname, setName] = useState("");
  const [status, setStatus] = useState("");

  const params = useParams();
  const history = useNavigate();

  useEffect(() => {
    geteditCategory();
  }, []);

  const geteditCategory = async () => {
    // console.log(params)
    let result = await fetch(`/editCategory/${params.id}`);
    result = await result.json();
    // console.log(result);
    setName(result.fname);
    setStatus(result.status);
  };

  const editCategory = async (e) => {
    // console.warn(fname, description);
    e.preventDefault();
    let res2 = await fetch(`/editCategory/${params.id}`,{
      method: "PATCH",
      headers:{
        "Content-Type":"Application/json",
      },
      body: JSON.stringify({fname, status}),
    });

    res2 = await res2.json();
    // console.log(res2);
    if(res2.status === 422 || !res2){
    //   alert("yes")
  }else{
    alert("data update")
    history("/categoryList")
    }
 }

  return (
    <>
      <div className="container mt-3">
        <h1>Edit Category</h1>
        <div className="px-5 py-3 mx-3 my-5 border border-secondary rounded">

        <Form className="mt-3">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="fname"
              value={fname}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder=""
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Status</Form.Label>
            <Form.Control
              type="text"
              name="status"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
              }}
              placeholder=""
            />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={editCategory}>
            Submit
          </Button>
        </Form>
        </div>
      </div>
    </>
  );
};

export default EditCategory;
