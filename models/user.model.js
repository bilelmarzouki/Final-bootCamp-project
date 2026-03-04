const { Schema, model } = require("mongoose");

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
        type: Number,
        required: [true, 'password is required.'],
        unique: true,
        trim: true
    },
    role: {
     type: String,
     enum: ["Stylist", "Customer"],
     default: "Customer"
    },
    cart: [{type: Schema.Types.ObjectId("Product")}],
    wallet: Number
})
const User = model("User", userSchema )
module.exports = User