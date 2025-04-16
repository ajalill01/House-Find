const User = require('./model/User')
const jwt = require('jsonwebtoken')

const isAdmin = async (req,res,next)=>{
    try{

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
const adminMiddleware = (req, res, next) => {
    const isAdmin = req.query.admin === 'true';
  
    if (isAdmin) {
      console.log('Admin access granted');
      next();
    } else {
      console.log('Admin access denied');
      res.status(403).json({ message: 'Access denied: Admins only' });
    }
  };
  
  module.exports = adminMiddleware;
