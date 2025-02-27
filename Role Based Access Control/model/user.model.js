const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["customer","buyer","seller"],
        default:"customer"
    }
},{
    versionKey:false
})

const UserModel = mongoose.model("users",userSchema);

module.exports = {
    UserModel
}