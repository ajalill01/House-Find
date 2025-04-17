const User = require('../model/User')

const getAllUsers = async (req,res)=>{
    try{
        const users = await User.find({ role: 'user' }).lean();
        res.status(202).json({
            success : true,
            message : 'Get all users is done',
            users : users
        })
    }
    catch(e){
        console.log('Error from getAllUsers\n',e)
        res.status(500).json({
            success : false,
            message : 'Error from get all users'
        })
    }
}

module.exports = {getAllUsers}