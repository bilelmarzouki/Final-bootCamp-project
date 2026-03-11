// in "models/Payment.model.js"

const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  price: Number,
  paymentIntentId: String,
  clientSecret: String,
  status: {
    type: String,
    enum: ["incomplete", "succeeded"],
    default: "incomplete",
  },

  // store a copy of the cart at the time of payment; each item needs a product reference
  cart: {
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
