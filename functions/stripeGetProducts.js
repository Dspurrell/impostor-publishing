const stripe = require("stripe")(
  "sk_test_51KnciBAwcknZyyC56vt3L9LCsz5E5RLss59NkXljsXOi9a8QDsDuODM7Ekc5wC3z9bCNLP4iCxfQGnHBgoqMnYzK00xtuN7HF0"
);

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
