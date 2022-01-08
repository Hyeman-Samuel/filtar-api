const express = require('express');
const Router = express.Router();
const {response,RESPONSETYPE} = require("../utility/response")
const {check, validationResult } = require('express-validator');
const {createUser,authJwt,validatePassword,getUserByPredicate}= require("../repository/user.repository");

/**
 * @openapi
 *components:
 *    schemas:
 *      SignUp:
 *        type: object
 *        required:
 *          - email
 *          - password
 *          - confirm-password
*        properties:
*           email:
*            type: string
*            description: email of the user.
*           password:
*            type: string
*            description: password of the user.
*           confirmPassword:
*            type: string
*            description: password of the user.
 */

/**
 * @openapi
 *components:
 *    schemas:
 *      LogIn:
 *        type: object
 *        required:
 *          - email
 *          - password
*        properties:
*           email:
*            type: string
*            description: email of the user.
*           password:
*            type: string
*            description: password of the user.
 */


/**
 * @openapi
 * /v1/auth/login:
 *   post:
 *     description: logs user in 
 *     tags:
 *        [Auth]
 *     responses:
 *       200:
 *         description: Returns a Jwt token.
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *              schema:    
 *                  $ref: '#/components/schemas/LogIn'
 */
Router.post("/login",validateLogin(),async(req,res)=>{ 
    var errors = validationResult(req).array()

    if(errors.length != 0){
        response(res,RESPONSETYPE.BAD_REQUEST,errors)
    }
    const isCorrect = await validatePassword(req.body.email.toLowerCase(),req.body.password)
   if(isCorrect){  
  const user = await  getUserByPredicate({"email":req.body.email})
    response(res,RESPONSETYPE.OK,await authJwt(user));
   }else{
    response(res,RESPONSETYPE.UNAUTHORIZED,"Incorrect login details");  
   }
})



/**
 * @openapi
 * /v1/auth/signup:
 *   post:
 *     description: sign in user in 
 *     tags:
 *        [Auth]
 *     responses:
 *       200:
 *         description: Returns a Jwt token.
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *              schema:    
 *                  $ref: '#/components/schemas/SignUp'
 */

Router.post("/signup",validateSignUp(),async(req,res)=>{ 
    var errors = validationResult(req).array()

    if(errors.length != 0){
        response(res,RESPONSETYPE.BAD_REQUEST,errors)
    }
    var user = {
        email:req.body.email.toLowerCase(),
        password:req.body.password,
        confirmPassword:req.body.passport,
        firstName:req.body.firstName,
        lastName:req.body.lastName
    }
   const newUser = await createUser(user);

    response(res,RESPONSETYPE.OK,await authJwt(newUser));
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
       check('firstName', 'firstName is requried'),
       check('lastName', 'lastName is requried'),
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