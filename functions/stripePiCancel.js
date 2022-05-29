const stripe = require("stripe")(process.env.GATSBY_STRIPE_SECRET_KEY);

const statusCode = 200;
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
};

const handler = async function (event) {
  if (event.httpMethod !== "POST" || !event.body) {
    return {
      statusCode,
      headers,
      body: JSON.stringify({ message: "Bad request" }),
    };
  }

  const { pi_id } = JSON.parse(event.body);

  try {
    const paymentIntent = await stripe.paymentIntents.cancel(pi_id);
    return {
      statusCode,
      headers,
      body: JSON.stringify({ paymentIntent }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: error }),
    };
  }
};

module.exports = { handler };
