import React, { useState, useEffect } from "react";
import _ from 'lodash';
import "./newProduct.css";
import Sidebar from "../../Sidebar/Sidebar";
import Topbar from "../../topbar/Topbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function NewProduct() {
  const history = useNavigate(); 

  const [product, setProduct] = useState({fname: "", description: "",price: "", subcategory: "", stock:"",  });
  const [data, setData] = useState([]);
  const [Cdata, setCData] = useState();
  const [subdatas, setsubDatas] = useState([]);
  const [subdata, setSubData] = useState([]);
  const [file, setFile] = useState([]);
  console.log(file)

  const setdata = (e) => {
    const { value, name } = e.target;
    console.log(value);
    setProduct(() => {
      return { ...product, [name]: value, };
    });
  };

  const setimgfile = (e) => {
    setFile(e.target.files[0])
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
      // _.forEach(e.target.file, file => {
        formData.append("imgpath", file);
        
      // })
      formData.append("fname", product.fname);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("category", Cdata);
      formData.append("subcategory", product.subcategory);
      formData.append("stock", product.stock);
  
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
  
      const res = await axios.post("/product", formData, config);
      console.log(res);
  
      if (res.data.status === 201) {
        history("/admin");
      } else {
        console.log("errror");
      }
    };
  
  return (
    <>
    <Topbar />
   <div className='container-4'>
   <Sidebar/>
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="file" name="imgpath" onChange={setimgfile}/>
        </div>
        <div className="addProductItem">
          <label>Name</label>
          <input type="text" placeholder="Apple Airpods" name="fname" onChange={setdata}/>
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input type="text" placeholder="add description" name="description" onChange={setdata}/>
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input type="number" placeholder="add amount" name="price" onChange={setdata}/>
        </div>
        <div className="addProductItem">
          <label>Category</label>
          <select name="category" id="active"  onChange={(e) => filterItem(e.target.value)}>
          {data.length > 0
                  ? data.map((el, i) => {
                      return (
                        <>
                          <option key={i}>{el.fname}</option>
                        </>
                      );
                    })
                  : " "}
          </select>
        </div>
        <div className="addProductItem">
          <label>SubCategory</label>
          <select name="subcategory" id="active" onChange={setdata}>
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
          </select>
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <input type="number" placeholder="123" name="stock" onChange={setdata}/>
        </div>
        <button className="addProductButton" type="submit" onClick={addUserData}>Create</button>
      </form>
    </div>
   </div>
   </>
  );
}