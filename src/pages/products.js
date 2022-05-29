import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import CartContext from "../context/CartContext";
import { navigate } from "gatsby";
import { displayPrice } from "../stripeActions/stripeActions";

// import satelites from "../images/Satelites.jpg";

import Layout from "../components/Layout";
import * as productStyles from "../styles/products.module.css";

const absolutePath = "http://localhost:8888";

const Products = () => {
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [productsList, setProductsList] = useState();
  const { dispatch } = useContext(CartContext);

  useEffect(() => {
    async function getProducts() {
      const response = await axios.get(
        absolutePath + "/.netlify/functions/stripeGetProducts"
      );
      const { data } = response.data;
      setProductsList(data.reverse());
    }

    getProducts();
  }, []);

  return (
    <Layout>
      <div className={productStyles.container}>
        <div className={productStyles.purchaseContainer}>
          {productsList ? (
            <>
              <img
                className={productStyles.image}
                src={productsList[0].images[0]}
                alt={productsList[0].name}
                width="1080px"
                height="1080px"
              />

              <div>
                <div
                  className={productStyles.productInfo}
                  // style={{ display: productsList ? "flex" : "none" }}
                >
                  <>
                    <p className={productStyles.price}>
                      {productsList && productsList[0].name}
                    </p>
                    <p
                      className={productStyles.price}
                      style={{
                        visibility: productsList ? "visible" : "hidden",
                      }}
                    >
                      {productsList
                        ? quantity > 0 && quantity < 100
                          ? displayPrice(
                              productsList[0].metadata.price * quantity
                            )
                          : displayPrice(productsList[0].metadata.price)
                        : "aud"}
                    </p>
                  </>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (quantity && quantity > 0 && quantity < 100) {
                      setError("");
                      dispatch({
                        type: "REPLACE",
                        payload: {
                          name: productsList[0].name,
                          image: productsList[0].images[0],
                          description: productsList[0].description,
                          quantity,
                          price: productsList[0].metadata.price,
                          price_id: productsList[0].metadata.price_id,
                        },
                      });
                      navigate("/checkout");
                    } else {
                      setError("Please enter a valid number.");
                    }
                  }}
                >
                  <div className={productStyles.quantityContainer}>
                    <label htmlFor="quantity">Quantity:</label>
                    <input
                      name="quantity"
                      style={{
                        borderBottom: quantity
                          ? "1px solid orange"
                          : "1px solid red",
                      }}
                      className={productStyles.quantityInput}
                      type="number"
                      value={quantity}
                      onChange={(e) => {
                        setQuantity(e.target.value);
                      }}
                      min="1"
                      max="99"
                    />
                  </div>
                  <input value="Continue" type="submit" />
                  <p style={{ textAlign: "center" }}>{error}</p>
                </form>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Products;
