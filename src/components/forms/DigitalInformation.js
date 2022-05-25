import React from "react";

const DigitalInformation = ({
  productStyles,
  name,
  setName,
  email,
  setEmail,
}) => {
  return (
    <div>
      <p className={productStyles.pHeader}>Email Address</p>
      <input
        autoComplete="name"
        type="text"
        className={productStyles.shippingInput}
        placeholder="Full name"
        required
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        type="email"
        autoComplete="email"
        className={productStyles.shippingInput}
        placeholder="Email Address"
        value={email}
        required
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
    </div>
  );
};

export default DigitalInformation;
