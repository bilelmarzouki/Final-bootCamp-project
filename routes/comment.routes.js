const router = require("express").Router();

const Comment = require("../models/comment.model")

//get
// path: /products/:productId/comments
router.get("/:productId/comments", async(req,res,next)=>{
    try {
        const {productId} =req.params
        const response = await Comment.find({product: productId}).populate("product").populate("user", "-password");
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
})



// post
// path: /products/:productId/comment
router.post("/:productId/comment", async(req,res,next)=>{
    try {
        const { productId } = req.params;
        const response = await Comment.create({
            description:req.body.description,
            user: req.body.user,
            product: productId
        })
        res.status(201).json(response)
    } catch (error) {
        next(error)
    }
})




//delete (just owner can delete)
router.delete("/:commentId", async(req,res,next)=>{
    try {
        const { commentId } = req.params;
        await Comment.findByIdAndDelete(commentId)
        res.sendStatus(200)
    } catch (error) {
        next(error)
    }
})