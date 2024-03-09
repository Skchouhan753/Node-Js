const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
	username:String,
	email:String,
	password:String
},{
	versionKey:false
})

const UserModel = mongoose.model("user",UserSchema)

module.exports = {
	UserModel
}