import React, { useState , useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios"
import { useNavigate } from "react-router-dom";

const Subcategory = () => {

  const [subcategory, setSubcategory] = useState({
      category:"",
    sname:"",
    c_id:"",
  });

  const [data, setData] = useState([]);
  console.log(data)

  const history = useNavigate();

  const setdata = (e) => {
    const {value,name} = e.target;
    // console.log(name);
    console.log(value)
    setSubcategory(() => {
          return {
              ...subcategory, 
              [name]:value
          }
      })
  }

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


  useEffect(() => {
    getCategoryName();
  }, [])


  // adduser data

  const addSubcategory = async (e) => {
    e.preventDefault();

    const {category,  sname} = subcategory;

    const res = await fetch("/subCategory", {
      method:"POST",
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
       sname, category
      })
    });

    console.log(res)
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
        <h1>Add SubCategory</h1>
        <div className="px-5 py-3 mx-3 my-5 border border-secondary rounded">

        <Form className='mt-3'>

            <Form.Group className="mb-3" >
                <Form.Label>Category</Form.Label>
                <Form.Select aria-label="Default select example" name="category" onChange={setdata}>
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
            <Form.Control type="text" name='sname' onChange={setdata} placeholder="" />
          </Form.Group>


          <Button variant="primary" type="submit" onClick={addSubcategory}>
            Submit
          </Button>
        </Form>
        </div>
      </div>
    </>
  )
}

export default Subcategory