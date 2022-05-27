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
  const [quantity, setQuantity] = useState();
  const [error, setError] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [isPhysical, setIsPhysical] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [pi_id, setPi_id] = useState();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState();
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
    let isMounted = true;
    const getClientSecret = async () => {
      if (state.quantity > 0 && !clientSecret) {
        const { clientSecret, pi_id, amount, quantity } =
          await createPaymentIntent(
            "price_1KocgaAwcknZyyC5R6pHEmsc",
            state.quantity
          );
        if (isMounted) {
          setClientSecret(clientSecret);
          setPi_id(pi_id);
          setAmount(amount);
          setQuantity(quantity);
        }
      }
    };
    getClientSecret();
    return () => (isMounted = false);
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
            {state && state.quantity >= 1 ? (
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
                <p style={{ textAlign: "center" }}>{quantity}</p>
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
                      setAmount(null);
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
            <p
              className={productStyles.pHeader}
              style={{ color: "rgb(255, 127, 48)" }}
            >
              Total:
            </p>
            <p
              className={checkoutStyles.totalPrice}
              style={{ color: "rgb(255, 127, 48)" }}
            >
              {amount ? `${displayPrice(amount)}` : null}
            </p>
          </div>
        </aside>
        <div className={checkoutStyles.checkoutContainer}>
          <RadioForm
            isPhysical={isPhysical}
            setIsPhysical={setIsPhysical}
            productStyles={productStyles}
          />
          <form
            id="paymentForm"
            onSubmit={(e) => {
              e.preventDefault();
              setShowPayment(true);
            }}
          >
            {isPhysical ? (
              <PhysicalInformation
                setPhysicalInformation={setPhysicalInformation}
                physicalInformation={physicalInformation}
                setName={setName}
                name={name}
                email={email}
                setEmail={setEmail}
                setError={setError}
              />
            ) : (
              <DigitalInformation
                productStyles={productStyles}
                setName={setName}
                name={name}
                email={email}
                setEmail={setEmail}
                setError={setError}
              />
            )}
            <input type="submit" value="Next" />
          </form>
          {clientSecret && showPayment && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <Payment
                quantity={state.quantity}
                physicalInformation={physicalInformation}
                isPhysical={isPhysical}
                clientSecret={clientSecret}
                email={email}
                name={name}
                pi_id={pi_id}
                error={error}
                setError={setError}
              />
            </Elements>
          )}
        </div>
      </div>
    </Layout>
  );
};
export default Checkout;
