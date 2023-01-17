import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
// import Button from "react-bootstrap/Button";
import axios from "axios";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Button } from "../../style/Button";

const Cart = ({ item, handleClick, products, tempdata, value, searchFilter }) => {
  const { _id, fname, description, category, subcategory, imgpath, price } =
    item;
  const history = useNavigate();

  const [show, setShow] = useState(false);

  const dltUser = async (id) => {
    const res = await axios.delete(`/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res);

    if (res.response.status === 201 || !res.data) {
      console.log("user delete");
      setShow(true);
    } else {
      console.log("errror");
    }
  };

  useEffect(() => {
    // getUserData();
  }, [dltUser]);

  return (
    <>
      <div className="home-container" style={{ width: "50%" }}>
        <>
          <Link to={`/cartDetail/${_id}`} key={_id}>
            <div className="products">
              <div key={_id} className="product">
                <h3>{fname}</h3>
                <figure>
                  <img src={`/uploads/${imgpath}`} alt={fname} />
                  <figcaption className="caption">{category}</figcaption>
                </figure>
                {/* <div className="card-data"> */}
                  <div className="card-data-flex d-flex justify-content-md-between align-items-baseline">
                    <h3>{description}</h3>
                    <p className="card-data--price">₹{price}</p>
                  </div>
               

                {/* <Button className="btn" onClick={() => handleClick(item)}>Add To Cart</Button> */}
              </div>
            </div>
          </Link>
        </>
      </div>
    </>
  );
};

export default Cart;
