import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import "./productList.css";

const ProductsList = ({ products, tempdata, value }) => {
  console.log(value);
  return (
    <Wrapper className="section">
      <div className="row">
        {value === "All"
          ? products.map((curElem) => {
              return (
                <>
                  <div className="col-6 mb-4">
                    <div className="menu-items container-fluid mt-5">
                      <div className="row">
                        <div className="col mx-auto">
                          <div className="row ">
                            <div
                              className="Item1 col-12 col-md-6 col-lg-6 col-xl-4 my-3"
                              key={curElem.id}
                              style={{ width: "80%" }}
                            >
                              <div className="row Item-inside">
                                {/* only for image  */}
                                <div className="col-12 col-md-12 col-lg-4 img-div">
                                  <img
                                    src={`/uploads/${curElem.imgpath}`}
                                    alt="menu-img"
                                    className="img-fluid"
                                  />
                                </div>

                                {/* for the rest of the data  */}
                                <div className="col-12 col-md-12 col-lg-8 ">
                                  <div className="main-title pt-4 pb-3">
                                    <h1>{curElem.fname}</h1>
                                    <p>{curElem.description}</p>
                                  </div>
                                  <div className="menu-price-book">
                                    <div className="price-book-divide d-flex justify-content-between align-items-center">
                                      <h2>Price : {curElem.price}</h2>
                                      <NavLink
                                        to={`/cartDetail/${curElem._id}`}
                                        key={curElem._id}
                                      >
                                        <button className="btn btn-primary">
                                          Order Now
                                        </button>
                                      </NavLink>
                                    </div>
                                    <p>*Prices may vary on selected date.</p>
                                  </div>
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
          : tempdata.map((curElem) => {
              return (
                <>
                <div className="col-6 mb-4">
                  <div className="menu-items container-fluid mt-5">
                    <div className="row">
                      <div className="col mx-auto">
                        <div className="row ">
                          <div
                            className="Item1 col-12 col-md-6 col-lg-6 col-xl-4 my-3"
                            key={curElem.id}
                            style={{ width: "80%" }}
                          >
                            <div className="row Item-inside">
                              {/* only for image  */}
                              <div className="col-12 col-md-12 col-lg-4 img-div">
                                <img
                                  src={`/uploads/${curElem.imgpath}`}
                                  alt="menu-img"
                                  className="img-fluid"
                                />
                              </div>

                              {/* for the rest of the data  */}
                              <div className="col-12 col-md-12 col-lg-8 ">
                                <div className="main-title pt-4 pb-3">
                                  <h1>{curElem.fname}</h1>
                                  <p>{curElem.description}</p>
                                </div>
                                <div className="menu-price-book">
                                  <div className="price-book-divide d-flex justify-content-between align-items-center">
                                    <h2>Price : {curElem.price}</h2>
                                    <NavLink
                                      to={`/cartDetail/${curElem._id}`}
                                      key={curElem._id}
                                    >
                                      <button className="btn btn-primary">
                                        Order Now
                                      </button>
                                    </NavLink>
                                  </div>
                                  <p>*Prices may vary on selected date.</p>
                                </div>
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
            })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  @import url("https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@200;400&display=swap");

  * {
    font-family: "Josefin Sans", sans-serif;
  }

  .main-heading {
    color: #5d4037;
  }

  .Item-inside {
    height: 220px;
    border-radius: 12px;
    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
      0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
      0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
      0 100px 80px rgba(0, 0, 0, 0.12);
  }

  .Item-inside:hover img,
  .Item-inside:hover .btn {
    transform: scale(1.1);
  }

  .img-div {
    padding: 0;
  }

  img {
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
    object-fit: cover;
    transition: all 0.3s ease-in-out;
  }

  .img-fluid {
    height: 220px;
  }

  .main-title h1 {
    font-size: 25px;
    font-weight: bold;
    text-transform: uppercase;
  }

  .price-book-divide h2 {
    font-size: 20px;
    font-weight: 400;
    color: #4db6ac;
  }

  .price-book-divide {
    margin-bottom: 10px;
  }

  .row {
    margin-right: 0;
    margin-left: 0px;
  }

  .btn-primary {
    background-color: #4db6ac;
    outline: none;
    border: none;
    transition: all 0.3s ease-in-out;
  }

  .btn-primary:hover {
    background-color: #00695c;
    outline: none;
    border: none;
  }

  .btn-warning:hover {
    background-color: black;
    color: whitesmoke;
    outline: none;
  }
`;

export default ProductsList;
