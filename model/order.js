const mongoose = require('mongoose');

const { Schema } = mongoose;

const ORDERSTAGES={
    PAYMENT_REQUIRED:"PAYMENT_REQUIRED",
    PENDING:"PENDING",
    UPLOADED:"UPLOADED",
    DELIVERED:"DELIVERED",
    CANCELLED:"CANCELLED"  
}
Object.freeze(ORDERSTAGES)


const OrdersSchema = new Schema({
orderNumber: {type:String,required:true},
price:{type:Number,required:true},
images: {type:[String],required:true},
dataCreated:{type:String,required:true,default:Date.now()},
event:{type:mongoose.Schema.Types.ObjectId,ref:'Events',required:true},
arDev:{type:mongoose.Schema.Types.ObjectId,ref:'Users'},
buyer:{type:mongoose.Schema.Types.ObjectId,ref:'Users',required:true},
stage:{type:Number,default:ORDERSTAGES.PAYMENT_REQUIRED},
arFilterLink:{type:[String]}
});






const Order = mongoose.model('Orders', OrdersSchema);

module.exports = {Order}

