import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios"
import { useNavigate } from "react-router-dom";

const Product = () => {

  const [product, setProduct] = useState({
    fname:"",
    description:""
  });

  const [file, setFile] = useState("");

  const history = useNavigate();

  const setdata = (e) => {
    const {value,name} = e.target;
    console.log(value);
    setProduct(() => {
          return {
              ...product, 
              [name]:value
          }
      })
  }

  const setimgfile = (e) => {
    setFile(e.target.files[0])
  }

  // adduser data

  const addUserData = async (e) => {
    e.preventDefault();

    var formData = new FormData();
    formData.append("photo", file);
    formData.append("fname", product.fname);
    formData.append("description", product.description);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }

    const res = await axios.post("/product", formData, config);
    // const res = await fetch("/product", {
    //   method:"POST",
    //   config,
    //   body:formData
    // });
    console.log(res)

    if (res.data.status === 401 || !res.data) {
      console.log("errror")
    } else {
      history("/home")
    }
  }

  return (
    <>
      <div className="container mt-3">
        <h1>Add Product</h1>
        <div className="px-5 py-3 mx-3 my-5 border border-secondary rounded">

        <Form className='mt-3'>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name='fname' onChange={setdata} placeholder="" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" name='description' onChange={setdata} placeholder="" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Select Your Image</Form.Label>
            <Form.Control type="file" onChange={setimgfile} name='photo' placeholder="" />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={addUserData}>
            Submit
          </Button>
        </Form>
        </div>
      </div>
    </>
  )
}

export default Product