import React, { useEffect, useState } from "react";
import "./cartDetail.css";
import { useParams } from "react-router-dom";
import Header1 from "./Header1";
import styled from "styled-components";
import { FiHeart } from "react-icons/fi";
import { TbTruckDelivery, TbReplace } from "react-icons/tb";
import { MdSecurity } from "react-icons/md";
import { Button } from "../../style/Button";
import PageNavigation from "../PageNavigation";
// import Carousels from "./Carousel";
import { NavLink } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useFilterContext } from "../../context/filter_context";
import axios from "axios";

const CartDetail = ({ cart, bag, AddToCart, AddToBag }) => {
  const { all_products, filter_products } = useFilterContext();
  const [inddata, setIndedata] = useState("");

  const filtered = all_products.filter((cat) => {
    return cat.category === inddata.category;
  });

  // ///////   GET RENDOM DATA 
  var shuffled = filtered.sort(function () {
    return 0.5 - Math.random();
  });

  var selected = shuffled.slice(0, 5);

  console.log(selected);

  const params = useParams();

  const getProductDetails = async () => {
    // console.log(params)
    let result = await fetch(`/product/${params.id}`);
    result = await result.json();
    setIndedata(result);
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  return (
    <>
      <Header1 cart={cart} bag={bag} />
      <PageNavigation title={inddata.fname} />
      <Wrapper>
        <div className="container">
          <div className="cont">
            <div className="product_images">
              {/* <MyImage imgs={inddata.images} /> */}
              <div className="main-screen">
                <img
                  src={`/uploads/${inddata.imgpath}`}
                  alt={inddata.fname}
                  style={{ width: "50vh" }}
                />
              </div>
            </div>

            <div className="product-data">
              <h2>{inddata.fname}</h2>
              <p className="product-data-price product-data-real-price">
                MRP: <span style={{ color: "#111" }}>₹{inddata.price}</span>
              </p>
              <p>{inddata.description}</p>
              <div className="product-data-warranty">
                <div className="product-warranty-data">
                  <TbTruckDelivery className="warranty-icon" />
                  <p>Free Delivery</p>
                </div>

                <div className="product-warranty-data">
                  <TbReplace className="warranty-icon" />
                  <p>30 Days Replacement</p>
                </div>

                <div className="product-warranty-data">
                  <TbTruckDelivery className="warranty-icon" />
                  <p>YR Delivery</p>
                </div>

                <div className="product-warranty-data">
                  <MdSecurity className="warranty-icon" />
                  <p>2 Year Warranty</p>
                </div>
              </div>
              <div className="product-data-info">
                <p>
                  Available:
                  <span>
                    {" "}
                    {inddata.stock > 0 ? "In Stock" : "Not Available"}
                  </span>
                </p>
                <p>
                  ID : <span> {inddata._id} </span>
                </p>
                <p>
                  Brand :<span> {inddata.category} </span>
                </p>
              </div>
              <hr />
              <div style={{ display: "flex" }}>
                {inddata.stock > 0 && (
                  <Button
                    className="btn"
                    onClick={() => AddToCart(inddata)}
                    style={{ marginRight: "10px" }}
                  >
                    Add To Cart
                  </Button>
                )}
                {inddata.stock > 0 && (
                  <Button className="btn" onClick={() => AddToBag(inddata)}>
                    <FiHeart
                      className="cart-trolley"
                      style={{ marginRight: "7px" }}
                    />
                    WishList
                  </Button>
                )}
              </div>
              {/* <Button className="btn" onClick={() => handleClick(inddata)}>Add To Cart</Button> */}
            </div>
          </div>
        </div>
      </Wrapper>
      <Carousel
        responsive={responsive}
        autoPlay={true}
        autoPlaySpeed={1000}
        style={{ padding: "50px", paddingLeft: "100px" }}
      >
        {selected.map((product, index) => {
          return (
            <>
              {/* <NavLink to={`/cartDetail/${product._id}`} key={product._id}> */}
              <a href={`/cartDetail/${product._id}`}>
                <div className="carousels">
                  <div className="carousel">
                    <img
                      src={`/uploads/${product.imgpath}`}
                      alt={product.fname}
                      className="carouselIcon"
                    />
                    <span className="carouselTitle">{product.fname}</span>
                    {/* <span className="featureDesc">{curElem.price}</span> */}
                  </div>
                </div>
              </a>
              {/* </NavLink> */}

              {/* <a href={`/cartDetail/${product._id}`}>
                <div
                  className="card_corousel"
                  style={{ width: "60%", height: "20%", marginLeft:"50px" }}
                >
                  <div style={{ height: "20%", textAlign: "center" }}>
                    <img
                      src={`/uploads/${product.imgpath}`}
                      style={{ width: "20rem" }}
                    />
                  </div>
                  <p>{product.fname}</p>
                </div>
              </a> */}
            </>
          );
        })}
      </Carousel>
    </>
  );
};

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Wrapper = styled.section`
  .container {
    padding: 9rem 0;
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

export default CartDetail;
