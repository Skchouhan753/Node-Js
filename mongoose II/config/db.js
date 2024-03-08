const mongoose = require('mongoose');
 
                                    // connecting express server to mongo data base
                                    // mongo local server       Database Name
                                    //         ||                  ||
                                    //         \/                  \/
const connection = mongoose.connect('mongodb://127.0.0.1:27017/userDatabase');


// step 1 creating the user schema
const userSchema = mongoose.Schema({
    name:String,
    email:String,
    city:String
},{
    versionKey:false
})

// step 2 creating the model
const UserModel = mongoose.model('user',userSchema)


module.exports = {
    connection,
    UserModel
}