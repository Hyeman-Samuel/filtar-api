const express = require('express');
const { check } = require('express-validator');
const Router = express.Router();
const passport = require('passport');
const {response,RESPONSETYPE} = require("../utility/response")
const {createOrder} = require("../repository/order.repository")
const {SendTextEmail}= require("../utility/mailer")

Router.get("/",async(req,res)=>{ 
    response(res,RESPONSETYPE.OK,"reached");
})

Router.get("/:orderNumber",async(req,res)=>{ 
    response(res,RESPONSETYPE.OK,"reached");
})



Router.post("/",validateOrder(),async(req,res)=>{ 
    const order = {
        orderNumber: Math.floor(1000 + Math.random() * 9000),
        price:req.body.price,
        images: req.body.images,
        event:req.body.event,
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

Router.post("/upload",async(req,res)=>{ 
    response(res,RESPONSETYPE.OK,"reached");
})

Router.post("/deliever",async(req,res)=>{ 
    response(res,RESPONSETYPE.OK,"reached");
})




module.exports = Router 




function validateOrder(){
    return [  check('event', 'Event is required'),
       check('price', 'Price is requried'),
       check('images','Images are required').isArray({min:1})
   ]
   }