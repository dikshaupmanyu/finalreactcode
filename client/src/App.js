import "./App.css";
import React, { useEffect, useState, createContext, useReducer, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import { Routes, Route, Router, useParams } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./GlobalStyles";
import { initialState, reducer } from "./reducer/UseReducer";

import Checkout from "./components/CheckoutForm/checkout/Checkout";
import Update from "./components/Update";
// import Product from "./components/admin/Product";

// USER
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import CartItem from "./components/user/CartItem";
import Payment from "./components/CheckoutForm/Payment";
import CheckoutSuccess from "./components/CheckoutForm/CheckoutSuccess";
import CheckoutCancle from "./components/CheckoutForm/CheckoutCancle";
import CartDetail from "./components/user/CartDetail";
import Products from "./components/user/Products";
import WishList from "./components/user/WishList";
import MyOrders from "./components/user/MyOrders";

// admin
import Admin from "./components/admin/Admin";
import Orders from "./components/admin/pages/Orders/Orders";
import Login from "./components/admin/login";
import ListCategory from "./components/admin/List/ListCategory";
import EditCategory from "./components/EditC";
import ListSubcategory from "./components/admin/List/ListSubcategory";
import EditSubCategory from "./components/EditSC";
import Subcategory from "./components/admin/Subcategory";
import Homes from "./components/admin/pages/Home/Home";
import Category from "./components/admin/Category";
import UserList from "./components/admin/pages/userList/UserList";
import User from "./components/admin/pages/User/User";
import NewUser from "./components/admin/pages/NewUser/NewUser";
import ProductList from "./components/admin/pages/ProductList/ProductList";
import Product from "./components/admin/pages/Product/Product";
import NewProduct from "./components/admin/pages/newProduct/NewProduct";
import FeatureP from "./components/admin/pages/FeatureProduct/FeatureP";

import Home from "./components/Home/Home";
import { LoginContext } from "./context/Context";
// const params = useParams();

const theme = {
  colors: {
    heading: "rgb(24 24 29)",
    text: "rgba(29 ,29, 29, .8)",
    white: "#fff",
    black: " #212529",
    helper: "#8490ff",

    bg: "#F6F8FA",
    footer_bg: "#0a1435",
    btn: "rgb(98 84 243)",
    border: "rgba(98, 84, 243, 0.5)",
    hr: "#ffffff",
    gradient:
      "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
    shadow:
      "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
    shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
  },
  media: {
    mobile: "768px",
    tab: "998px",
  },
};

const getlocalData = () => {
  let cartdata = localStorage.getItem("cart");
  // console.log(cartdata)
  if (cartdata) {
    return JSON.parse(localStorage.getItem("cart"));
  } else {
    return [];
  }

};

const getlocalBagData = () => {
  let bagdata = localStorage.getItem("bag");
  if(bagdata){
    return JSON.parse(localStorage.getItem("bag"));
  }else{
    return [ ];
  }
  
}
export  const UserContext = createContext();
function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { logindata, setLoginData } = useContext(LoginContext);
  // console.log(logindata);
  const [show, setShow] = useState(false);
  const [cart, setCart] = useState(getlocalData());
  const [bag, setBag] = useState(getlocalBagData());
  const [warning, setWarning] = useState(false);
  const [success, setSuccess] = useState(false);
  const [warning1, setWarning1] = useState(false);
  const [success1, setSuccess1] = useState(false);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("bag", JSON.stringify(bag));
    DashboardValid();
  }, [cart, bag]);

  const DashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");

    const res = await fetch("/validuser", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    });

    const data = await res.json();

    if (data.status == 401 || !data) {
        // history("*");
    } else {
        console.log("user verify");
        setLoginData(data)
        // history("/dash");
    }
}


  ////////////////////////////////////////////////  ADD TO CART
  const AddToCart = (item) => {
    let isPresent = false;

    cart.forEach((product) => {
      // console.log(product)
      if (item._id === product._id) isPresent = true;
    });
    if (isPresent) {
      setWarning(true);
      setTimeout(() => {
        setWarning(false);
      }, 2000);
      return;
    } else {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    }

    setCart([...cart, item]);
  };

  // ////////////////////////////////////////////////////   ADD TO BAG
  const AddToBag = (item) => {
    let isPresent = false;

    cart.forEach((product) => {
      // console.log(product)
      if (item._id === product._id) isPresent = true;
    });
    if (isPresent) {
      setWarning1(true);
      setTimeout(() => {
        setWarning1(false);
      }, 2000);
      return;
    } else {
      setSuccess1(true);
      setTimeout(() => {
        setSuccess1(false);
      }, 2000);
    }

    setBag([...bag, item]);
  };

  const handleChange = (item, d) => {
    // console.log(item,d)
    let ind = -1;
    cart.forEach((data, index) => {
      // console.log(data)
      if (data._id === item._id) ind = index;
    });
    const tempArr = cart;
    tempArr[ind].quantity += d;
    if (tempArr[ind].quantity === 0) tempArr[ind].quantity = 1;
    setCart([...tempArr]);
  };

  return (



    <>

      {warning && (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          Item is already added to your cart
        </Alert>
      )}
      {success && (
        <Alert variant="success" onClose={() => setShow(false)} dismissible>
          Item Added to Cart
        </Alert>
      )}
      {warning1 && (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          Item is already added to your Bag
        </Alert>
      )}
      {success1 && (
        <Alert variant="success" onClose={() => setShow(false)} dismissible>
          Item Added to Bag
        </Alert>
      )}
      <UserContext.Provider value={{state, dispatch}}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Routes>
            {/* USER ROUTES */}
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route
              path="/cartItem"
              element={
                <CartItem
                bag={bag.length}
                  cart={cart}
                  cartS={cart.length}
                  setCart={setCart}
                  handleChange={handleChange}
                />
              }
            />
            <Route
              path="/wishList"
              element={
                <WishList
                bag={bag}
                bagL={bag.length}
                wishList={bag}
                  cart={cart}
                  cartS={cart.length}
                  setCart={setCart}
                  AddToCart={AddToCart}
                  setBag={setBag}
                />
              }
            />
            <Route path="/payment" element={<Payment />} />
            <Route path="/success" element={<CheckoutSuccess />} />
            <Route path="/cancle" element={<CheckoutCancle />} />
            <Route path="/products" element={<Products cart={cart.length} bag={bag.length}/>} />
            <Route
              path="/cartDetail/:id"
              element={
                <CartDetail AddToCart={AddToCart} AddToBag={AddToBag} bag={bag.length}  cart={cart.length} />
              }
            />
            <Route path="/Homes" element={<Homes />}></Route>
            <Route path="/" element={<Home cart={cart.length} bag={bag.length}/>} />

            {/* ADMIN ROUTES */}
            <Route path="/admin" element={<Admin />}>
              {" "}
            </Route>
            <Route path="/orders" element={<Orders />} />
            <Route path="/myorders" element={<MyOrders cart={cart.length} bag={bag.length}/>} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/addCategory" element={<Category />} />
            <Route path="/categoryList" element={<ListCategory />} />
            <Route path="/editCategory/:id" element={<EditCategory />} />
            <Route path="/addSubcategory" element={<Subcategory />} />
            <Route path="/subcategoryList" element={<ListSubcategory />} />
            <Route path="/editSubCategory/:id" element={<EditSubCategory />} />
            <Route path="/users" element={<UserList />}></Route>
            <Route path="/user/:id" element={<User />}></Route>
            <Route path="/newUser" element={<NewUser />}></Route>
            <Route path="/productList" element={<ProductList />}></Route>
            <Route path="/product/:id" element={<Product />}></Route>
            <Route path="/newProduct" element={<NewProduct />}></Route>
            <Route path="/featureProductList" element={<FeatureP />}></Route>
          </Routes>
        </ThemeProvider>
      </UserContext.Provider>
      {/* </Router> */}
    </>
  );
}

export default App;
