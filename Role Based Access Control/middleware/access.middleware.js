// const access = (req,res,next)=>{

// }

const access = (...permiedRoles)=>{
    return (req,res,next)=>{
        if(permiedRoles.includes(req.role)){
            next()
        }
    }
}

module.exports = {
    access
}