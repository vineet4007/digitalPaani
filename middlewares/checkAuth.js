const jwt = require("jsonwebtoken")
const db=require("../dbConnection/dao")
 module.exports.checkUser = function(req, res, next) {
    try {
        let token = req.headers.authtoken
        if (token) {
            jwt.verify(token , process.env.SECRET_KEY, function(err , user){
                if(err){res.send({status:0,message:"auth token no valid"})}
                else{
                   let data =  db.user.findOne({_id:user._id})
                        req.user=data
                        next()   
                }
            })
         }
    else{
            console.log("No Token")
            return res.send({status:0,message:"No token error"})
        }
    } catch (error) {
        console.log("auth check error ", error)
        res.send({ status: 0, message: "Auth Error", })
    }
}
