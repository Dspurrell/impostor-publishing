const CartReducer = (state, action) => {
  switch (action.type) {
    case "REPLACE":
      return action.payload;
    case "EMPTY": {
      return {
        name: "",
        image: "",
        description: "",
        quantity: 0,
        price: "",
        price_id: "",
      };
    }
    default: {
      return state;
    }
  }
};

export default CartReducer;
