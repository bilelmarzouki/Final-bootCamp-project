const router = require("express").Router();

const User = require("../models/user.model");

// get all users
// /api/users
router.get("/", async(req, res, next)=>{
  try {
    const response = await User.find()
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
})

// /api/users/:userId
router.get("/:userId", async(req,res, next)=>{
    try {
        const {userId}= req.params
        const response = await User.findById(userId)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
})

// /api/users/cart
/* router.get("/cart", async(req, res, next)=>{
  try{
     const response= await User.cart.create({
            imageUrl: req.body.imageUrl,
            name: req.body.name,
            description: req.body.description ,
            price: req.body.price ,
            stockQuantity: req.body.stockQuantity ,
            category: req.body.category,
            gender: req.body.gender,
            creator: req.payload._id
     })
  }catch(error){
    next(error)
  }
}) */


module.exports = router