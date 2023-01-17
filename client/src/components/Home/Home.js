import React, { useState, useEffect, useContext } from "react";
import "./Home1.css";
import NewSeason from "./NewSeason";
import Features1 from "./Features1";
import Header1 from "../user/Header1";
import Footer from "./Footer";
import Product3 from "./Product3";
import Gallery from "./Gallery";
import axios from "axios";
import { Link } from "react-router-dom";
import { LoginContext } from "../../context/Context";


const Home = ({cart, bag}) => {
  // Sketch();

  const { logindata, setLoginData } = useContext(LoginContext);
  console.log(logindata);
  const [data, setData] = useState();
  const [features, setFeatures] = useState({
    fname: "Air Force",
    price: "7777",
    imgpath: "image-1672220271005. air.png",
  });
  // const [show, setShow] = useState(false);

  const getUserData = async () => {
    const res = await axios.get("/featureProduct", {
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

  ////////////////

  const DashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");

    const res = await fetch("/validuser", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    });

    console.log(res)
    const data = await res.json();

    if (data.status == 401 || !data) {
        // history("*");
    } else {
        console.log("user verify");
        setLoginData(data)
        // history("/dash");
    }
}
//////////////
  useEffect(() => {
    getUserData();
    DashboardValid();
  }, []);

  return (
    <>
      {/* <Navbar /> */}
      <Header1 cart={cart} bag={bag}/>
      <div className="slider">
        <div className="sliderWrapper">
          <div className="sliderItem">
            <img
              src={`/uploads/${features.imgpath}`}
              alt=""
              className="sliderImg"
            />
            <div className="sliderBg">{features.color}</div>
            <h1 className="sliderTitle">{features.fname}</h1>
            <h2 className="sliderPrice">₹{features.price}</h2>
            <Link to={`/home`}>
              <button className="buyButton">BUY NOW!</button>
            </Link>
          </div>
          {/* <div className="sliderItem">
            <img src="../images/jordan.png" alt="" className="sliderImg" />
            <div className="sliderBg"></div>
            <h1 className="sliderTitle">JORDAN NEW SEASON</h1>
            <h2 className="sliderPrice">$149</h2>
            <a href="#product">
              <button className="buyButton">BUY NOW!</button>
            </a>
          </div>
          <div className="sliderItem">
            <img src="../images/blazer.png" alt="" className="sliderImg" />
            <div className="sliderBg"></div>
            <h1 className="sliderTitle">BLAZE NEW SEASON</h1>
            <h2 className="sliderPrice">$109</h2>
            <a href="#product">
              <button className="buyButton">BUY NOW!</button>
            </a>
          </div>
          <div className="sliderItem">
            <img src="../images/crater.png" alt="" className="sliderImg" />
            <div className="sliderBg"></div>
            <h1 className="sliderTitle">CRATER NEW SEASON</h1>
            <h2 className="sliderPrice">$129</h2>
            <a href="#product">
              <button className="buyButton">BUY NOW!</button>
            </a>
          </div>
          <div className="sliderItem">
            <img src="../images/hippie.png" alt="" className="sliderImg" />
            <div className="sliderBg"></div>
            <h1 className="sliderTitle">HIPPIE NEW SEASON</h1>
            <h2 className="sliderPrice">$99</h2>
            <a href="#product">
              <button className="buyButton">BUY NOW!</button>
            </a>
          </div> */}
        </div>
      </div>

      <div style={{ marginLeft: "40px" }}>
        <div className="intro-data">Check Now!</div>
        <div className="common-heading">Our Feature Services</div>
      </div>
      <div className="features">
        {data &&
          data.map((curElem, index) => {
            return (
              <div className="feature" onClick={() => setFeatures(curElem)}>
                <img
                  src={`/uploads/${curElem.imgpath}`}
                  alt={curElem.fname}
                  className="featureIcon"
                />
                <span className="featureTitle">{curElem.fname}</span>
                {/* <span className="featureDesc">{curElem.price}</span> */}
              </div>
            );
          })}
      </div>

      <Product3 features={features} />
      <Features1 />
      <Gallery />
      <NewSeason />
      <Footer />
    </>
  );
};

export default Home;
