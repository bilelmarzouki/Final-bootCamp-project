const jwt = require("jsonwebtoken")

function verifyToken(req, res, next){
    try {
        const token = req.headers.authorization.split(" ")[1]
        const payload = json.verify(token, process.env.TOKEN_SECRET)
        console.log(payload)
        req.payload = payload
        next()
    } catch (error) {
         res.status(401).json({errorMessage: "There is no token. Or token is invalid or expired."})
    }
}

module.exports = verifyToken