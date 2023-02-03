import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./product.css";
import axios from "axios";
// import Chart from '../../chart/Chart';
import { productData } from "../../dummyData";
import { Publish } from "@material-ui/icons";
import Sidebar from "../../Sidebar/Sidebar";
import Topbar from "../../topbar/Topbar";
import { useNavigate, useParams } from "react-router-dom";

export default function Product() {
  const history = useNavigate();


  const [fname, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [img, setImg] = useState("");
  const [Cdata, setCData] = useState([]);
  const [subdata, setSubData] = useState([]);
  const [file, setFile] = useState([]);
  console.log(file);

  const setimgfile = (e) => {
    setFile(e.target.files[0]);
  };

  const params = useParams();
  const getProductDetails = async () => {
    // console.log(params)
    let result = await fetch(`/product/${params.id}`);
    result = await result.json();
    console.log(result)
    setName(result.fname);
    setDescription(result.description);
    setPrice(result.price);
    setImg(result.imgpath);
    setStock(result.stock);
    setCategory(result.category);
    setSubCategory(result.subcategory
      );
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
      setCData(res.data.getCat);
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
    getProductDetails();
    getCategoryName();
    getSubCategoryName();
    // addUserData()
  }, []);

  //////////////////////////////////////////////////////////////////// adduser data

  const addUserData = async (e) => {
    // e.preventDefault();

    var formData = new FormData();
    // _.forEach(e.target.file, file => {
    // formData.append("imgpath", file);

    // })
    formData.append("fname",fname);
    formData.append("description",description);
    formData.append("price",price);
    formData.append("category", category);
    formData.append("subcategory", subCategory);
    formData.append("stock", stock);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const res = await axios.put(`/product/${params.id}`, formData, config);
    console.log(res);

    if (res.status === 201) {
      history("/admin");
    } else {
      console.log("errror");
    }
  };

  return (
    <>
      <Topbar />
      <div className="container-4">
        <Sidebar />

        {/* <div className="userList"> */}

        <div className="product">
          <div className="productTitleContainer">
            <h1 className="productTitle">Product</h1>
            <Link to="/newproduct">
              <button className="productAddButton">Create</button>
            </Link>
          </div>

          <div className="productBottom">
            <form className="productForm">
              <div className="productFormLeft">
                <label>Product Name</label>
                <input
                  type="text"
                  placeholder=""
                  value={fname}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <label>Description</label>
                <input
                  type="text"
                  placeholder="Apple AirPod"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
                <label>Price</label>
                <input
                  type="text"
                  placeholder="Apple AirPod"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
                <label>Category</label>
                <select
                  name="category"
                  id="active"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                >
                {Cdata.length > 0
              ? Cdata.map((el, i) => {
                  return (
                    <>
                    <option key={i}>{el.fname}</option>
                    </>

                    );
                }): " "
                }
                </select>
                <label>SubCategory</label>
                <select name="subcategory" id="active" value={subCategory}  onChange={(e) => {
                    setSubCategory(e.target.value);
                  }}>
                  {subdata.length > 0
                    ? subdata
                        // .filter((product) => product.category)
                        .map((el, i) => {
                          return (
                            <>
                              <option></option>
                              <option key={i}>{el.sname}</option>
                            </>
                          );
                        })
                    : " "}
                </select>
                <label>In Stock</label>
                <input
                  type="text"
                  placeholder="stock"
                  value={stock}
                  onChange={(e) => {
                    setStock(e.target.value);
                  }}
                />
              </div>
              <div className="productFormRight">
                <div className="productUpload">
                  <img
                    src={`/uploads/${img}`}
                    alt=""
                    className="productUploadImg"
                  />
                  <label for="file">
                    <Publish />
                  </label>
                  <input type="file" id="file" name="file" style={{ display: "none" }} onChange={setimgfile}/>
                </div>
                <button className="productButton" onClick={() => {addUserData()}}>Update</button>
              </div>
            </form>
          </div>
        </div>
        {/* </div> */}
        {/* <UserList/> */}
      </div>
    </>
  );
}
