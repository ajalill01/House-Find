require("dotenv").config();

const express= require("express");

const consectDB=require("./backend/database/db.js");

consectDB();

const app=express();

app.use(express.json());

const PORT= process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log("server is on");
});