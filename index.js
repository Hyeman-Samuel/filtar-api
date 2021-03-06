const Express= require('express');
//const mongoDB = require("./utility/mongoDb");

const bodyParser = require("./utility/bodyParser");
const swagger = require("./utility/swagger");
const {Logger} = require("./utility/logger");
const {response,RESPONSETYPE} = require("./utility/response")
const errorMiddleware = require("./middleware/exception_middleware")
require('express-async-errors');
require('dotenv').config()
const mysql = require("./persistence/mysql");


const welcome = require("./routes/welcome");
const user = require("./routes/user.route");
const category =  require("./routes/category.route");
const package =  require("./routes/package.route");
const order = require("./routes/order.route");
const platform = require("./routes/platform.route");



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
//mongoDB();

mysql.sequelize.sync().then(() => {
  Logger.info("connected to mysql")
  }
)

bodyParser(app);
swagger(app);
app.use("/v1/package",package);
app.use("/v1/order",order);
app.use("/v1/platform",platform);
app.use("/v1/category",category);
app.use("/v1/auth",user);
app.use("/v1/",welcome);

app.get("/v1/errorlogs",async (req,res,)=>{
    res.sendFile(`${__dirname}/error.log`)
  })

app.get('*', function(req, res) {
  response(res,RESPONSETYPE.NOTFOUND,"Path Not Found");
});

app.use(errorMiddleware)

app.listen(app.get('port'), function() {
Logger.info(`server listening on port ${app.get('port')}`)
});