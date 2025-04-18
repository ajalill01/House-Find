const User = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

const signUp = async(req,res)=>{
    try{
        const {username,email,password} = req.body;

        const checkIfExistingUser = await User.findOne({$or:[{username},{email}]});

        if(checkIfExistingUser){
            return res.status(400).json({
                success : false,
                message : 'User already exists with either email or name'
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt)


        const newUser = new User({
            username,
            email,
            password : hashPassword
        })

        await newUser.save()

        const token = jwt.sign(
            { 
                userId : newUser._id,
                username : newUser.username,
                role: newUser.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn : '1d'
            }
        )


        if(newUser){
            res.status(201).json({
                success : true,
                message : 'User has been created',
                token : token
            })
        }
        else{
            res.status(400).json({
                success : false,
                message : 'Unable to registre user.Please try again'
            })
        }

    }
    catch(e){
        console.log('Error from sign up\n',e)
        res.status(500).json({
            success : false,
            message : 'Somthing went wrong with signup'
        })
    }
}

const login = async(req,res)=>{
    try{
        const {username,password} = req.body;

        const existingUser = await User.findOne({username});

        if(!existingUser){
            return res.status(400).json({
                success : false,
                message : 'User does not exist'
            })
        }

        const isPasswordMtach = await bcrypt.compare(password,existingUser.password)

        if(!isPasswordMtach){
            return res.status(400).json({
                success : false,
                message : 'Wrong password,please try again'
            })
        }
        
        const token = jwt.sign(
            { 
                userId : existingUser._id,
                username : existingUser.username,
                role: existingUser.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn : '1d'
            }
        )

        res.status(200).json({
            success : true,
            message : 'Logged in successful',
            token : token
        })
    }

    catch(e){
        console.log('Error from log in\n',e)
        res.status(500).json({
            success : false,
            message : 'Somthing went wrong with login'
        })
    }
}




const sendverificationcode=async(req,res)=>{
    const { email } = req.body;
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
  
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      secure:true,
      debug:true,
      host: 'smtp.gmail.com',
      port: 465,
    
      
      auth: {
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: true
      }
    });
    
    var mailOptions = {
      from:process.env.EMAIL_USER,
      to: email,
      subject: 'THIS IS YOUR VERIFICATION CODE',
      html: `<h1>${verificationCode}</h1>`,
      text: verificationCode.toString(),
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).json({
            success : true,
            message : 'Verification code sent successfully',
            verificationCode:verificationCode
        })
      }
    });
  
}




module.exports = {
    signUp,
    login,
    sendverificationcode
}