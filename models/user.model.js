const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'password is required.'],
        unique: true,
        trim: true
    },
    role: {
     type: String,
     enum: ["Stylist", "Customer"],
     default: "Customer"
    },
    cart: [{type: mongoose.Schema.Types.ObjectId, ref: "Product"}],
    wallet: Number
})
const User = mongoose.model("User", userSchema )
module.exports = User