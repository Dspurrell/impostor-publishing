import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import CartContext from "../context/CartContext";
import { navigate } from "gatsby";
import { displayPrice } from "../stripeActions/stripeActions";

// import satelites from "../images/Satelites.jpg";

import Layout from "../components/Layout";
import * as productStyles from "../styles/products.module.css";

const Products = () => {
  const [quantity, setQuantity] = useState(1);
  const [productsList, setProductsList] = useState();
  const { dispatch } = useContext(CartContext);

  useEffect(() => {
    async function getProducts() {
      const response = await axios.get(
        "http://localhost:8888/.netlify/functions/stripeGetProducts"
      );
      const { data } = response.data;
      setProductsList(data.reverse());
    }

    getProducts();
  }, []);

  return (
    <Layout>
      {productsList ? (
        <div className={productStyles.container}>
          <div className={productStyles.purchaseContainer}>
            <img
              className={productStyles.image}
              src={productsList[0].images[0]}
              alt={productsList[0].name}
            />
            <div>
              <div className={productStyles.productInfo}>
                <p>{productsList[0].name}</p>
                <p className={productStyles.price}>
                  {quantity > 0 && quantity < 100
                    ? displayPrice(productsList[0].metadata.price * quantity)
                    : displayPrice(productsList[0].metadata.price)}
                </p>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (quantity && quantity > 0 && quantity < 100) {
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
              </form>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading</p>
      )}
    </Layout>
  );
};

export default Products;
