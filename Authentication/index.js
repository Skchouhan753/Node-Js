const express = require("express")

const jwt = require("jsonwebtoken")

const { auth } = require("./middleware/auth.middleware")

const { connection } = require("./config/db")

const { userRouter } = require("./routes/user.routes")

const app = express()
app.use(express.json())
app.use("/users", userRouter)


// Protected Routes
app.get("/",(req,res)=>{
	res.json({msg:"Home Page"})
})

app.get("/about",(req,res)=>{
	res.json({msg:"About Page"})
})

// ================ method-1 =================
app.get("/movies",(req,res)=>{
	const token = req.headers.authorization
	if(token){		 // secret code
					 //	   ||
					 //    \/
		jwt.verify(token,"masai",(err,decoded)=>{
			if(decoded){
				console.log(decoded)
				res.json({msg:"You are Authorized to Movies Data"})
			}
		})
	}else{
		res.json({msg:"You are not Authorized"})
	}
})

// web-series
// app.get("/series",(req,res)=>{
// 	const token = req.headers.authorization
// 	if(token){		 // secret code
// 					 //	   ||
// 					 //    \/
// 		jwt.verify(token,"masai",(err,decoded)=>{
// 			if(decoded){
// 				console.log(decoded)
// 				res.json({msg:"You are Authorized to Series Data"})
// 			}
// 		})
// 	}else{
// 		res.json({msg:"You are not Authorized"})
// 	}
// })

// ================== method-2 (by using middlewae) =================
app.get("/movies",(req,res)=>{
	res.json({msg:"Movies Data"})
})

app.get("/series",auth,(req,res)=>{
	res.json({msg:"Series Data"})
})

// ============= server ==============
app.listen(8080, async () => {
	try {
		await connection
		console.log("server started at 8080")
	} catch (err) {
		console.log(err)
	}
})
