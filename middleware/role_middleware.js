const {response,RESPONSETYPE} = require("../utility/response")

module.exports = (...roles)=>(req,res,next)=>{
    if(!roles.includes(req.User.role))
    response(res,RESPONSETYPE.FORBIDDEN,`Permission not granted to this role`,"FORBIDDEN")

    next()
}