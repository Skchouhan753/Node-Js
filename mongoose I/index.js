const mongoose = require("mongoose");

// const  connection = mongoose.connect("mongodb://127.0.0.1:27017/");

const main = async () => {
  try {
    const connection = await mongoose.connect(
      "mongodb://127.0.0.1:27017/userDatabase"
    );
    console.log("connected to DB");
    // await UserModel.insertMany([
    //   { name: "pulkit", age: 20, isMarried: false },
    //   { name: "ambani", age: 60, isMarried: true },
    //   { name: "adani", age: 55, isMarried: true },
    //   { name: "yogi adityanath", age: 48, isMarried: false },
    //   { name: "narendra damaodardas modi", age: 58, isMarried: true }
    // ]);
    // to insert one document(insertOne will not work)
    const user = new UserModel({
      name:"Subhash",
      age:20,
      isMarrised:false,
      email:"abc.gmail.com"
    }) 
    await user.save()
    console.log("data has been added")

    const allUsers = await UserModel.find();
    console.log(allUsers)
  } catch (err) {
    console.log(err);
  }
};
main();

//stem 1: creating the schema or bluepint
const userSchema = mongoose.Schema({      
  name: String,
  email:{type:String,required:true},  // validation
  age: Number,
  isMarried: Boolean,
},{
  versionKey:false   // to remove __v:0 from the document
});

//step 2:  creating the model from schema
const UserModel = mongoose.model("user", userSchema);
