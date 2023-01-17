import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from 'react-router-dom';
import "../../../style/checkout.css";
import { loadStripe } from "@stripe/stripe-js"; 
// import Header from "../../user/Header";

const steps = ['Shipping address', 'Payment details'];

const Checkout = ({cart}) =>{
  console.log(cart)

  const history = useNavigate()

  const [shipping, setShipping] = useState();
  const [shippingData, setShippingData] = useState();


  const setdata = (e) => {
    const { value, name } = e.target;
    console.log(value);
    setShipping(() => {
      return { ...shipping, [name]: value, };
    });
  };


  useEffect(() => {
    localStorage.setItem('shipping', JSON.stringify(shipping));
  }, [shipping]);

  // adduser data

  const makePayment = async () => { 

    const stripe = await loadStripe("pk_test_51IuscrSBUuqsQcOU5GiILYA1Td3KgwrsUmiBl1oOQrStUXBJ7AvKlS0upqmDVRHJ9fKP75FYTJbPTTZKBUnDQWW100WMgJB5w9"); 
    const body = { cart }; 
    const headers = { 
      "Content-Type": "application/json", 
    }; 

 
    const response = await fetch( 
      "/api/create-checkout-session", 
      { 
        method: "POST", 
        headers: headers, 
        body: JSON.stringify(body), 
      } 
    ); 
 
    const session = await response.json(); 
 
    const result = stripe.redirectToCheckout({ 
      sessionId: session.id, 
    }); 
 
    if (result.error) { 
      console.log(result.error); 
    } 
  }; 

  return (
    <>


    
    {/* <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">Checkout</Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === steps.length ? <Form/> : []}
          
        </Paper>
      </main> */}

{/* <Header size={cart}/> */}
      <div className="containers">
        <h1>Shipping</h1>
        <p>Please enter your shipping details.</p>
        <hr />
        <div className="form">
          <div className="fields fields--2">
            <label className="field">
              <span className="field__label" for="firstname">
                First name
              </span>
              <input
                className="field__input"
                type="text"
                id="firstname"
                name="firstname"
                onChange={setdata}
              />
            </label>
            <label className="field">
              <span className="field__label" for="lastname">
                Last name
              </span>
              <input
                className="field__input"
                type="text"
                id="lastname"
                name="lastname"
                onChange={setdata}
              />
            </label>
          </div>
          <label className="field">
            <span className="field__label" for="address">
              Address
            </span>
            <input className="field__input" type="text" id="address" name="address" onChange={setdata} />
          </label>
          <label className="field">
            <span className="field__label" for="country">
              Country
            </span>
            <input className="field__input" type="text" id="country" name="country" onChange={setdata} />
          </label>
          <div className="fields fields--3">
            <label className="field">
              <span className="field__label" for="zipcode">
                Zip code
              </span>
              <input className="field__input" type="number" id="zipcode" name="zip" onChange={setdata}/>
            </label>
            <label className="field">
              <span className="field__label" for="city">
                City
              </span>
              <input className="field__input" type="text" id="city" name="city"  onChange={setdata}/>
            </label>
            <label className="field">
              <span className="field__label" for="state">
                State
              </span>
              <input className="field__input" type="text" id="state" name="state"  onChange={setdata}/>
            </label>
          </div>
        </div>
        <hr
          style={{
            background: "white",
            color: "white",
            borderColor: "lime",
            height: "3px",
          }}
        />
                <Button variant="primary" onClick={makePayment} > 
          Buy Now for {cart.price} 
        </Button> 
        {/* <StripeCheckout 
      stripeKey="pk_test_51IuscrSBUuqsQcOU5GiILYA1Td3KgwrsUmiBl1oOQrStUXBJ7AvKlS0upqmDVRHJ9fKP75FYTJbPTTZKBUnDQWW100WMgJB5w9"
      token={makePayment}
      name="Payment"
      amount={product.price * 100}
    >
      <button className="btn-large red">checkout</button>
      </StripeCheckout> */}
      </div>
    </>
  );
};

export default Checkout;
