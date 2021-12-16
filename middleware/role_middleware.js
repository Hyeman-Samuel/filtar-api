

module.exports = (...roles)=>(req,res,next)=>{
    console.log(roles)
    next()
}