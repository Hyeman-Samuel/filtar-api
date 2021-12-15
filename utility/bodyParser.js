const cookieParser = require('cookie-parser');
const BodyParser=require('body-parser');
const helmet = require("helmet");
const compression= require("compression");

module.exports=function (app){
    app.use(BodyParser.urlencoded({extended:true}));
    app.use(cookieParser());
    app.use(helmet());
    app.use(compression());
}