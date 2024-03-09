const express = require("express")

const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")

const { UserModel } = require("../model/user.model")

const userRouter = express.Router()

// registering user
userRouter.post("/register", (req, res) => {
	// const payload = req.body
	const {username,email,password} = req.body
    try {

		bcrypt.hash(password, 5, async (err, hash)=>{
			// Store hash in your password DB.
			if(err){
				res.status(200).json({err})
			}else{
				const user = new UserModel({
					username,
					email,
					password:hash
				})
			await user.save()
			res.status(200).json({msg:"User has been registered"})
			}
		});

		
	} catch (err) {
		res.status(400).json({err})
    }
})

// loging in user with authentication
userRouter.post("/login", async(req, res) => {
	const {email,password} = req.body
	try{
		const user = await UserModel.findOne({email})
		if(user){
			bcrypt.compare(password, user.password, (err,result)=>{
				if(result){														  // random payload  | secret key | token expiry
																				  //    	 ||           ||		    ||
																				  //         \/           \/            \/
					res.status(200).json({"msg":"Login Successfull!","token":jwt.sign({course:"NEM104"},"masai",{expiresIn:30})})
				}else{
					res.status(200).json({"msg":"Password does not match"})
				}
			})
		}else{
			res.status(200).json({msg:"Wrong Credentials!"})
		}
}catch(err){
	res.status(400).json({err})
}
})


// =================== logout ==========================
const {blacklist} = require("../logout/blacklist")
	
userRouter.get("/logout",(req,res)=>{

		const token = req.headers.authorization
	try{
		blacklist.push(token)
		res.status(400).json({msg:"You have been logged out!"})
	}catch(err){
		res.status(400).json({err})
	}
})





module.exports = {
	userRouter,
}
