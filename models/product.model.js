const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const productSchema = new Schema({
    imageUrl: String,
    name: String,
    description: String,
    price: Number,
    stockQuantity: Number,
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
    creator: {type: mongoose.Schema.Types.ObjectId, ref:"User"},
})
const Product = mongoose.model("Product", productSchema )
module.exports = Product