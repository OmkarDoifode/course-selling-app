const {Router} = require('express');
const {courseModel} = require("../db");
const {userMiddleware} = require('../middlewares/user');


const courseRouter = Router();

courseRouter.get("/preview", async function(req,res){
    const courses = await courseModel.find({});

    res.json({
        msg : "here are all courses",
        courses
    })
})
courseRouter.post("/purchase", userMiddleware, async function (req, res)  {
    const userId = req.userId;
    const courseId = req.body.courseId;

    await courseModel.create({
        userId,
        courseId
    })
    res.json({
        message : "you have bought course successfully!"
    })
})
module.exports = {
    courseRouter: courseRouter
} 