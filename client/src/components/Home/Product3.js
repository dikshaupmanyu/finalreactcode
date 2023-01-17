import React from 'react';
import { Link } from "react-router-dom";

const Product3 = ({features}) => {
  return (
    <>
            <div className="product3" id="product3">
        <img src={`/uploads/${features.imgpath}`} alt="" className="product3Img" />
        <div className="product3Details">
          <h1 className="product3Title">{features.fname}</h1>
          <h2 className="product3Price">₹{features.price}</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati,
            et veritatis reiciendis deleniti aliquid ipsam, cupiditate vero illo
            ullam omnis laboriosam ab iure voluptas. Placeat molestiae
            voluptatem nihil sunt ipsa nobis nulla reiciendis quibusdam? Maxime,
            beatae natus enim eligendi quos a molestias nisi, magnam pariatur
            ratione perspiciatis quibusdam mollitia nobis.
          </p>
          {/* <div className="colors">
            <div className="color"></div>
            <div className="color"></div>
          </div>
          <div className="sizes">
            <div className="size">42</div>
            <div className="size">43</div>
            <div className="size">44</div>
          </div> */}
          <Link to={`/home`}>
          <button className="product3Button">BUY NOW!</button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Product3
