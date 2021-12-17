const Express= require('express');
const mongoDB = require("./utility/mongoDb");
const bodyParser = require("./utility/bodyParser");
const swagger = require("./utility/swagger");
const {Logger} = require("./utility/logger")
const errorMiddleware = require("./middleware/exception_middleware")
require('express-async-errors');
require('dotenv').config()



const welcome = require("./routes/welcome");
const user = require("./routes/user.route");
const category =  require("./routes/category.route");
const event =  require("./routes/event.route");
const order = require("./routes/order.route");



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
mongoDB();
bodyParser(app);
swagger(app);
app.use("/v1/event",event);
app.use("/v1/order",order);
app.use("/v1/category",category);
app.use("/v1/auth",user);
app.use("/v1/",welcome);

app.get("/errorlogs",async (req,res,)=>{
    res.sendFile(`${__dirname}/error.log`)
  })

//app.get('*', function(req, res) {});
app.use(errorMiddleware)

app.listen(app.get('port'), function() {
Logger.info(`server listening on port ${app.get('port')}`)
});