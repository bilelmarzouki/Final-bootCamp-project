// in "routes/payment.routes.js"
const Cart = require("../models/cart.model");
const Payment = require("../models/Payment.model");
const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // make sure to add your Stripe Secret Key to the .env

router.post("/create-payment-intent", async (req, res, next) => {
  const cart = req.body.cart; // this is how we will receive the productId the user is trying to purchase. This can also later be set to receive via params.
  //const cart = req.body
  try {
    // can you give me the populate to get the price of the product that is being purchased and i want the quantity?
    const dbCart = await Cart.findById(cart._id).populate("items.product");
    const amount = dbCart.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );
    console.log(amount);
    // the backend has the authoritative cart, use the populated version if available
    const snapshot = dbCart.toObject();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "eur",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // persist a payment record with the calculated total and the cart snapshot
    await Payment.create({
      price: amount,
      cart: snapshot,
      status: "incomplete",
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret,
      buyer: req.payload,
    });

    res.send({
      clientSecret: paymentIntent.client_secret, // the client secret will be sent to the FE after the stripe payment intent creation
      paymentIntentId: paymentIntent.id, // send the paymentIntentId to use by the FE to send back to the backend
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/update-payment-intent", async (req, res, next) => {
  const { clientSecret, paymentIntentId } = req.body;

  if (!clientSecret || !paymentIntentId) {
    return res.status(400).json({ error: "Missing payment identifiers" });
  }

  try {
    // double-check with Stripe that the intent actually succeeded
    const intent = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (intent.status !== "succeeded") {
      return res.status(400).json({ error: "Payment intent not succeeded" });
    }

    const updated = await Payment.findOneAndUpdate(
      { clientSecret, paymentIntentId },
      { status: "succeeded" },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Payment record not found" });
    }

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
