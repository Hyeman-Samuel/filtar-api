const mongoose = require('mongoose');

const { Schema } = mongoose;

const pricesSchema = new Schema({
instagram:{type:Number,default:null},
snapchat:{type:Number,default:null},
instagram_snapchat:{type:Number,default:null}
})

const packageSchema = new Schema({
packageName: {type:String,required:true},
packageAlias: {type:String,required:true,unique:true},
prices:{type:pricesSchema,required:true},
dataCreated:{type:String,required:true,default:Date.now()},
numberOfHashtags:{type:Number,required:true},
numberOfSongs:{type:Number,required:true},
numberOfFrames:{type:Number,required:true},
numberOfImages:{type:Number,required:true},
category:{type:mongoose.Schema.Types.ObjectId,ref:'Categories',required:true}
});




const Package = mongoose.model('Packages', packageSchema);
module.exports = {Package}