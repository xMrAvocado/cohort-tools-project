const jwt = require("jsonwebtoken");

function verifyToken(req, res, next){
    try {
        const token = req.headers.authorization.split(" ")[1]

        const payload = jwt.verify(token, process.env.TOKEN_SECRET)

        req.payload = payload
        next()
    } catch (error) {
        res.status(401).json({errorMessage: "Invalid Token, Ai espik englis"})
    }
}

module.exports = verifyToken;