

module.exports = (...roles)=>(req,res,next)=>{
    console.log(req)
    console.log(roles)
    next()
}