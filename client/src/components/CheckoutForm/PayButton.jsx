import React from 'react';
import axios from "axios";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from 'react-router-dom';
import { loadStripe } from "@stripe/stripe-js"; 

const PayButton = ({ cart }) => {

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
 
    if (result) { 
      return localStorage.removeItem('cart')
    } else{
      console.log(result.error); 

    }
  }; 

  return (
    <>
                     <Button variant="primary" onClick={makePayment} > 
          Checkout {cart.price} 
        </Button> 
    </>
  );
};

export default PayButton;