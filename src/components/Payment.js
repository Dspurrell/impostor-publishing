import { PaymentElement } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { updatePaymentIntent } from "../stripeActions/stripeActions";
import * as paymentStyles from "../styles/payment.module.css";

const Payment = ({ physicalInformation, isPhysical, name, email, pi_id }) => {
  const { city, country, line1, line2, postal_code } = physicalInformation;

  // const [amount, setAmount] = useState(2500);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  const elements = useElements();
  const stripe = useStripe();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      (isPhysical &&
        name &&
        email &&
        city &&
        country &&
        line1 &&
        postal_code) ||
      (!isPhysical && email && name)
    ) {
      setIsProcessing(true);
      console.log("madeit");
      updatePaymentIntent(pi_id, email);

      //   const confirmPayment = await stripe.confirmPayment({
      //     elements,
      //     confirmParams: {
      //       shipping: isPhysical
      //         ? {
      //             address: {
      //               city,
      //               country: "au",
      //               line1,
      //               line2,
      //               postal_code,
      //             },
      //             name: name,
      //           }
      //         : null,
      //       payment_method_data: {
      //         billing_details: {
      //           name: name,
      //           email: email,
      //           address: isPhysical
      //             ? { city, country: "au", line1, line2, postal_code }
      //             : null,
      //         },
      //       },
      //     },
      //     // redirect: "if_required",
      //   });

      //   if (confirmPayment.error) {
      //     setError(confirmPayment.error.message);
      //     setIsProcessing(false);
      //   }
      //   //     // 4242424242424242
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className={paymentStyles.textGroup}>
        <p className={paymentStyles.pHeader}>Payment</p>
      </div>
      <PaymentElement
        onChange={(e) => {
          e.complete ? setIsDisabled(false) : setIsDisabled(true);
          e.error ? setError(e.error.message) : setError("");
        }}
      />
      {error ? (
        <p style={{ textAlign: "center", color: "red", fontSize: "1.5rem" }}>
          {error}
        </p>
      ) : (
        <input
          type="submit"
          disabled={isProcessing || isDisabled}
          className={paymentStyles.submit}
          value={isProcessing ? "Processing" : "Purchase"}
        />
      )}
    </form>
  );
};

export default Payment;