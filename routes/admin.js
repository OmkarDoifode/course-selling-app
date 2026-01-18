const { Router } = require('express');
const {adminModel} = require("../db");
const adminRouter = Router();
const jwt = require('jsonwebtoken');
const { JWT_ADMIN_PASSWORD } = require('../config');

const bcrypt = require('bcrypt');
const {z} = require('zod');

adminRouter.post("/signup", async function (req, res){
    const requiredBody = z.object({
        email: z.string().email(),
        password: z.string().min(3).max(15),
        firstName: z.string().min(1).max(20),
        lastName: z.string().min(1).max(20)
    })
    const parsedDataWithSuccess = requiredBody.safeParse(req.body);
    if(!parsedDataWithSuccess.success){
        res.json({
            msg: "Incorrect Credentials",
            error: parsedDataWithSuccess.error
        })
        return;
    }
    const {firstName, lastName, password, email} = req.body;
    let errorThrown = false;
    try{
        const hashedPassword = await bcrypt.hash(password, 5);
        await adminModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        })
    } catch (e){
        errorThrown = true;
        res.json({
            msg: "admin already exists!"
        })
    }
    if(!errorThrown){
        res.json({
            msg: "you are signed up!"
        })
    }
})
adminRouter.post("/signin", async function(req, res){
    const requiredBody = z.object({
        email: z.string().email(),
        password: z.string().min(3).max(15)
    })
    parsedData = requiredBody.safeParse(req.body);
    if(!parsedData.success){
        res.status(403).json({
            msg: "incorrect inputs"
        })
    }
    const {email, password} = req.body;
    const admin = await adminModel.findOne({
        email: email
    })
    if(!admin){
        res.status(403).json({
            msg: "admin doesn't exist!"
        })
        return;
    }
    const passwordMatch = await bcrypt.compare(password, admin.password);
    if(passwordMatch){
        const token = jwt.sign({
            id: admin._id.toString()
        },JWT_ADMIN_PASSWORD);
        res.json({
            token
        })
    } else {
        res.status(403).json({
            msg: "incorrect credentials!"
        })
    }
})

adminRouter.post("/course", function(req, res){
    
})
adminRouter.put("/course", function(req, res){

})
adminRouter.get("/course/bulk", function(req, res){
res.json({
        message : "hello tejas"
    })
})

module.exports = {
    adminRouter: adminRouter
}