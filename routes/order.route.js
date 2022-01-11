const express = require('express');
const { check } = require('express-validator');
const Router = express.Router();
const auth_middleware = require("../middleware/auth_middleware");
const {response,RESPONSETYPE} = require("../utility/response")
const {createOrder,getOrderByPredicate, assignArDeveloper,getOrdersByPredicate,uploadOrderToPlatform,submitForDelievery,sendBackToArDev,setOrderAsDelievered} = require("../repository/order.repository")
const {getPackageById} = require("../repository/package.repository")
const {SendTextEmail}= require("../utility/mailer");
const {flutterwave}=require("../utility/payments/flutterwave")
const role=require("../middleware/role_middleware");
const ROLES = require('../models/role');
const ORDERSTAGES = require('../constants/order');
const {uuid}=require("uuidv4");
const redirectUrlPath ="/flutterwave/redirect";
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
    let orders;
    switch (ROLES) {
        case ROLES.USER:
            orders = await getOrdersByPredicate({"CustomerId":req.User.id})
            break;
        case ROLES.ARDEV:
            orders = await getOrdersByPredicate({"ArDevId":req.User.id,"stage":ORDERSTAGES.PENDING_UPLOAD})
            break;
        case ROLES.DELIVERY:
            orders = await getOrdersByPredicate({"stage":ORDERSTAGES.UPLOADED})
            break;
        case ROLES.ADMIN:
            orders = await getOrdersByPredicate()
            break;
    
        default:
            orders = null
            break;
    }
    if(!orders) response(res,RESPONSETYPE.NOTFOUND,"No Orders yet");


    response(res,RESPONSETYPE.OK,orders);
})

Router.get("/:orderNumber",auth_middleware(),async(req,res)=>{ 
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

    if(req.body.songs != null && req.body.songs.length > package.numberOfSongs) response(res,RESPONSETYPE.BAD_REQUEST,"Songs exceeds package limit");

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







Router.post("/:orderNumber/payment/flutterwave",
auth_middleware(),
role(ROLES.USER,ROLES.ADMIN),async(req,res)=>{ 
    const order = await getOrderByPredicate({orderNumber:req.params.orderNumber})
    if(!order || order.CustomerId != req.User.id) response(res,RESPONSETYPE.FORBIDDEN,"Order does not exist"); 
    if(order.stage == ORDERSTAGES.PENDING_CONFIRMATION) response(res,RESPONSETYPE.NOTFOUND,"Order must be confirmed "); 
    if(order.stage == ORDERSTAGES.CANCELLED) response(res,RESPONSETYPE.NOTFOUND,"Order is cancelled already"); 
    if(order.stage != ORDERSTAGES.PENDING_PAYMENT) response(res,RESPONSETYPE.CONFLICT,"Transaction has already been made"); 
    // let redirectUrl = req.hostname+redirectUrlPath;
    // console.log(redirectUrl)
    let result = await flutterwave.initializePayment(order,req.User,redirectUrl)
    response(res,RESPONSETYPE.OK,{"redirectUrl":result.data.link});
})








Router.get(redirectUrlPath,async(req,res)=>{ 

    assignArDeveloper("f2b8ee08-fa1f-42d7-a3d5-e5a32c8c853c")
    response(res,RESPONSETYPE.OK,"reached");
})







Router.post("/:orderId/upload/platform/:platformId",
auth_middleware(),
role(ROLES.ARDEV,ROLES.ADMIN),
validateUpload(),async(req,res)=>{ 
    const {orderId,platformId} = req.params
    response(res,RESPONSETYPE.OK,await uploadOrderToPlatform(orderId,platformId,req.body.link));
})







Router.post("/:orderId/submit",
auth_middleware(),
role(ROLES.ARDEV,ROLES.ADMIN),async(req,res)=>{ 
    response(res,RESPONSETYPE.OK,await submitForDelievery(req.params.orderId));
})


Router.post("/:orderId/sendback",
auth_middleware(),
role(ROLES.DELIVERY,ROLES.ADMIN),async(req,res)=>{ 
    let message = req.body.message ?req.body.message:"";
    response(res,RESPONSETYPE.OK,await sendBackToArDev(req.params.orderId,message));
})




Router.post("/:orderId/deliever",
auth_middleware(),
role(ROLES.DELIVERY,ROLES.ADMIN),async(req,res)=>{ 
    const order = await setOrderAsDelievered(req.params.orderId);
    //await SendTextEmail()
    response(res,RESPONSETYPE.OK,`Delievered order number ${order.orderNumber}`);
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
function validateUpload(){
    return [  
        check('link', 'link is required')
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