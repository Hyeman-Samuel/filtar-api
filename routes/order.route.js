const express = require('express');
const { check } = require('express-validator');
const Router = express.Router();
const auth_middleware = require("../middleware/auth_middleware");
const {response,RESPONSETYPE} = require("../utility/response")
const {createOrder} = require("../repository/order.repository")
const {getPackageById} = require("../repository/package.repository")
const {SendTextEmail}= require("../utility/mailer")
const role=require("../middleware/role_middleware");
const ROLES = require('../models/role');
const ORDERSTAGES = require('../constants/order');
const {uuid}=require("uuidv4");
   /**
 * @openapi
 *components:
 *    schemas:
 *      Order:
 *        type: object
 *        required:
 *          - images
 *          - event
 *        properties:
 *          images:
 *            type: string
 *            description: links to images.
 *          event:
 *            type: string
 *            description: id of event.
 */



Router.get("/",auth_middleware(),async(req,res)=>{ 

    response(res,RESPONSETYPE.OK,"reached");
})

Router.get("/:orderNumber",async(req,res)=>{ 
    const order = await getOrderByPredicate({"orderNumber":req.params.orderNumber});
    if(!order) response(res,RESPONSETYPE.NOTFOUND,"Order not found.");

    response(res,RESPONSETYPE.OK,order);
})



/**
 * @openapi
 * /v1/order:
 *   post:
 *     description: gets the images and create an order(not fully functioning yet)
 *     tags:
 *        [Order]
 *     responses:
 *       200:
 *         description: Returns a the new order.
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *              schema:    
 *                  $ref: '#/components/schemas/Order'
 */
Router.post("/",
auth_middleware(),
role(ROLES.USER,ROLES.ADMIN),
validateOrder(),async(req,res)=>{ 
    const package = await getPackageById(req.body.package)
    if(!package) response(res,RESPONSETYPE.NOTFOUND,"package not found");
    if(req.body.images.length > package.numberOfImages) response(res,RESPONSETYPE.BAD_REQUEST,"Images exceeds package limit");

    if(req.body.songs != null && req.body.images.songs > package.numberOfSongs) response(res,RESPONSETYPE.BAD_REQUEST,"Songs exceeds package limit");

    if(req.body.hashtags.length > package.numberOfHashtags) response(res,RESPONSETYPE.BAD_REQUEST,"Hashtags exceeds package limit");

    const orderBody = {
        id:uuid(),
        orderNumber: randomStr(5),
        images: req.body.images,
        songs:req.body.songs,
        hashtags:req.body.hashtags,
        PackageId:req.body.package,
        CategoryId:req.body.category,
        CustomerId:req.User.id,
        stage:ORDERSTAGES.PENDING_PAYMENT
    }
   const newOrder = await createOrder(orderBody,req.body.platforms);
    //SendTextEmail(req.User.email,`You have just order for an AR filter`,`Order ${newOrder.orderNumber} Confirmation`)
    response(res,RESPONSETYPE.OK,newOrder,"order is ready to be fulfilled");
})







Router.post("/payment/:orderId",
auth_middleware(),
role(ROLES.USER,ROLES.ADMIN),async(req,res)=>{ 
    ///fluterwave
    response(res,RESPONSETYPE.OK,"reached");
})








Router.get("/payment/webhook",async(req,res)=>{ 
    response(res,RESPONSETYPE.OK,"reached");
})







Router.post("upload/:orderId/platform/:platformId",
auth_middleware(),
role(ROLES.ARDEV),async(req,res)=>{ 
    response(res,RESPONSETYPE.OK,"reached");
})







Router.post("submit",
auth_middleware(),
role(ROLES.ARDEV),async(req,res)=>{ 
    response(res,RESPONSETYPE.OK,"reached");
})







Router.post("/deliever",
auth_middleware(),
role(ROLES.DELIVERY),async(req,res)=>{ 
    response(res,RESPONSETYPE.OK,"reached");
})




module.exports = Router 




function validateOrder(){
    return [  
        check('package', 'package is required'),
        check('category', 'category is required'),
        check('platforms', 'platforms are required').isArray({min:1}),
       check('images','Images are required').isArray({min:1}),
       check('hashtags','hashtags are required').isArray({min:1})
   ]
   }


   function randomStr(len) {
    var characters = 'ABCDEFJHIJKLMNOPQRSTUVWXYZ0123456789';
    var result = ""
    var charactersLength = characters.length;
    
    for ( var i = 0; i < len ; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}