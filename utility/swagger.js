let  swaggerJsdoc = require("swagger-jsdoc")
let swaggerUi = require("swagger-ui-express")




const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Filtar API with Swagger",
        version: "0.1.0",
        description:
          "This the documented api of filtar",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "Hyeman Samuel",
          url: "",
          email: "hyemansamuel@gmail.com",
        },
      },
      servers: [
        {
          url: "http://localhost:3000/swagger",
        },
      ],
    },
    apis: ["./routes/books.js"],
  };

  module.exports=function (app){
    const specs = swaggerJsdoc(options);
    app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(specs)
    );
  }
  