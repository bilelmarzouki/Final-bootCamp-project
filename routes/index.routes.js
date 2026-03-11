const router = require("express").Router();
const {verifyToken, verifyCreator } = require("../middlewares/auth.middlewares")
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

// import cart router
const cartRouter = require('./cart.routes')
router.use("/cart", cartRouter)

const paymentRoutes = require("./payment.routes")
router.use("/payment", paymentRoutes)

module.exports = router;