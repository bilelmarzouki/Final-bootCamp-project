const router = require("express").Router();

//const verifyToken = require('../middlewares/auth.middlewares')
// import authentication route
const authRouter = require("./auth.routes")
router.use("/auth", authRouter)

// import user route
 const userRouter = require('./user.routes')
router.use("/users", userRouter)

// import comment route
const commentRouter = require('./comment.routes')
router.use("/comments", commentRouter) 

// import product router
const productRouter = require('./product.routes')
router.use("/products", productRouter)

/* router.get("/verify", verifyToken, (req, res)=>{
    res.send("verifing route to see if the middleware is really working")
}) */
module.exports = router;