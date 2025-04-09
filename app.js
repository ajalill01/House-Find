require("dotenv").config();

const express= require("express");
const authRoutes = require('./backend/routes/auth-routes');
const consectDB=require("./backend/database/db.js");


const app = express();

app.use(express.json());

app.use('/api/users', authRoutes);

const PORT= process.env.PORT||3000;


consectDB();
app.listen(PORT,()=>{
    console.log("server is on");
});

