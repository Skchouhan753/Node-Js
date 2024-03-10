const express = require("express")

const userRouter = express.Router()

const bcrypt = require("bcrypt") 

const jwt = require("jsonwebtoken")

const {UserModel} = require("../model/user.model")

const { blacklist } = require("../logout/blacklist")

// ================== user registration (without authentication) =================
userRouter.post("/register", async (req,res)=>{                                 //
    const payload = req.body                                                    //
    try{                                                                        //
        const user = new UserModel(payload)                                     //
        await user.save()                                                       //
        res.status(200).json({msg:"New user has been Register"})                //
    }catch(err){                                                                //
        res.status(400).json({err})                                             //
    }                                                                           //
})                                                                              //
//================================================================================
// ====================== login (without authentication) =========================
userRouter.post("/login", async (req,res)=>{                                    //
    const {email,password} = req.body                                           //
    try{                                                                        //
        const user = await UserModel.findOne({email,password})                  //
        if(user){                                                               //
            res.status(200).json({msg:"Log-in Successfull"})                    //
        }else{                                                                  //
            res.status(200).json({msg:"Wrong Credentials!"})                    //
        }                                                                       //
    }catch(err){                                                                //
        res.status(400).json({err})                                             //
    }                                                                           //           
})                                                                              //        
// ===============================================================================

// ==================== user registration (with authentication) ========================
userRouter.post("/register/hashed", (req,res)=>{                                      //
    const {username,email,password} = req.body                                        //
    try{                                                                              //
        bcrypt.hash(password,5, async (err,hash)=>{                                   //
            if(err){                                                                  //
                res.status(200).json({err})                                           //
            }else{                                                                    //
                const user = new UserModel({                                          //
                    username,                                                         //
                    email,                                                            //
                    password: hash                                                    //
                })                                                                    //
                await user.save()                                                     //
                res.status(200).json({msg:"New user has been Register"})              //
            }                                                                         //
        })                                                                            //
    }catch(err){                                                                      //
        res.status(400).json({err})                                                   //
    }                                                                                 //
})                                                                                    //
// =====================================================================================

// ======================================== login (with authentication) ================================================
userRouter.post("/login/hashed", async (req,res)=>{                                                                   //
    const {email,password} = req.body                                                                                 //                            
    try{                                                                                                              //
    const user = await UserModel.findOne({email})                                                                     //
    if(user){                                                                                                         //
        bcrypt.compare(password,user.password, (err,result)=>{                                                        //
            if(result){                                   // random payload as you wish | secret key | expiry         //
                                                          //                  ||             ||                       //
                                                          //                  \/             \/                       //
        res.status(200).json({msg:"Log-in Successfull!","token":jwt.sign({course:"NEM104"},"masai",{expiresIn:160})}) //
            }else{                                                                                                    //
                    res.status(200).json({msg:"Password does not match"})                                             //
            }                                                                                                         //
            })                                                                                                        //
        }else{                                                                                                        //
            res.status(200).json({msg:"Wrong Credentials!"})                                                          //
        }                                                                                                             //
    }catch(err){                                                                                                      //
        res.status(400).json({err})                                                                                   //
    }                                                                                                                 //
})                                                                                                                    //
// =====================================================================================================================

// ============================= Logout ================================
userRouter.get("/logout",(req,res)=>{                                 //
    const token = req.headers.authorization                           //
    try{                                                              //
            blacklist.push(token)                                     //
            res.status(200).json({msg:"You have been Logged out!"})   //
    }catch(err){                                                      //
        res.status(400).json({err})                                   //
    }                                                                 //
})                                                                    //
// =====================================================================
module.exports = {
	userRouter
}