const router = require("express").Router();

const Cart = require("../models/cart.model")
const {verifyToken, verifyCreator } = require("../middlewares/auth.middlewares")




//get all products that inside the cart
// path: /api/cart
router.get("/",verifyToken,async(req,res,next)=>{
    try {
        const response = await Cart.findOne({user: req.payload._id}).populate("items.product")
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        next(error)
    }

})

// patch(add or delete and modify quantity) products to the cart
// path: /api/cart/update
 router.patch("/update",verifyToken,async(req,res,next)=>{
    try {
        const {productId, quantity}= req.body;
        if (!productId) {
          return res.status(400).json({ error: 'productId is required' });
        }
        // check if user has a cart
        let cart = await Cart.findOne({user: req.payload._id})
        if(!cart){
            cart= await Cart.create({user: req.payload._id, items: []})
        }
        // product already in the cart
        const existItem = cart.items.find(item=>item.product.toString()===productId)
        
        if(existItem){
            existItem.quantity+=quantity
        }else{
            cart.items.push({product:productId,quantity:quantity})
        }
        await cart.save()
        res.status(200).json(cart)
    } catch (error) {
        console.log(error)
        next(error)
    }
 } )

// path: /api/cart/
 router.delete("/remove/:productId", verifyToken, async (req, res, next) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.payload._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // remove the product from the items array
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router