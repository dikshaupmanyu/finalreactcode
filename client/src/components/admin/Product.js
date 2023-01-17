import React, { useState, useEffect } from "react";
import _ from 'lodash';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const [product, setProduct] = useState({fname: "", description: "",price: "", subcategory: "", });
  const [data, setData] = useState([]);
  const [Cdata, setCData] = useState();
  const [subdatas, setsubDatas] = useState([]);
  const [subdata, setSubData] = useState([]);
  const [file, setFile] = useState([]);
  console.log(file)

  const history = useNavigate(); 

  const setdata = (e) => {
    const { value, name } = e.target;
    console.log(value);
    setProduct(() => {
      return { ...product, [name]: value, };
    });
  };

  const setimgfile = (e) => {
    setFile(e.target.files);
  };

  // ////////////////////////////////////////////////////////////////////// filter

  const filterItem = (categItem) => {
    setCData(categItem);
    const updatedItem = subdata.filter((curElem) => {
      return curElem.category === categItem;
    });
    setsubDatas(updatedItem);
  };

  ////////////////////////////////////////////////////////////////////  //  get category name

  const getCategoryName = async () => {
    const res = await axios.get("/categoryData", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.data.status === 401 || !res.data) {
      console.log("errror");
    } else {
      setData(res.data.getCat);
    }
  };

  ///////////////////////////////////////////////////////////////// get subcategory data
  const getSubCategoryName = async () => {
    const res = await axios.get("/subcategoryData", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.data.status === 401 || !res.data) {
      console.log("errror");
    } else {
      //   console.log(res.data.getCat.fname)
      setSubData(res.data.getSubcat);
    }
  };

  useEffect(() => {
    getCategoryName();
    getSubCategoryName();
  }, []);

  //////////////////////////////////////////////////////////////////// adduser data

  const addUserData = async (e) => {
    e.preventDefault();

    var formData = new FormData();
    _.forEach(e.target.files, file => {
      formData.append("photo", file);
      
    })
    formData.append("fname", product.fname);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("category", Cdata);
    formData.append("subcategory", product.subcategory);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const res = await axios.post("/product", formData, config);
    // const res = await fetch("/product", {
    //   method:"POST",
    //   config,
    //   body:formData
    // });
    console.log(res);

    if (res.data.status === 401 || !res.data) {
      console.log("errror");
    } else {
      history("/home");
    }
  };

  return (
    <>
      <div className="container mt-3">
        <h1>Add Product</h1>
        <div className="px-5 py-3 mx-3 my-5 border border-secondary rounded">
          <Form className="mt-3">
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
             
                type="text"
                name="fname"
                onChange={setdata}
                placeholder="enter name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicdescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                onChange={setdata}
                placeholder="add description"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAmount">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                onChange={setdata}
                placeholder="add amount"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="category"
                onChange={(e) => filterItem(e.target.value)}
              >
               
                {data.length > 0
                  ? data.map((el, i) => {
                      return (
                        <>
                          <option key={i}>{el.fname}</option>
                        </>
                      );
                    })
                  : " "}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>SubCategory</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="subcategory"
                onChange={setdata}
              >
                {subdatas.length > 0
                  ? subdatas
                      .filter((product) => product.category)
                      .map((el, i) => {
                        return (
                          <>
                            <option key={i}>{el.sname}</option>
                          </>
                        );
                      })
                  : " "}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Select Your Image</Form.Label>
              <Form.Control
                type="file"
                onChange={setimgfile}
                name="photo"
                placeholder=""
                multiple={true}
              />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={addUserData}>
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Product;
