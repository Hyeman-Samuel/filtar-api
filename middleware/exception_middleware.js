const {Logger} = require("../utility/logger");
const {response,RESPONSETYPE} = require("../utility/response")
module.exports = function(err,req,res,next){
    response(res,RESPONSETYPE.INTERNAL_SERVER_ERROR,err.message,"Internal server error")
    Logger.error(err.message,err)
}
