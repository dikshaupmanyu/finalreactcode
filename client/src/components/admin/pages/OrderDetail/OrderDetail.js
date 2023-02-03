
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../User/user.css";
import "./orderD.css";
import Sidebar from "../../Sidebar/Sidebar";
import Topbar from "../../topbar/Topbar";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

export default function OrderDetail() {
  const params = useParams();
  const [user, setUser] = useState({});
  const [prodcutData, setProducts] = useState([]);
  const [shippingData, setShippingData] = useState([]);
  const [shippingAddress, setShippingAddress] = useState([]);
  console.log(user);
  console.log(prodcutData);

  // const getProductDetails = async () => {
  //   // console.log(params)
  //   let result = await fetch(`/orderDetail/${params.id}`);
  //   result = await result.json();
  //   setUser(result);
  //   // setProducts(result.products)
  // };

  const getProductDetails = async () => {
    // let token = localStorage.getItem("usersdatatoken");

    const res = await fetch(`/orderDetail/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (data.status === 401 || !data) {
    } else {
      console.log("user verify");
      console.log(data);
      setUser(data.getCat);
      setProducts(data.getCat.products);
      setShippingData(data.getCat.shipping);
      setShippingAddress(data.getCat.shipping.address);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  return (
    <>
      <Topbar />
      <div className="container-4">
        <Sidebar />
        <Wrapper>
        <div className="container">
        <p>
                  Order ID :<span> {user._id} </span>
                </p>
        {/* <p>
                  Order Placed :<span> {user.createdAt.slice(0, 10)} </span>
                </p> */}
          <div className="cont">
            {prodcutData.map((curElem) => {
              return (
                <>
                  <div className="product_images">
                    <div className="main-screen">
                      <img
                        src={`/uploads/${curElem.imgpath}`}
                        style={{ width: "50vh" }}
                      />
                    </div>
                  </div>
            <div className="product-data">
              <h2>{curElem.name}</h2>
              <p className="product-data-price product-data-real-price">
                MRP: <span style={{ color: "#111" }}>₹{curElem.price}</span>
              </p>
              <div className="product-data-info">
                <p>
                  ID : <span> {curElem.productId} </span>
                </p>
                <p>
                  Quantity :<span> {curElem.quantity} </span>
                </p>
              </div>
              <hr />
              <p>
                  Total :<span> {user.total/100} </span>
                </p>
            </div>
                </>
              );
            })}

          </div>
        </div>
        <div className="shipping-container">
        <h3>Shipping Details</h3>
        <div className="shipping-info">
          <div>
          <div className="product-data-info">
                <p>
                  Name : <span> {shippingData.name} </span>
                </p>
                <p>
                  Emal :<span> {shippingData.email} </span>
                </p>
                <p>
                  Phone :<span> {shippingData.phone} </span>
                </p>
              </div>
          </div>
          <div>
          <div className="product-data-info">
                <p>
                  City : <span> {shippingAddress.city} </span>
                </p>
                <p>
                  State :<span> {shippingAddress.state} </span>
                </p>
                <p>
                  Postal Code :<span> {shippingAddress.postal_code} </span>
                </p>
                <p>
                  Country :<span> {shippingAddress.country} </span>
                </p>
              </div>
          </div>

        </div>
        </div>
        </Wrapper>
      </div>
    </>
  );
}



const Wrapper = styled.section`
  .container {
    padding: 3rem 9rem;
    margin-left:20rem
  }

  .cont {
    display: flex;
    justify-content: space-between;
    aligh-items: center;
  }

  .product_images {
    display: flex;
    align-items: center;
  }

  .product-data {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 2rem;

    .product-data-warranty {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ccc;
      margin-bottom: 1rem;

      .product-warranty-data {
        text-align: center;

        .warranty-icon {
          background-color: rgba(220, 220, 220, 0.5);
          border-radius: 50%;
          width: 4rem;
          height: 4rem;
          padding: 0.6rem;
        }
        p {
          font-size: 1.4rem;
          padding-top: 0.4rem;
        }
      }
    }

    .product-data-price {
      font-weight: bold;
    }

    .product-data-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      font-size: 1.8rem;

      span {
        font-weight: bold;
      }
    }

    hr {
      max-width: 100%;
      width: 90%;
      /* height: 0.2rem; */
      border: 0.1rem solid #000;
      color: red;
    }
  }

  .product-images {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;