const mongoose = require('mongoose');

const { Schema } = mongoose;

const EventSchema = new Schema({
eventName: {type:String,required:true},
price:{type:Number,required:true},
dataCreated:{type:String,required:true,default:Date.now()},
category:{type:mongoose.Schema.Types.ObjectId,ref:'Categories',required:true}
});




const Event = mongoose.model('Events', EventSchema);
module.exports = {Event}