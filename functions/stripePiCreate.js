const stripe = require("stripe")(process.env.GATSBY_STRIPE_SECRET_KEY);

const statusCode = 200;
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
};

const handler = async function (event) {
  //Return if it isnt a post request
  if (event.httpMethod !== "POST" || !event.body) {
    return {
      statusCode,
      headers,
      body: JSON.stringify({ message: "Bad request" }),
    };
  }

  const { quantity, price_id } = JSON.parse(event.body);
  if (!quantity || !price_id) {
    return {
      statusCode,
      headers,
      body: JSON.stringify({ message: "Insufficient information" }),
    };
  }

  try {
    const price = await stripe.prices.retrieve(price_id);

    const amount = price.unit_amount * quantity;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: price.currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });
    return {
      statusCode,
      headers,
      body: JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        amount: paymentIntent.amount,
        status: paymentIntent.status,
        pi_id: paymentIntent.id,
        quantity,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: error.message }),
    };
  }
};

module.exports = { handler };
