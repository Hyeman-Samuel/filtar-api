const mongoose = require('mongoose');

const { Schema } = mongoose;

const categorySchema = new Schema({
categoryName: {type:String,required:true},
dataCreated:{type:String,required:true,default:Date.now()},
event:[{type:mongoose.Schema.Types.ObjectId,ref:'Events'}]
});




const Category = mongoose.model('Categories', categorySchema);

module.exports = {
    Category
}