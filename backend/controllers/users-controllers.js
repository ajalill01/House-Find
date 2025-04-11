const User = require('../model/User')
const bcrypt = require('bcrypt')



const changeName = async(req,res)=>{
    try{
        const userId = req.userInfo.userId

        const existingUser = await User.findById(userId)

        if(!existingUser){
            return res.status(404).json({
                success : false,
                message : 'User with this id does not exist'
            })
        }

        const newName = req.body.newName

        const userWithSameName = await User.findOne({username:newName})

        if(userWithSameName){
            return res.status(400).json({
                success : false,
                message : 'There is a user with that name'
            })
        }
        

        existingUser.username = newName

        await existingUser.save()

        res.status(202).json({
            success : true,
            message : 'User name has been updated',
            newName : newName
        })

    }
    catch(e){
        res.status(500).json({
            success : false,
            message:'Error while changing name'
        })
        console.log('Error from changeName\n',e)
    }
}

const changeEmail = async(req,res)=>{
    try{
        const userId = req.userInfo.userId

        const existingUser = await User.findById(userId)

        if(!existingUser){
            return res.status(404).json({
                success : false,
                message : 'User with this id does not exist'
            })
        }

        const newEmail = req.body.newEmail

        const userWithSameEmail = await User.findOne({email:newEmail})

        if(userWithSameEmail){
            return res.status(400).json({
                success : false,
                message : 'There is a user with that email'
            })
        }
        

        existingUser.email = newEmail

        await existingUser.save()

        res.status(202).json({
            success : true,
            message : 'User email has been updated',
            newEmail : newEmail
        })

    }
    catch(e){
        res.status(500).json({
            success : false,
            message:'Error while changing email'
        })
        console.log('Error from changeEmail\n',e)
    }
}

const changePassword = async(req,res)=>{
    try{
        const userId = req.userInfo.userId

        const existingUser = await User.findById(userId)

        if(!existingUser){
            return res.status(404).json({
                success : false,
                message : 'User with this id does not exist'
            })
        }

        const {oldPassword,newPassword} = req.body

        const isPasswordCorrect = await bcrypt.compare(oldPassword, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({
                success: false,
                message: 'Old password is incorrect'
            });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        
        existingUser.password = hashedNewPassword;
        await existingUser.save()

        res.status(202).json({
            success : true,
            message: 'Password has been updated',
        })

    }
    catch(e){
        res.status(500).json({
            success : false,
            message:'Error while changing password'
        })
        console.log('Error from changePassword\n',e)
    }
}


module.exports = {
    changeName,
    changeEmail,
    changePassword
}