const Mongoose=require('mongoose');
const {Logger} = require("../utility/logger")

module.exports=function (){
    Mongoose.connect(process.env.MONGODB_CONNECTION_STRING,{ useNewUrlParser: true,useUnifiedTopology: true }).then(()=>{
    Logger.info("connected to mongoDb")
}).catch((err)=>{
    
    Logger.error("An error occured",err)
    ///No need for process.exit()
})
}