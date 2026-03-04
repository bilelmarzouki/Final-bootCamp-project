const router = require("express").Router();

const User = require("../models/user.model");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const verifyToken = require('../middlewares/auth.middlewares')
//add verification token

// POST "/api/auth/signup" => Creating a user document

router.post("/signup",async(req,res,next)=>{
    console.log(req.body)
    const {name ,password,email} = req.body
    //verify if the user fill out the required fileds
    
    if(!name || !password || !email){
        res.status(400).json({ errorMessage: "All fields are required (email, password, username)" })
        return
    }

      // - is the password strong enough? (length, characters)
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,20}$/gm
    if ( passwordRegex.test(password) === false ) {
        res.status(400).json({ errorMessage: "Password must follow this pattern (min 8 characters, max 20 characters, include lowercase, include uppercase, include number)" })
        return // now stop the route from continuing.
    }


    //check we already have this user or email in the database or not
    
    try {
        const foundUser = await User.findOne( { email: email } )
        if(foundUser){
            res.status(400).json({errorMessage: "User already registered with that email"})
            return
        }

        const hashPassword = await bcrypt.hash(password,12)
        const body ={
            name: name,
            email: email,
            password: hashPassword
        }
        const response = await User.create(body)
        res.sendStatus(201)
    } catch (error) {
        next(error)
    }

})


// POST "/api/auth/login" => Validating user credentials and sending the Token

router.post("/login",async(req,res,next)=>{
    const {email,password} = req.body
    if(!password || !email){
        res.status(400).json({ errorMessage: "All fields are required (email, password)" })
        return
    }
    try {
        const foundUser = await User.findOne( { email: email } )
        if(!foundUser){
            res.status(400).json({errorMessage: "go to signup"})
            return
        }
        const isPasswordCorrect = await bcrypt.compare(password,foundUser.password)
        if(!isPasswordCorrect){
            res.status(400).json({ errorMessage: "Password not correct!" })
            return 
        }

        const payload ={
            _id :foundUser._id,
            email:foundUser.email,
            role: foundUser.role
        }

        const authToken = jwt.sign(payload,process.env.TOKEN_SECRET,{
            algorithm: "HS256",
            expiresIn: "7d"
        })
        res.status(200).json({ authToken: authToken, payload: payload })
    } catch (error) {
        next(error)
    }


})

// GET "/api/auth/verify" => Validates the token on new users accesing the client
  router.get("/verify", verifyToken, (req, res) => {
  res.status(200).json({payload: req.payload})
})



module.exports = router