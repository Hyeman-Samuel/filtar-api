const express = require('express');
const Router = express.Router();
const auth_middleware = require("../middleware/auth_middleware");
const {response,RESPONSETYPE} = require("../utility/response")
const {check, validationResult } = require('express-validator');
const role=require("../middleware/role_middleware");
const Role = require("../model/role")
const {getEventsByPredicate,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent} = require("../repository/event.repository")

    /**
 * @openapi
 *components:
 *    schemas:
 *      Event:
 *        type: object
 *        required:
 *          - eventName
 *          - price
 *          - category
 *        properties:
 *           eventName:
 *            type: string
 *            description: name of the event.
 *           price:
 *            type: number
 *            description: price of the event.
 *           category:
 *            type: string
 *            description: guid of the category.
 */



    /**
 * @openapi
 * /v1/event:
 *   get:
 *     description: all events 
 *     responses:
 *     tags:
 *        [Event]
 *       200:
 *         description: Returns all events.
 */
Router.get("/",async(req,res)=>{ 
    response(res,RESPONSETYPE.OK,await getEventsByPredicate());
})



/**
 * @openapi
 * /v1/event/{id}:
 *   get:
 *     description: gets a single event
 *     responses:
 *     tags:
 *        [Event]
 *       200:
 *         description: Returns an event.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *            type: integer
 *         required: true
 *         description: event id
 */
Router.get("/:id",async(req,res)=>{ 
    const event = await getEventById(req.params.id)
    if(!event)response(res,RESPONSETYPE.NOTFOUND,"Event not found.");

    response(res,RESPONSETYPE.OK, event);
})




/**
 * @openapi
 * /v1/event:
 *   post:
 *     description: create an event 
 *     responses:
 *     tags:
 *        [Event]
 *       200:
 *         description: Returns a the new event.
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *              schema:    
 *                  $ref: '#/components/schemas/Event'
 */

Router.post("/", 
auth_middleware(),
role([Role.ADMIN]),
validateEvent(),async(req,res)=>{ 
    var errors = validationResult(req).array()
    console.log(req.User)
    if(errors.length != 0){
        response(res,RESPONSETYPE.BAD_REQUEST,errors)
    }

    const event = {
                eventName:req.body.eventName,
                price:req.body.price,
                category:req.body.category}
    response(res,RESPONSETYPE.OK,await createEvent(event));
})






/**
 * @openapi
 * /v1/event/{id}:
 *   put:
 *     description: edits a single event
 *     tags:
 *        [Event]
 *     responses:
 *       200:
 *         description: Returns an event.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *            type: integer
 *         required: true
 *         description: event id
 */
Router.put("/:id", 
auth_middleware(),
role([Role.ADMIN]),
validateEvent(),async(req,res)=>{ 
    var errors = validationResult(req).array()

    if(errors.length != 0){
        response(res,RESPONSETYPE.BAD_REQUEST,errors)
    }

    const event = {
        eventName:req.body.eventName,
        price:req.body.price,
        category:req.body.category}
    response(res,RESPONSETYPE.OK,await updateEvent(req.params.id,event));
})







/**
 * @openapi
 * /v1/event/{id}:
 *   delete:
 *     description: deletes event
 *     tags:
 *        [Event]
 *     responses:
 *       200:
 *         description: ok message.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *            type: integer
 *         required: true
 *         description: event id
 */
Router.delete("/:id", 
auth_middleware(),
role([Role.ADMIN]),
async(req,res)=>{ 
    response(res,RESPONSETYPE.OK,await deleteEvent(req.params.id));
})




module.exports = Router 



function validateEvent(){
    return [  check('eventName', 'Name is required'),
    check('price', 'Price is required'),
    check('category', 'category is required'),
   ]
   }