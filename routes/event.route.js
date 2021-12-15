const express = require('express');
const Router = express.Router();
const passport = require('passport');
const {response,RESPONSETYPE} = require("../utility/response")
const {check, validationResult } = require('express-validator');
const role=require("../middleware/role_middleware");
const Role = require("../model/role")
const {getEventsByPredicate,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent} = require("../repository/event.repository")

Router.get("/",async(req,res)=>{ 
    response(res,RESPONSETYPE.OK,await getEventsByPredicate());
})

Router.get("/:id",async(req,res)=>{ 
    const event = await getEventById(req.params.id)
    if(!event)response(res,RESPONSETYPE.NOTFOUND,"Event not found.");

    response(res,RESPONSETYPE.OK, event);
})


Router.post("/", 
passport.authenticate('jwt', { session: false }),
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
    response(res,RESPONSETYPE.OK,await createEvent(event));
})


Router.put("/:id", 
passport.authenticate('jwt', { session: false }),
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


Router.delete("/:id", 
passport.authenticate('jwt', { session: false }),
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