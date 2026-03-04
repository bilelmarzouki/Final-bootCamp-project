const router = require("express").Router();

const Comment = require("../models/comment.model")

//get
// path: /comments/:productId/
router.get("/:productId/product", async(req,res,next)=>{
    try {
        const {productId} =req.params
        const response = await Comment.find({product: productId}).populate("user", "name");
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
})



// post
// path: 
router.post("/", async(req,res,next)=>{
    try {
        const response = await Comment.create({
            description:req.body.description,
            user: req.body.user,
            product: req.body.product
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

module.exports = router;