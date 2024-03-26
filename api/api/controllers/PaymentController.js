const Payment = require("../models/Payment");

// post a new  request
const postPayment = async (req, res) => {
  const payment = req.body;
  try {
    const paymentRequest = await Payment.create(payment);
      res.status(200).json(paymentRequest);
      console.log(paymentRequest)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
    postPayment
}
