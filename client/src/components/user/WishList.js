import React, { useState } from "react";
import {  Link, useNavigate } from "react-router-dom";
// import "./wishList.css";
import PayButton from "../CheckoutForm/PayButton";
import PageNavigation from "../PageNavigation";
import Header1 from "./Header1";

const WishList = ({ cart, cartS, bag, bagL, setCart, setBag, AddToCart, wishList }) => {
  const [price, setPrice] = useState(0);
  const history = useNavigate();

  const handleRemoves = (id) => {
    const arr = bag.filter((item) => item._id !== id);
    setBag(arr);
    // handlePrice();
  };


  //////////////////////////////////////////////////////////////////////////////////

  return (
    <>
 <Header1 bag={bagL} cart={cartS}/>
      <PageNavigation title={"WishList"} />

      <div className="cart-container">
        <h2>WishList</h2>
        {bagL === 0 ? (
          <div className="cart-empty">
            <p>Your wishlist is currently empty</p>
            <div className="start-shopping">
              <Link to="/home">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-arrow-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                  />
                </svg>
                <span>Start Shopping</span>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="titles">
              <h3 className="product-title">Product</h3>
              <h3 className="price">Price</h3>
              {/* <h3 className="quantity">Quantity</h3> */}
              <h3 className="total">Add</h3>
            </div>
            <div className="cart-items">
              {wishList &&
                wishList.map((cartItem,i) => (
                  <div className="cart-item" key={i}>
                    <div className="cart-product">
                      <img
                        src={`/uploads/${cartItem.imgpath}`}
                        alt={cartItem.fname}
                      />
                      <div>
                        <h3>{cartItem.fname}</h3>
                        <p>{cartItem.description}</p>
                        <button onClick={() => handleRemoves(cartItem._id)}>
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="cart-product-price">${cartItem.price}</div>

                    <div className="cart-summarys cart-product-total-price">
                    <button className="clear-btn" onClick={() => AddToCart(cartItem)}>Add to Cart</button>
                    </div>
                  </div>
                ))}
            </div>
            <div className="cart-summarys">
              <button className="clear-btn">Clear Cart</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default WishList;
