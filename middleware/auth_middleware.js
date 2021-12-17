const {response,RESPONSETYPE} = require("../utility/response")
const jwt = require('jsonwebtoken');
const {User} = require("../model/user");
module.exports =()=>  (req,res,next)=>{
    jwt.verify(req.headers.authorization,process.env.JWT_SECRET,async (err,user)=>{
        if(err)response(res,RESPONSETYPE.UNAUTHORIZED,err.message,"UNAUTHORIZED")

        const _user = await User.findById(user.id)
        req.User = _user
        next()
    })
    
}