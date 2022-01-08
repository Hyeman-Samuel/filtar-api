const express = require('express');
const Router = express.Router();
const auth_middleware = require("../middleware/auth_middleware");
const {response,RESPONSETYPE} = require("../utility/response")
const {check, validationResult } = require('express-validator');
const role=require("../middleware/role_middleware");
const { getPlatformByPredicate, createPlatform } = require("../repository/platform.repository");
const ROLES = require('../models/role');

    /**
 * @openapi
 *components:
 *    schemas:
 *      Platform:
 *        type: object
 *        required:
 *          - platformName
 *        properties:
 *           platformName:
 *            type: string
 *            description: name of the platfrom.
 */



    /**
 * @openapi
 * /v1/platform:
 *   get:
 *     description: all platforms 
 *     tags:
 *        [Platform]
 *     responses:
 *       200:
 *         description: Returns all platforms.
 */
Router.get("/",async(req,res)=>{ 
    response(res,RESPONSETYPE.OK,await getPlatformByPredicate());
})



// /**
//  * @openapi
//  * /v1/platform/{id}:
//  *   get:
//  *     description: gets a single event
//  *     tags:
//  *        [Platform]
//  *     responses:
//  *       200:
//  *         description: Returns an event.
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *            type: integer
//  *         required: true
//  *         description: event id
//  */
// Router.get("/:id",async(req,res)=>{ 
//     const event = await getEventById(req.params.id)
//     if(!event)response(res,RESPONSETYPE.NOTFOUND,"Event not found.");

//     response(res,RESPONSETYPE.OK, event);
// })




/**
 * @openapi
 * /v1/platform:
 *   post:
 *     description: create an platform
 *     tags:
 *        [Platform]
 *     responses:
 *       200:
 *         description: Returns a the new platfrom.
 */
Router.post("/", 
auth_middleware(),
role(ROLES.ADMIN),
async(req,res)=>{ 
    var errors = validationResult(req).array()
    if(errors.length != 0){
        response(res,RESPONSETYPE.BAD_REQUEST,errors)
    }

    const platform = {
                platformName:req.body.platformName}
    response(res,RESPONSETYPE.OK,await createPlatform(platform));
})






// /**
//  * @openapi
//  * /v1/event/{id}:
//  *   put:
//  *     description: edits a single event
//  *     tags:
//  *        [Event]
//  *     responses:
//  *       200:
//  *         description: Returns an event.
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *            type: integer
//  *         required: true
//  *         description: event id
//  */
// Router.put("/:id", 
// auth_middleware(),
// role(ROLES.ADMIN),
// validateEvent(),async(req,res)=>{ 
//     var errors = validationResult(req).array()

//     if(errors.length != 0){
//         response(res,RESPONSETYPE.BAD_REQUEST,errors)
//     }

//     const event = {
//         eventName:req.body.eventName,
//         price:req.body.price,
//         category:req.body.category}
//     response(res,RESPONSETYPE.OK,await updateEvent(req.params.id,event));
// })







// /**
//  * @openapi
//  * /v1/event/{id}:
//  *   delete:
//  *     description: deletes event
//  *     tags:
//  *        [Event]
//  *     responses:
//  *       200:
//  *         description: ok message.
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *            type: integer
//  *         required: true
//  *         description: event id
//  */
// Router.delete("/:id", 
// auth_middleware(),
// role(ROLES.ADMIN),
// async(req,res)=>{ 
//     response(res,RESPONSETYPE.OK,await deleteEvent(req.params.id));
// })




module.exports = Router 



function validatePlatform(){
    return [  check('platformName', 'Name is required')]
   }