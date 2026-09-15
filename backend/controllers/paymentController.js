const Razorpay = require('razorpay');
const crypto = require('crypto');

// POST /payment/create-order - creates a Razorpay order for the given amount,
// which the frontend uses to open the Razorpay checkout widget
const createOrder = async (req, res) => {
  try {
    // Instantiate the Razorpay client with API credentials from env vars
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    
    // Razorpay accepts amount in paise
    const options = {
      amount: req.body.amount * 100, // convert rupees to paise
      currency: "INR",
    };
    
    const order = await instance.orders.create(options);
    if (!order) return res.status(500).send("Some error occured");
    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

// POST /payment/verify - verifies a completed Razorpay payment by recomputing
// the expected HMAC signature and comparing it to the one returned by Razorpay,
// confirming the payment details weren't tampered with client-side
const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    // Razorpay's signature is generated from "order_id|payment_id" signed with the secret key
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    // Only trust the payment if the signatures match
    if (razorpay_signature === expectedSign) {
      return res.status(200).json({ message: "Payment verified successfully" });
    } else {
      return res.status(400).json({ message: "Invalid signature sent!" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { createOrder, verifyPayment };
