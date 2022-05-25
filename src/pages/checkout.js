import React from "react";
import { useState, useContext, useEffect } from "react";
import CartContext from "../context/CartContext";

import {
  displayPrice,
  createPaymentIntent,
  cancelPaymentIntent,
} from "../stripeActions/stripeActions";

import Layout from "../components/Layout";
import Payment from "../components/Payment";
import PhysicalInformation from "../components/forms/PhysicalInformation";
import DigitalInformation from "../components/forms/DigitalInformation";
import RadioForm from "../components/forms/RadioForm";
import * as productStyles from "../styles/products.module.css";
import * as checkoutStyles from "../styles/checkout.module.css";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
  const [isPhysical, setIsPhysical] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [pi_id, setPi_id] = useState();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [physicalInformation, setPhysicalInformation] = useState({
    name: "",
    city: "",
    country: "Australia",
    line1: "",
    line2: "",
    postal_code: "",
  });

  const { state, dispatch } = useContext(CartContext);

  useEffect(() => {
    const getClientSecret = async () => {
      if (state.quantity > 0 && !clientSecret) {
        const { clientSecret, pi_id } = await createPaymentIntent(
          "price_1KocgaAwcknZyyC5R6pHEmsc",
          state.quantity
        );
        setClientSecret(clientSecret);
        setPi_id(pi_id);
      }
    };
    getClientSecret();
  }, [clientSecret]);

  return (
    <Layout>
      <div className={checkoutStyles.container}>
        <aside style={{ display: "flex", flexDirection: "column" }}>
          <div className={checkoutStyles.cartContainer}>
            <p className={checkoutStyles.cartHeaders}>Product</p>
            <p className={checkoutStyles.cartHeaders}>Quantity</p>
            <p className={checkoutStyles.cartHeaders}>Price</p>
            <div className={checkoutStyles.cartHeadersBorder}></div>
            {state && state.quantity > 0 ? (
              <>
                <div className={checkoutStyles.product}>
                  <img
                    width="auto"
                    height="150px"
                    src={state.image}
                    alt={state.name}
                  />

                  <p
                    className={productStyles.pHeader}
                    style={{ marginLeft: "10px" }}
                  >
                    {state.name}
                  </p>
                </div>
                <p style={{ textAlign: "center" }}>{state.quantity}</p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <p style={{ textAlign: "center" }}>
                    {displayPrice(state.price)}
                  </p>
                  <button
                    className={checkoutStyles.removeButton}
                    onClick={async () => {
                      dispatch({ type: "EMPTY" });
                      cancelPaymentIntent(pi_id);
                      setClientSecret("");
                    }}
                  >
                    Remove
                  </button>
                </div>
              </>
            ) : (
              <p
                style={{
                  margin: "auto",
                  gridColumn: "1/4",
                }}
              >
                Your cart is empty!
              </p>
            )}
          </div>
          <div className={checkoutStyles.totalContainer}>
            <p className={productStyles.pHeader} style={{ color: "orange" }}>
              Total:
            </p>
            <p
              className={checkoutStyles.totalPrice}
              style={{ color: "orange" }}
            >
              {state && state.quantity > 0
                ? `${displayPrice(state.price * state.quantity)}`
                : null}
            </p>
          </div>
        </aside>
        <div>
          <RadioForm
            isPhysical={isPhysical}
            setIsPhysical={setIsPhysical}
            productStyles={productStyles}
          />
          <form id="paymentForm">
            {isPhysical ? (
              <PhysicalInformation
                setPhysicalInformation={setPhysicalInformation}
                physicalInformation={physicalInformation}
                setName={setName}
                name={name}
                email={email}
                setEmail={setEmail}
              />
            ) : (
              <DigitalInformation
                productStyles={productStyles}
                setName={setName}
                name={name}
                email={email}
                setEmail={setEmail}
              />
            )}
          </form>
          {clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <Payment
                quantity={state.quantity}
                physicalInformation={physicalInformation}
                isPhysical={isPhysical}
                clientSecret={clientSecret}
                email={email}
                name={name}
                pi_id={pi_id}
              />
            </Elements>
          )}
        </div>
      </div>
    </Layout>
  );
};
export default Checkout;
