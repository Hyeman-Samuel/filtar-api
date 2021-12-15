const express = require('express');
const Router = express.Router();
const passport = require('passport');
const {response,RESPONSETYPE} = require("../utility/response")
const role=require("../middleware/role_middleware");


Router.get("/",role(["ADMIN","USER"]),async(req,res)=>{ 
    response(res,RESPONSETYPE.OK,"reached");
})





module.exports = Router 