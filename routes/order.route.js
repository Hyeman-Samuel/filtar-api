const express = require('express');
const { check } = require('express-validator');
const Router = express.Router();
const auth_middleware = require("../middleware/auth_middleware");
const {response,RESPONSETYPE} = require("../utility/response")
const {createOrder,getOrderByPredicate,getOrdersByPredicate} = require("../repository/order.repository")
const {SendTextEmail}= require("../utility/mailer")
const {getEventById}=require("../repository/event.repository")
const role=require("../middleware/role_middleware");
const ROLES = require('../models/role');
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
 *     description: gets the images and create an order
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
    const event = await getEventById(req.body.event)
    if(!event) response(res,RESPONSETYPE.NOTFOUND,"event not found");
    const order = {
        orderNumber: Math.floor(1000 + Math.random() * 9000),
        price:event.price,
        images: req.body.images,
        event:event._id,
        buyer:req.User._id,
    }

   const newOrder = await createOrder(order);
    SendTextEmail(req.User.email,`You have just order for an AR filter`,`${newOrder.orderNumber} Confirmation`)

    ////flutterwave
    response(res,RESPONSETYPE.OK,newOrder,"order is ready to be fulfilled");
})


Router.get("/payment/callback",async(req,res)=>{ 
    response(res,RESPONSETYPE.OK,"reached");
})

Router.post("/upload",
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
    return [  check('event', 'Event is required'),
       check('price', 'Price is requried'),
       check('images','Images are required').isArray({min:1})
   ]
   }