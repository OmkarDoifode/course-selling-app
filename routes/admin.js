const { Router } = require('express');
const {adminModel} = require("../db");
const adminRouter = Router();
const jwt = require('jsonwebtoken');
const { JWT_ADMIN_PASSWORD } = require('../config');
const {adminMiddleware} = require('./middlewares/admin');
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

adminRouter.post("/course",adminMiddleware, async function(req, res){
    const adminId = req.adminId;
    const {title, description, imageUrl, price} = req.body;
    
    const course = await courseModel.create({
        title, description, imageUrl, price, creatorId: adminId
    })
    res.json({
        msg: "course created",
        courseId: course._id
    })
})
adminRouter.put("/course",adminMiddleware, async function(req, res){
    const adminId = req.adminId;
    const {title, description, imageUrl, price, courseId} = req.body;
    const course = await courseModel.updateOne({
        _id: courseId,
        creatorId: adminId
    },{
        title, description, imageUrl, price
    })
    res.json({
        msg: 'course Updated!',
        courseId: course._id
    })
})
adminRouter.get("/course/bulk",adminMiddleware, async function(req, res){
    const adminId = req.adminId;
    const courses = await courseModel.find({
        creatorId: adminId
    })
    res.json({
        courses
    })
})

module.exports = {
    adminRouter: adminRouter
}