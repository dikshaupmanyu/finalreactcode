import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "../../style/CartItem.css";
import PayButton from "../CheckoutForm/PayButton";
import PageNavigation from "../PageNavigation";
import Header1 from "./Header1";

const CartItem = ({ cart, cartS, bag,  setCart, handleChange }) => {
  const [price, setPrice] = useState(0);
  const history = useNavigate();

  const handlePrice = () => {
    let ans = 0;
    cart.map((item) => (ans += item.quantity * item.price));
    setPrice(ans);
  };

  const handleRemove = (id) => {
    const arr = cart.filter((item) => item._id !== id);
    setCart(arr);
    // handlePrice();
  };

  useEffect(() => {
    handlePrice();
  });

  //////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <Header1 bag={bag} cart={cartS}/>
      <PageNavigation title={"CartItem"} />

      <div className="cart-container">
        <h2>Shopping Cart</h2>
        {cart.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is currently empty</p>
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
              <h3 className="quantity">Quantity</h3>
              <h3 className="total">Total</h3>
            </div>
            <div className="cart-items">
              {cart &&
                cart.map((cartItem) => (
                  <div className="cart-item" key={cartItem._id}>
                    <div className="cart-product">
                      <img
                        src={`/uploads/${cartItem.imgpath}`}
                        alt={cartItem.fname}
                      />
                      <div>
                        <h3>{cartItem.fname}</h3>
                        <p>{cartItem.description}</p>
                        <button onClick={() => handleRemove(cartItem._id)}>
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="cart-product-price">${cartItem.price}</div>
                    <div className="cart-product-quantity">
                      <button onClick={() => handleChange(cartItem, -1)}>
                        -
                      </button>
                      <div className="count">{cartItem.quantity}</div>
                      {cartItem.stock === cartItem.quantity ? (
                        <button
                          disabled
                          onClick={() => handleChange(cartItem, +1)}
                        >
                          +
                        </button>
                      ) : (
                        <button onClick={() => handleChange(cartItem, +1)}>
                          +
                        </button>
                      )}
                    </div>
                    <div className="cart-product-total-price">
                      ${cartItem.price * cartItem.quantity}
                    </div>
                  </div>
                ))}
            </div>
            <div className="cart-summary">
              <button className="clear-btn">Clear Cart</button>
              <div className="cart-checkout">
                <div className="subtotal">
                  <span>Subtotal</span>
                  <span className="amount">${price}</span>
                </div>
                <p>Taxes and shipping calculated at checkout</p>
                <PayButton cart={cart} />

                <div className="continue-shopping">
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
                    <span>Continue Shopping</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartItem;
