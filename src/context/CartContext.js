import React from "react";
import CartReducer from "./CartReducer";

import { createContext, useReducer } from "react";

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const initialState = {
    name: "",
    image: "",
    description: "",
    quantity: 0,
    price: "",
    price_id: "",
  };

  const [state, dispatch] = useReducer(CartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
