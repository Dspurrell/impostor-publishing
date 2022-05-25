import React from "react";

import * as productStyles from "../../styles/products.module.css";

const PhysicalInformation = ({
  physicalInformation,
  setPhysicalInformation,
  name,
  setName,
  email,
  setEmail,
}) => {
  const { line1, line2, city, postal_code } = physicalInformation;
  return (
    <div>
      <>
        <p className={productStyles.pHeader}>Shipping address</p>
        <input
          className={productStyles.shippingInput}
          autoComplete="name"
          id="name"
          type="text"
          placeholder="Full name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className={productStyles.shippingInput}
          type="email"
          name="email"
          placeholder="Email Address"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={productStyles.shippingInput}
          name="street-address"
          type="text"
          placeholder="Address"
          value={line1}
          required
          onChange={(e) =>
            setPhysicalInformation({
              ...physicalInformation,
              line1: e.target.value,
            })
          }
        />
        <input
          className={productStyles.shippingInput}
          type="text"
          placeholder="Apartment, suite, etc. (optional)"
          value={line2}
          onChange={(e) =>
            setPhysicalInformation({
              ...physicalInformation,
              line2: e.target.value,
            })
          }
        />
        <input
          className={productStyles.shippingInput}
          type="text"
          placeholder="City"
          value={city}
          required
          onChange={(e) =>
            setPhysicalInformation({
              ...physicalInformation,
              city: e.target.value,
            })
          }
        />
        <div className={productStyles.inputGroup}>
          {/* <input
                  className={productStyles.shippingInput}
                  id={productStyles.country}
                  type="text"
                  placeholder="Country(Change to dropdown)"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                /> */}
          <select
            name="country"
            id={productStyles.country}
            className={productStyles.shippingInput}
            required
            onChange={(e) =>
              setPhysicalInformation({
                ...physicalInformation,
                country: e.target.value,
              })
            }
          >
            <option value="Australia">Australia</option>
          </select>
          <input
            className={productStyles.shippingInput}
            type="number"
            placeholder="Postal code"
            required
            value={postal_code}
            onChange={(e) =>
              setPhysicalInformation({
                ...physicalInformation,
                postal_code: e.target.value,
              })
            }
          />
        </div>
        <input
          className={productStyles.shippingInput}
          type="text"
          placeholder="Phone (optional)"
        />
        <p style={{ textAlign: "right" }}>Shipping only within Australia</p>
      </>
    </div>
  );
};

export default PhysicalInformation;
