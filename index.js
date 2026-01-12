const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = express();

app.post("/user/signup", async (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;

})
app.post("/user/signin", async(req, res)=>{

})
app.get("users/purchases", (req, res)=>{

})
app.get("/courses", (req,res)=>{

})
app.post("/course/purchase", (req, res) => {
    
})

app.listen(3000,()=>{
    console.log("server is listening!");
})