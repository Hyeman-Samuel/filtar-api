const express = require('express');
const Router = express.Router();
const {response,RESPONSETYPE} = require("../utility/response")
const {check, validationResult } = require('express-validator');
const {createUser,authJwt,validatePassword,getUserByPredicate}= require("../repository/user.repository");

Router.post("/login",validateLogin(),async(req,res)=>{ 
    var errors = validationResult(req).array()

    if(errors.length != 0){
        response(res,RESPONSETYPE.BAD_REQUEST,errors)
    }
    const isCorrect = await validatePassword(req.body.email.toLowerCase(),req.body.password)
   if(isCorrect){
  const user = await  getUserByPredicate({email:req.body.email})
    response(res,RESPONSETYPE.OK,await authJwt(user._id));
   }else{
    response(res,RESPONSETYPE.UNAUTHORIZED,"Incorrect login details");  
   }
})

Router.post("/signup",validateSignUp(),async(req,res)=>{ 
    var errors = validationResult(req).array()

    if(errors.length != 0){
        response(res,RESPONSETYPE.BAD_REQUEST,errors)
    }
    var user = {
        email:req.body.email.toLowerCase(),
        password:req.body.password,
        confirmPassword:req.body.passport
    }
   const newUser = await createUser(user);

    response(res,RESPONSETYPE.OK,await authJwt(newUser._id));
})


Router.post("/forgotPassword",async(req,res)=>{ 
    response(res,RESPONSETYPE.OK,"reached");
})


Router.post("/passwordReset",async(req,res)=>{ 
    response(res,RESPONSETYPE.OK,"reached");
})




module.exports = Router 



function validateSignUp(){
    return [  check('email', 'Email is required'),
       check('password', 'Password is requried'),
       check('confirmPassword', 'Password Confirmation is requried')
       .isLength({ min: 1 })
   ]
   }

function validateLogin(){
    return [  check('email', 'Email is required'),
       check('password', 'Password is requried')
       .isLength({ min: 1 })
   ]
   }