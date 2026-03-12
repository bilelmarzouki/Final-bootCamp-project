// in "routes/payment.routes.js"
const Cart = require("../models/cart.model");
const Payment = require("../models/Payment.model");
const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // make sure to add your Stripe Secret Key to the .env

router.post("/create-payment-intent", async (req, res, next) => {
  const { cart } = req.body; // expect { _id: ... } from the client
  try {
    // populate product references so we can read the prices
    const dbCart = await Cart.findById(cart?._id).populate("items.product");

    if (!dbCart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    const amount = dbCart.items.reduce((sum, item) => {
      if (!item.product) {
        return sum; 
      }
      return sum + item.product.price * item.quantity;
    }, 0);
    const cents = Math.round(amount * 100)
    console.log(amount);
   
    const snapshot = dbCart.toObject();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: cents,
      currency: "eur",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    snapshot.items = snapshot.items.filter(item => item.product);

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
