const { Schema, model } = require("mongoose");

const cartItemSchema = new Schema({
  product: {type: Schema.Types.ObjectId,ref: "Product",
    required: true
  },
  quantity: {type: Number,
    default: 1
  }
});

const cartSchema = new Schema(
  {
    user: {type: Schema.Types.ObjectId,ref: "User",
      required: true
    },

    items: [cartItemSchema]
  },
  {timestamps: true}
);

module.exports = model("Cart", cartSchema);