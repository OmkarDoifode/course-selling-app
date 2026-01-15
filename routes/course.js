const {Router} = require('express');
const {courseModel} = require("../db");

const courseRouter = Router();

courseRouter.get("/view", function(req,res){
    res.json({
        msg : "here are all courses"
    })
})
courseRouter.post("/purchase",function (req, res)  {

})
module.exports = {
    courseRouter: courseRouter
} 