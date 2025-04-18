const User = require('../model/User')
const jwt = require('jsonwebtoken')

const isAdmin = async (req,res,next)=>{
    try{

        if (!req.userInfo) {
            console.log("req.userInfo is undefined. Did you forget to use authMiddleware?");
        }

        if(!req.userInfo.role){
            console.log("req.userInfo is undefined. Did you forget to role");
        }

        if(req.userInfo.role === "admin"){
            next()
        }

        else{
            return res.status(403).json({ 
                message: 'Access denied: Admins only' 
            });
        }

    }
    catch(e){
        console.log('Error from isAdmin')
        res.status(500).json({
            success : false,
            message : 'Somthing went wrong with isAdmin middleware'
        })
    }
}

module.exports = isAdmin