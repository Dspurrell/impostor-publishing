import React from "react";

const Redirect = ({ location }) => {
  // const {
  //   state: { shippingInfo },
  // } = location;
  // const { city, country, line1, line2, postal_code } = shippingInfo.address;
  //   const params = new URL(location.href).searchParams;
  //   const result = params.get("redirect_status");
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
      <p>hey</p>
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
