const router = require("express").Router();

// import authentication route
const authRouter = require("./auth.routes")
router.use("/auth", authRouter)
// import user route
const userRouter = require('./user.routes')
router.use("/user", userRouter)
// import comment route
const commentRouter = require('./comment.routes')
router.use("/comments", commentRouter)
// import product router
const productRouter = require('./product.routes')
router.use("products", productRouter)