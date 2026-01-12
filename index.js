const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = express();

app.post("/signup", async (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;

})
app.post("/login", async(req, res)=>{

})
app.get("/purchase-course", (req, res) =>{

})
app.get("/my-courses", (req, res)=>{

})
app.get("all-courses", (req,res)=>{
    
})

app.listen(3000,()=>{
    console.log("server is listening!");
})