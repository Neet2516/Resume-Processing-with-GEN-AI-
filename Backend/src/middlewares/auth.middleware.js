const jwt = require("jsonwebtoken")
const tokenBlacklistModel  = require("../models/blacklist.model")

async function authUser(req,res,next) {
    const token = req.cookies.token ; 
    if(!token) {
        return res.status(401).json({
            message:"TOKEN not provided."
        })
    }
    const isTokenblacklisted  = await tokenBlacklistModel.findOne({
        token
    })
    if(isTokenblacklisted) {
        return res.send(401).json({
            message : "TOKEN is Invalid."
        })
    }
    try{

        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded 
        next() 
    }catch(err){
        return res.status(401).json({
            message:'INVALID token'
        })
    }
}
module.exports  = {authUser}