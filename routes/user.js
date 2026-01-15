const { Router } = require('express');
const {userModel} = require("../db");
const { parse } = require('zod');
const userRouter = Router();


userRouter.post("/signup",async function (req, res){
    const requiredBody = z.object({
        email: z.string().email(),
        password: z.string().min(3).max(15),
        firstName: z.string().min(1).max(20),
        lastName: z.string().min(1).max(20)
    })
    const parsedDataWithSuccess = requiredBody.safeParse(req.body);
    if(!parsedDataWithSuccess){
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
        await userModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        })
    } catch (e){
        errorThrown = true;
        res.json({
            msg: "user already exists!"
        })
    }
    if(!errorThrown){
        res.json({
            msg: "you are signed up!"
        })
    }
})
userRouter.post("/signin", async function(req, res){
    const {email, password} = req.body;
    const user = await userModel.findOne({
        email: email
    })
    if(!user){
        res.status(403).json({
            msg: "user doesn't exist!"
        })
        return;
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if(passwordMatch){
        const token = jwt.sign({
            id: user._id.toString()
        },JWT_SECRET);
        res.json({
            token
        })
    } else {
        res.status(403).json({
            msg: "incorrect credentials!"
        })
    }
});
userRouter.get("/purchases",function (req, res){

})

module.exports = {
    userRouter: userRouter
}