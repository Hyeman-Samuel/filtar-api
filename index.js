const Express= require('express');
const mongoDB = require("./utility/mongoDb");
const bodyParser = require("./utility/bodyParser");
const passport = require("./utility/passport");
const swagger = require("./utility/swagger");
const {Logger} = require("./utility/logger")
const errorMiddleware = require("./middleware/exception_middleware")
require('express-async-errors');
require('dotenv').config()



const welcome = require("./routes/welcome");
const user = require("./routes/user.route");
const category =  require("./routes/category.route");
const event =  require("./routes/event.route");



if (process.env.NODE_ENV !== 'production') {
    Logger.SetConsoleLogger()
    }
    
    process.on('unhandledRejection',(ex)=>{
      Logger.error(ex.message,ex)
    })
    
    process.on('uncaughtException',(ex)=>{
      Logger.error(ex.message,ex)
    })


const app = Express();
app.use(Express.json());
app.set('port', process.env.PORT || 3000)
passport(app)
mongoDB();
bodyParser(app);
swagger(app);
app.use("/event",event);
app.use("/category",category);
app.use("/auth",user);
app.use("/",welcome);

app.get("/errorlogs",async (req,res,)=>{
    res.sendFile(`${__dirname}/error.log`)
  })

//app.get('*', function(req, res) {});
app.use(errorMiddleware)

app.listen(app.get('port'), function() {
Logger.info(`server listening on port ${app.get('port')}`)
});