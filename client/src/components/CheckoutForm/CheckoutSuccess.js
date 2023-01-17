import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "../../style/checkoutSuccess.css";

const CheckoutSuccess = () => {
  return (
    <>
      <div className='con'>

      <div className="card-1">
      <h2>Thanks for your order!</h2> 
      <div className="checkmark">
        <i className="checkmark">✓</i>
      </div>
        <h1 className='heading-success'>Your payment is successful.</h1> 
        <p>We received your purchase request;<br/> we'll be in touch shortly!</p>
      </div>
      </div>
    </>
  )
}

export default CheckoutSuccess
