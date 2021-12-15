const {Event}= require("../model/event");


module.exports ={
    getEventById:async function (eventId){
        return await Event.findById(eventId);
        },
    getEventByPredicate:async function (obj){
        return await Event.findOne(obj);
    },
    getEventsByPredicate:async function (obj){
        return await Event.find(obj);
    },
    createEvent:async function(event){
        const _event = new Event(event)
        await _event.save();
        return _event
    },
    deleteEvent:async function(eventId){
       await Event.findByIdAndDelete(eventId);
    },
    updateEvent:async function(eventId,event){
       return await Event.findByIdAndUpdate(eventId,event)
    }
}