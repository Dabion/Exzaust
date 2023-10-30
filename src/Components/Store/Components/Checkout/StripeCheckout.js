import React from "react";
import { useState } from "react"; 
//import StripeCheckout from "react-stripe-checkout";
import { loadStripe } from "@stripe/stripe-js";
import {showuserdata, useAuth } from "../../../../Context/AuthContext"




let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
  }

  return stripePromise;
};

const Checkout = () => {


  const { currentUser } = useAuth()
  const [emailRef, setEmailref] = useState("")
  
  
  if(currentUser !== null){
    let bar = showuserdata(currentUser.uid)
      bar.then((results) => {
        setEmailref(results.email)
      }).catch(err=>console.log(err))
  }


  const [stripeError, setStripeError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const item = {
    price: "price_1Lq6ftF5HjznHdQ51XnHF0bt",
    quantity: 1
  };

  const checkoutOptions = {
    lineItems: [item],
    mode: "payment",
    customerEmail: emailRef,
    shippingAddressCollection:{ allowedCountries:['US','CA']},
    successUrl: `${window.location.origin}/Success`,
    cancelUrl: `${window.location.origin}/Cancel`
  };

  const redirectToCheckout = async () => {
    setLoading(true);
    console.log("redirectToCheckout");

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOptions);
    console.log("Stripe checkout error", error);

    if (error) setStripeError(error.message);
    setLoading(false);
  };

  if (stripeError) alert(stripeError);


  if (currentUser){
  return (
    
    <button
        className="checkout-button"
        onClick={redirectToCheckout}
        disabled={isLoading}
      >
        <div className="text-container">
          <p className="text">{isLoading ? "Loading..." : "Buy"}</p>
        </div>
      </button>
    
  );
  }
  else {
    return(
      <div>
        Must Be signed in to purchase item 
      </div>
    )
  }
};

export default Checkout;
