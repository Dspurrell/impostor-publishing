import { Link, navigate } from "gatsby";
import React, { useEffect, useState } from "react";
import * as redirectStyles from "../styles/redirect.module.css";

const Redirect = ({ location }) => {
  const [state, setState] = useState({
    status: "",
    amount: "",
    email: "",
  });

  useEffect(() => {
    console.log(state);
    if (location.state)
      setState({
        status: location.state.status,
        email: location.state.email,
        amount: location.state.amount,
      });
    else navigate("/");
  }, []);
  return location.state ? (
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
      <p className={redirectStyles.status}>
        {state.status === "succeeded" ? "Success!" : "Payment Unsuccessful"}
      </p>
      <p className={redirectStyles.statusParagraph}>
        {state.status === "succeeded"
          ? "Your payment has been processed succesfully"
          : "We were unabled to process your payment"}
      </p>
      <p>Your receipt will be sent to {state.email}.</p>
      <Link className={redirectStyles.returnLink} to="/">
        Click here to return
      </Link>
    </div>
  ) : (
    <div></div>
  );
};

export default Redirect;
