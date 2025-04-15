const User = require('../model/User')
const bcrypt = require('bcrypt')

createAdmin = async ()=>{

    const existingAdmin = await User.findOne({ role: 'admin' });

    if (existingAdmin) {
        console.log('Admin already exists');
        return;
    }

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASS,10)


    const admin = new User({
        username : "admin",
        email : "housefindservice@gmail.com",
        role : 'admin',
        password : hashedPassword   
    })

    await admin.save()

    console.log(admin)
}

module.exports = createAdmin