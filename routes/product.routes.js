const router = require("express").Router();

const Product = require("../models/product.model")


// get all product
//path : api/products
router.get("/",async(req,res,next)=>{
    
    try {
        const response = await Product.find().populate("creator", "-password")
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
})
// get  product by id
//path : api/products/:productId

router.get("/:productId",async(req,res,next)=>{
    
    try {
        const {productId} = req.params
        const response = await Product.findById(productId).populate("creator", "-password")
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
})



//post
// path : api/products
router.post("/",async(req,res,next)=>{
    
    try {
        const response = await Product.create({
            name: req.body.name,
            description: req.body.description ,
            price: req.body.price ,
            stockQuantity: req.body.stockQuantity ,
            category: req.body.category,
            gender: req.body.gender
        })
        res.status(201).json(response)
    } catch (error) {
        next(error)
    }
})


//put
//path : api/products/:productId

router.put("/:productId",async(req,res,next)=>{
    
    try {
        const {productId} = req.params
        const response = await Product.findByIdAndUpdate(productId,{
            name: req.body.name,
            description: req.body.description ,
            price: req.body.price ,
            stockQuantity: req.body.stockQuantity ,
            category: req.body.category,
            gender: req.body.gender
        })
        res.status(202).json(response)
    } catch (error) {
        next(error)
    }
})



//delete

router.delete("/:productId",async(req,res,next)=>{
    
    try {
        const {productId} = req.params
        await Product.findByIdAndDelete(productId)
        res.sendStatus(200)
    } catch (error) {
        next(error)
    }
})