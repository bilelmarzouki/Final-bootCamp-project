const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const commentSchema = new Schema({
    description: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    product: {type: mongoose.Schema.Types.ObjectId, ref: "Product"},
},{timestamps: true})
const Comment = mongoose.model("Comment", commentSchema )
module.exports = Comment