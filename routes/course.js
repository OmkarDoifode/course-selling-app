const {Router} = require('express');

const courseRouter = Router();

courseRouter.get("/course/view", function(req,res){

})
courseRouter.post("/course/purchase",function (req, res)  {

})
module.exports({
    courseRouter: courseRouter
})