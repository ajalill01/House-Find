require("dotenv").config();

const express= require("express");
const authRoutes = require('./backend/routes/auth-routes');
const mailRoutes = require('./backend/routes/mail-routes');
const consectDB=require("./backend/database/db.js");


const app = express();

app.use(express.json());

app.use('/api/users', authRoutes);
app.use('/api/mail',mailRoutes)


const PORT= process.env.PORT||3000;


consectDB();
app.listen(PORT,()=>{
    console.log("server is on");
});

