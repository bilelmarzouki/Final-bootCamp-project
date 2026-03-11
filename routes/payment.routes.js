// in "routes/payment.routes.js"
const Cart = require("../models/cart.model") 
const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // make sure to add your Stripe Secret Key to the .env

router.post("/create-payment-intent", async (req, res, next) => {

  const cart = req.body.cart; // this is how we will receive the productId the user is trying to purchase. This can also later be set to receive via params.
  //const cart = req.body
  try {
    // can you give me the populate to get the price of the product that is being purchased and i want the quantity?
    const dbCart= await Cart.findById(cart._id).populate('items.product')
    const amount = dbCart.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    console.log(amount)
    //const cartdId = await Cart.findById(cart._id).populate('products.product')
    // TODO . this is where you will later get the correct price to be paid
    // this is where you will get the correct price to be paid
    //const product = await Product.findById(productId)
    //const priceToPay = product.price // if not stored in cents, make sure to convert them to cents
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // this is an example for an amount of 14 EUR used for testing.
      currency: "eur",
      automatic_payment_methods: {
        enabled: true,
      }
    });

    // TODO on part 2. this is where you will later create a Payment Document later
  
    res.send({
      clientSecret: paymentIntent.client_secret, // the client secret will be sent to the FE after the stripe payment intent creation
    });
    
  } catch (error) {
    next(error)
  }
});

module.exports = router