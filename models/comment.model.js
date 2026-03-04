const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
    description: String,
    user: [{type: Schema.Types.ObjectId("User")}],
    product: [{type: Schema.Types.ObjectId("Product")}],
})
const Comment = model("Comment", commentSchema )
module.exports = Comment