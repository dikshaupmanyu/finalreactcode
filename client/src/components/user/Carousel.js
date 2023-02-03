import React from "react";
import { NavLink } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useFilterContext } from "../../context/filter_context";

const Carousels = () => {
  const { all_products, filter_products } = useFilterContext();
  console.log(all_products);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
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

  return (
    <>
      <Carousel responsive={responsive}>
        {all_products.map((product, index) => {
          return (
            <>
              {/* <NavLink to={`/cartDetail/${product._id}`} key={product._id}> */}
                {/* <button className="btn btn-primary">Order Now</button> */}
                <a href={`/cartDetail/${product._id}`}>
              <div
                className="card_corousel"
                style={{ width: "60%", height: "20%" }}
              >
                <div style={{ height: "20%", textAlign: "center" }}>
                  <img
                    src={`/uploads/${product.imgpath}`}
                    style={{ width: "40%" }}
                  />
                </div>
                <p>{product.fname}</p>
              </div>
                </a>
              {/* </NavLink> */}
            </>
          );
        })}
      </Carousel>
    </>
  );
};

export default Carousels;
