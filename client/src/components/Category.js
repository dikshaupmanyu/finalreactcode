import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios"
import { useNavigate } from "react-router-dom";

const Category = () => {

  const [category, setCategory] = useState({
    fname:"",
    status:"",
  });


  const history = useNavigate();

  const setdata = (e) => {
    const {value,name} = e.target;
    console.log(value);
    setCategory(() => {
          return {
              ...category, 
              [name]:value
          }
      })
  }

  // adduser data

  const addCategory = async (e) => {
    e.preventDefault();

    const {fname,  status} = category;

    const res = await fetch("/category", {
      method:"POST",
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
       fname, status
      })
    });

    const data =  res

    if (data.status === 201 ) {
        history("/home")
    } else {
        console.log("error")
    }
  }

  return (
    <>
      <div className="container mt-3">
        <h1>Add Category</h1>
        <div className="px-5 py-3 mx-3 my-5 border border-secondary rounded">

        <Form className='mt-3'>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name='fname' onChange={setdata} placeholder="" />
          </Form.Group>

          {/* <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" name='date' onChange={setdata} placeholder="" />
          </Form.Group> */}

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Status</Form.Label>
            <Form.Control type="text" name='status' onChange={setdata} placeholder="" />
          </Form.Group>

          {/* <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Select Your Image</Form.Label>
            <Form.Control type="file" onChange={setimgfile} name='photo' placeholder="" />
          </Form.Group> */}
          <Button variant="primary" type="submit" onClick={addCategory}>
            Submit
          </Button>
        </Form>
        </div>
      </div>
    </>
  )
}

export default Category