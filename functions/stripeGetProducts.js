const stripe = require("stripe")(process.env.GATSBY_STRIPE_SECRET_KEY);

const handler = async (event) => {
  const statusCode = 200;
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  };

  const products = await stripe.products.list();
  return {
    statusCode,
    headers,
    body: JSON.stringify(products),
  };
};

module.exports = { handler };
