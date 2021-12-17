// let swaggerUi = require("swagger-ui-express")
// const router = require('express').Router();
// const swaggerAutogen = require("swagger-autogen")();
// const outputFile = "./swagger-output.json";
// const endpointsFiles = ["./routes/category.route.js"];
// const config = {}
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition:{
    openapi: "3.0.3",
    info:{
        title:"Filtar Api",
        version: "1.0.0",
        description:"Backend Infrasctructure",
        contact:{
          name:"Hyeman Samuel"
        },
        servers:["http://localhost:5000"]
    },
    components:{
      securitySchemes:{
        bearerAuth:{
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
        }
      }
    }
  },
  apis:['./routes/*.js'],
}



  module.exports= function (app){
    const swaggerDocument = swaggerJsdoc(swaggerOptions)
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));   
  }