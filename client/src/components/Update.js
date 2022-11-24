import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate , useParams , useHistory} from "react-router-dom";

const Update = () => {

  const  history = useNavigate(""); 
    
    const [fname , setName] = useState("");
    const [description , setDescription] = useState("");
    const [imgpath, setImage] = useState("");
  

    const params = useParams();

    useEffect(() => {
        getProductDetails()
    },[]);

    const getProductDetails = async () => { 
        // console.log(params)
        let result = await fetch(`/product/${params.id}`);
        result = await result.json();
        console.log(result);
        setName(result.fname)
        setDescription(result.description)
        setImage(result.imgpath)
     }

   const updateProduct = async (e) => {

    var formData = new FormData();
    formData.append("photo", imgpath);
    formData.append("fname", fname);
    formData.append("description", description);

      // console.warn(fname, description);
      e.preventDefault();
      let res2 = await fetch(`/product/${params.id}`,{
        method: "PATCH",
        headers:{
          "Content-Type":"multipart/form-data",
        },
        // body: JSON.stringify({fname, description}),
        body:formData
      });

      res2 = await res2.json();
      console.log(res2);
      if(res2.status === 422 || !res2){
      //   alert("yes")
    }else{
      alert("data update")
      history("/home")
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

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Select Your Image</Form.Label>
            <Form.Control type="file" value=""  onChange={(e) => {setImage(e.target.files[0])}}  name='photo' placeholder="" />
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