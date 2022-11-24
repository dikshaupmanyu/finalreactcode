import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditSubCategory = () => {
  const [category, setcategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [data, setData] = useState([]);

  const params = useParams();
  const history = useNavigate();

  useEffect(() => {
    geteditCategory();
    getCategoryName();
  }, []);

  const geteditCategory = async () => {
    // console.log(params)
    let result = await fetch(`http://localhost:8005/editSubCategory/${params.id}`);
    result = await result.json();
    setcategory(result.category);
    setSubcategory(result.sname);
  };


  //   get category name 

const getCategoryName = async () => {
    const res = await axios.get("/categoryData", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (res.data.status === 401 || !res.data) {
      console.log("errror");
    } else {
        //   console.log(res.data.getCat.fname)
      setData(res.data.getCat);
    }
  };


  const editSubCategory = async (e) => {
    // console.warn(fname, description);
    e.preventDefault();
    let res2 = await fetch(`http://localhost:8005/editSubCategory/${params.id}`,{
      method: "PATCH",
      headers:{
        "Content-Type":"Application/json",
      },
      body: JSON.stringify({category, subcategory}),
    });

    res2 = await res2.json();
    // console.log(res2);
    if(res2.status === 422 || !res2){
    //   alert("yes")
  }else{
    alert("data update")
    history("/subcategoryList")
    }
 }

  return (
    <>
    <div className="container mt-3">
      <h1>Edit SubCategory</h1>
      <div className="px-5 py-3 mx-3 my-5 border border-secondary rounded">

      <Form className='mt-3'>

          <Form.Group className="mb-3" >
              <Form.Label>Category</Form.Label>
              <Form.Select aria-label="Default select example" name="category" value={category} onChange={(e) => { setcategory(e.target.value); }}>
              {data.length > 0
            ? data.map((el, i) => {
                return (
                    <>
                    <option>{el.fname}</option>
                  </>
                  );
              }): " "
              }
              </Form.Select>
          </Form.Group>


        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>SubCategory Name</Form.Label>
          <Form.Control type="text" name='sname' value={subcategory} onChange={(e) => { setSubcategory(e.target.value); }} placeholder="" />
        </Form.Group>


        <Button variant="primary" type="submit" onClick={editSubCategory}>
          Submit
        </Button>
      </Form>
      </div>
    </div>
  </>
  );
};

export default EditSubCategory;

