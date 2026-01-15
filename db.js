const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
mongoose.connect("mongodb+srv://osdoifode2005_db_user:tXVZc4Shcpyy1Kbk@cluster0.cmxn2iw.mongodb.net/coursera-app")
const userSchema = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String
})
const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: ObjectId
})
const adminSchema = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String
})
const purchaseSchema = new Schema({
    courseId: ObjectId,
    userId: ObjectId
})

const userModel = mongoose.model("user", userSchema);
const courseModel = mongoose.model("course", courseSchema);
const adminModel = mongoose.model("admin", adminSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);


module.exports = {
    userModel,
    courseModel,
    adminModel,
    purchaseModel
}