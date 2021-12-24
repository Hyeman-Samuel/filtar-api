const {response,RESPONSETYPE} = require("../utility/response")
const jwt = require('jsonwebtoken');
const {getUserById} = require("../repository/user.repository");
module.exports =()=>  (req,res,next)=>{
    if(!req.headers.authorization)
        response(res,RESPONSETYPE.UNAUTHORIZED,"Invalid token","UNAUTHORIZED")

    let splitAuthHeader= req.headers.authorization.split(" ")
    if(splitAuthHeader[0] != "Bearer")
        response(res,RESPONSETYPE.UNAUTHORIZED,"Invalid token","UNAUTHORIZED")


    jwt.verify(splitAuthHeader[1],process.env.JWT_SECRET,async (err,user)=>{
        if(err)response(res,RESPONSETYPE.UNAUTHORIZED,err.message,"UNAUTHORIZED")

        const _user = await getUserById(user.id)
        req.User = _user
        next()
    })
    
}