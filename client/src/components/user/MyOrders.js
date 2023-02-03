import React, { useEffect, useState } from "react";
import Header1 from "./Header1";
import { NavLink } from "react-router-dom";

const MyOrders = ({ cart, bag }) => {
  const [myOrder, setMyOrder] = useState([]);
  console.log(myOrder);

  const [email, setEmail] = useState(localStorage.getItem("userDataEmail"));
  // console.log(email);
  const DashboardValid = async () => {
    // let token = localStorage.getItem("usersdatatoken");

    const res = await fetch("/myOrder", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": email
      },
    });

    const data = await res.json();

    if (data.status === 401 || !data) {
      // history("*");
    } else {
      console.log("user verify");
      // if(email == data.shipping.email){

      setMyOrder(data.getCat);
      // }
      // history("/dash");
    }
  };

  useEffect(() => {
    DashboardValid();
  }, []);

  return (
    <>
      <>
        <Header1 bag={bag} cart={cart} />
        {/* <PageNavigation title={"WishList"} /> */}

        <div className="cart-container">
          <h2>My Orders</h2>
          {myOrder.length === 0 ? (
            <div className="cart-empty">
              <p>Your wishlist is currently empty</p>
              <div className="start-shopping">

              </div>
            </div>
          ) : (
            <div>
              {/* <div className="titles">
                <h3 className="product-title">Product</h3>
                <h3 className="price">Price</h3>
                <h3 className="quantity">Quantity</h3>
                <h3 className="quantity">Product ID</h3>
              </div> */}
              {/* <h3 className="price">name</h3> */}
              {/* <h3 className="total">Add</h3> */}
              <div className="cart-items">
                {myOrder.map((cartItem, i) => (
                  <div className="mb-4">
                    {cartItem.shipping.email === email
                      ? cartItem.products.map((curElem) => {
                          return (
                            <>
                              <div className="menu-items container-fluid mt-5">
                                <div className="row">
                                  <div className="col mx-auto">
                                    <div className="row ">
                                      <div
                                        className="Item1 col-12 col-md-6 col-lg-6 col-xl-4 my-3"
                                        key={curElem.id}
                                        style={{ width: "100%" }}
                                      >
                                        <div
                                          className="row Item-inside-1"
                                          style={{ height: "40rem !important" }}
                                        >
                                          <div
                                            style={{
                                              display: "flex",
                                              justifyContent: "space-between",
                                              padding: "15px",
                                              borderBottom:
                                                "1px solid rgb(187, 187, 187)",
                                            }}
                                          >
                                            <div style={{ display: "flex" }}>
                                              <div>
                                                <h5>Order Placed</h5>
                                                <p>{cartItem.createdAt.slice(0, 10)}</p>
                                              </div>
                                              <div style={{marginLeft:"30px"}}>
                                                <h4>Total</h4>
                                                <p>{cartItem.total/100}</p>
                                              </div>
                                            </div>
                                            <div>
                                              <h4>OrderId</h4>
                                              <p>{cartItem._id}</p>
                                            </div>
                                          </div>
                                          <div className="col-12 col-md-12 col-lg-4 img-div">
                                            <img
                                              src={`/uploads/${curElem.imgpath}`}
                                              alt="menu-img"
                                              className="img-fluid-1"
                                            />
                                          </div>

                                          {/* for the rest of the data  */}
                                          <div className="col-12 col-md-12 col-lg-8 ">
                                            <div className="main-title pt-4 pb-3">
                                              <h1>{curElem.name}</h1>
                                              <p>{curElem.description}</p>
                                            </div>
                                            <div className="menu-price-book">
                                              <div className="price-book-divide d-flex justify-content-between align-items-center">
                                                <h2>Price : {curElem.price}</h2>
                                                <NavLink
                                                  to={`/cartDetail/${curElem._id}`}
                                                  key={curElem._id}
                                                >
                                                  <button className="btn btn-primary" style={{width:"20rem", marginRight:"15px"}}>
                                                    Buy it again
                                                  </button>
                                                </NavLink>
                                               
                                              </div>
                                              <p>Qut: {curElem.quantity}</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        })
                      : ""}

                    <div className="cart-summarys cart-product-total-price"></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </>
    </>
  );
};

export default MyOrders;
