const mongoose = require('mongoose');
 
                                    // connecting express server to mongoDB Atlas data base
                                    //                                                           Database Name (as you wish)
                                    //                                                                 ||
                                    //                                                                 \/                  
const connection = mongoose.connect('mongodb+srv://skchouhan:Skchoun753@cluster0.ebgjmcb.mongodb.net/atlasDB?retryWrites=true&w=majority&appName=Cluster0');


// step 1 creating the user schema
const userSchema = mongoose.Schema({
    name:String,
    email:String,
    city:String
},{
    versionKey:false
})

// step 2 creating the model 
    
                           // collection name
                           //      ||
                           //      \/
const UserModel = mongoose.model('user',userSchema)


module.exports = {
    connection,
    UserModel
}