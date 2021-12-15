const express = require('express');
const Router = express.Router();
const passport = require('passport');
const {response,RESPONSETYPE} = require("../utility/response")

Router.get("/",async(req,res)=>{ 
    response(res,RESPONSETYPE.OK,"reached");
})


Router.post("/",async(req,res)=>{ 
    response(res,RESPONSETYPE.OK,"reached");
})


Router.get("/payment/callback",async(req,res)=>{ 
    response(res,RESPONSETYPE.OK,"reached");
})

Router.post("/upload",async(req,res)=>{ 
    response(res,RESPONSETYPE.OK,"reached");
})

Router.post("/deliever",async(req,res)=>{ 
    response(res,RESPONSETYPE.OK,"reached");
})




module.exports = Router 