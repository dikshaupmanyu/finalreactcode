import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card";
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { useNavigate , useParams , useHistory} from "react-router-dom";

const Update = () => {

  const  history = useNavigate(""); 
  const [fname , setName] = useState("");
  const [description , setDescription] = useState("");
  const [file, setFile] = useState("");
  console.log(file)


  const params = useParams();

  useEffect(() => {
      getProductDetails()
  },[]);

  const setimgfile = (e) => {
    setFile(e.target.files[0])
  }

  const getProductDetails = async () => { 
      // console.log(params)
      let result = await fetch(`/product/${params.id}`);
      result = await result.json();
      // console.log(result);
      setName(result.fname)
      setDescription(result.description)
      setFile(result.imgpath)
   }

 const updateProduct = async (e) => {
   e.preventDefault();
    var formData = new FormData();
    formData.append("imgpath", file);
    formData.append("fname", fname);
    formData.append("description", description);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }

    const res2 = await axios.put(`/product/${params.id}`, formData, config);
    // let res2 = await fetch(`/product/${params.id}`,{
    //   method: "PUT",
    //   headers:{
    //     "Content-Type":"multipart/form-data",
    //   },
    //   body: JSON.stringify({fname, description,file}),
    // });

    // res2 = await res2.json();
    console.log(res2);
    if(res2.status === 201){
      alert("data update")
      history("/home")
      
    }else{
    console.log("error")
    }
 }  

  

  return (
    <>
      <div className="container mt-3">
        <h1>Edit Product</h1>
        <div className="px-5 py-3 mx-3 my-5 border border-secondary rounded">
        <Form className='mt-3'>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name='fname' value={fname} onChange={(e) => {setName(e.target.value)}} placeholder="" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" name='description' value={description} onChange={(e) => {setDescription(e.target.value)}} placeholder="" />
          </Form.Group>

          {/* { file((el, i) => {
                return (
          <Card.Img
                        variant="top"
                        style={{
                          width: "25%",
                          textAlign: "center",
                          margin: "auto",
                        }}
                        src={`/uploads/${el.imgpath}`}
                        className="mt-2"
                      />
                      );
                    })
                  } */}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Select Your Image</Form.Label>
            <Form.Control type="file"  onChange={setimgfile}  name='imgpath' placeholder="" />
          </Form.Group>
          <Button variant="primary" onClick={updateProduct} type="submit">
            Submit
          </Button>
        </Form>

          </div>
      </div>
    </>
  )
}

export default Update