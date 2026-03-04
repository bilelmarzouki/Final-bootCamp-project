const { Schema, model } = require("mongoose");

const productSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    stockQuantity: Nunber,
    category: {
     type: String,
     enum: ["formal", "Bohemian","casual","sport"],
     default: "casual"
    },
    gender: {
     type: String,
     enum: ["women", "men","kids","unisex"],
     default: "unisex"
    },
    creator: [{type: Schema.Types.ObjectId("User")}],
})
const Product = model("Product", productSchema )
module.exports = Product