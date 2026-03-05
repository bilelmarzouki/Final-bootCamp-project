const router = require("express").Router();

const Cart = require("../models/cart.model")
const {verifyToken, verifyCreator } = require("../middlewares/auth.middlewares")




//get all products that inside the cart
// path: /api/cart
router.get("/",verifyToken,async(req,res,next)=>{
    try {
        const response = await Cart.findOne({user: req.payload._id}).populate("items.product")
    } catch (error) {
        
    }

})



// patch(add or delete and modify quantity) products to the cart



