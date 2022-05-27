import { Link } from "gatsby";
import React from "react";

const Redirect = ({ location }) => {
  const status = location.state.status;
  return (
    <div
      style={{
        margin: "auto",
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p>
        {status === "succeeded"
          ? "Your payment was successful."
          : "Your payment was unsuccessful"}
      </p>
      <Link to="/">Click here to return to the home page.</Link>
      {/* <p style={{ fontSize: "3rem" }}>Success</p>
      <p>Thank you {shippingInfo.name}.</p>
      <p>Your item will be on the way shortly.</p>
      <p>Order Details:</p>
      <p>Shipping Details:</p>
      <p>{line1}</p>
      <p>{city}</p>
      <p>{postal_code}</p>
      <p>{country}</p> */}
    </div>
  );
};

export default Redirect;
