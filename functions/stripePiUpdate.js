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

  const { pi_id, receipt_email } = JSON.parse(event.body);
  if (!pi_id || !receipt_email) {
    return {
      statusCode,
      headers,
      body: JSON.stringify({ message: "Insufficient Information" }),
    };
  }
  try {
    const paymentIntent = await stripe.paymentIntents.update(pi_id, {
      receipt_email,
    });
    return {
      statusCode,
      headers,
      body: JSON.stringify({
        paymentIntent,
        clientSecret: paymentIntent.client_secret,
        amount: paymentIntent.amount,
      }),
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
