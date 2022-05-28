import axios from "axios";

const absolutePath = "";

export const displayPrice = (value) => {
  return "$" + value.toString().slice(0, -2) + ".00 AUD";
};

export const createPaymentIntent = async (
  price_id,
  quantity,
  address,
  name
) => {
  const response = await axios.post(
    absolutePath + "/.netlify/functions/stripePiCreate",
    JSON.stringify({
      price_id,
      quantity,
      address,
      name,
    })
  );
  return response.data;
};

export const updatePaymentIntent = async (pi_id, receipt_email) => {
  const response = await axios.post(
    absolutePath + "/.netlify/functions/stripePiUpdate",
    JSON.stringify({
      pi_id,
      receipt_email,
    })
  );

  return response.data;
};

export const cancelPaymentIntent = async (pi_id) => {
  const response = await axios.post(
    absolutePath + "/.netlify/functions/stripePiCancel",
    JSON.stringify({
      pi_id,
    })
  );

  return response.data;
};
