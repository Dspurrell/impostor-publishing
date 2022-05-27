import { Link } from "gatsby";
import React from "react";

const Redirect = ({ location }) => {
  const { state = {} } = location;
  const { status } = state;

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
        {status && location.state.status === "succeeded"
          ? "Your payment was successful."
          : "Your payment was unsuccessful"}
      </p>

      <Link to="/">Click here to return to the home page.</Link>
    </div>
  );
};

export default Redirect;
