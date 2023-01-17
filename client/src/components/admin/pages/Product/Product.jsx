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

  const [product, setProduct] = useState({
    fname: "",
    description: "",
    price: "",
    subcategory: "",
    stock: "",
  });
  const [data, setData] = useState([]);
  const [Cdata, setCData] = useState();
  const [subdatas, setsubDatas] = useState([]);
  const [subdata, setSubData] = useState([]);
  const [file, setFile] = useState([]);
  console.log(file);

  const setdata = (e) => {
    const { value, name } = e.target;
    console.log(value);
    setProduct(() => {
      return { ...product, [name]: value };
    });
  };

  const setimgfile = (e) => {
    setFile(e.target.files[0]);
  };

  const params = useParams();

  const getProductDetails = async () => {
    // console.log(params)
    let result = await fetch(`/product/${params.id}`);
    result = await result.json();
    setData(result);
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
    getProductDetails();
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
          {/* <div className="productTop">
          <div className="productTopLeft">
              <Chart data={productData} dataKey="Sales" title="Sales Performance"/>
          </div>
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img src={`/uploads/${data.imgpath}`} alt="" className="productInfoImg" />
                  <span className="productName">{data.fname}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">id:</span>
                      <span className="productInfoValue">{data._id}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">price:</span>
                      <span className="productInfoValue">{data.price}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">active:</span>
                      <span className="productInfoValue">yes</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">in stock:</span>
                      <span className="productInfoValue">no</span>
                  </div>
              </div>
          </div>
      </div> */}
          <div className="productBottom">
            <form className="productForm">
              <div className="productFormLeft">
                <label>Product Name</label>
                <input
                  type="text"
                  placeholder="Apple AirPod"
                  value={data.fname}
                />
                <label>Description</label>
                <input
                  type="text"
                  placeholder="Apple AirPod"
                  value={data.description}
                />
                <label>Price</label>
                <input
                  type="text"
                  placeholder="Apple AirPod"
                  value={data.price}
                />
                <label>Category</label>
                <select
                  name="category"
                  id="active"
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
                </select>
                <label>SubCategory</label>
                <select name="subcategory" id="active" onChange={setdata}>
                  {subdatas.length > 0
                    ? subdatas
                        .filter((product) => product.category)
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
                  placeholder="Apple AirPod"
                  value={data.stock}
                />
              </div>
              <div className="productFormRight">
                <div className="productUpload">
                  <img
                    src={`/uploads/${data.imgpath}`}
                    alt=""
                    className="productUploadImg"
                  />
                  <label for="file">
                    <Publish />
                  </label>
                  <input type="file" id="file" style={{ display: "none" }} />
                </div>
                <button className="productButton">Update</button>
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
