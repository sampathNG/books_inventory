require("dotenv").config()
const jwt = require("jsonwebtoken")
const generateToken = (data)=>{
   return jwt.sign({data},process.env.token_secret)
}

// authenticate token

const authenticateToken = (req,res,next)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    const decode=jwt.verify(token,process.env.token_secret)
    req.usedata=decode
        next()
        
}

module.exports = {generateToken,authenticateToken}