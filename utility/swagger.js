// let swaggerUi = require("swagger-ui-express")
// const router = require('express').Router();
// const swaggerAutogen = require("swagger-autogen")();
// const outputFile = "./swagger-output.json";
// const endpointsFiles = ["./routes/category.route.js"];
// const config = {}
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');

//



  module.exports= function (app){
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));   
  }