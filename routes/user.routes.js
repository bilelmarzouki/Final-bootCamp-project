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


module.exports = router