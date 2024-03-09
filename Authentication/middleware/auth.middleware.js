
const jwt = require("jsonwebtoken")

const {blacklist} = require("../logout/blacklist")

const auth = (req,res,next)=>{
    const token = req.headers.authorization
	if(token){		
		if(blacklist.includes(token)){
			res.json({msg:"Please Login!"})
		}
					 // secret code
					 //	   ||
					 //    \/
		jwt.verify(token,"masai",(err,decoded)=>{
			if(decoded){
				// console.log(decoded)
				// res.json({msg:"You are Authorized to Movies Data"})
                next()
			}
		})
	}else{
		res.json({msg:"You are not Authorized"})
	}
}

module.exports = {
    auth
}