const mongoose = require('mongoose');

const { Schema } = mongoose;

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



const ORDERSTAGES={
    PAYMENT_REQUIRED:0,
    PENDING:1,
    UPLOADED:2,
    DELIVERED:3,
    CANCELLED:4  
}
Object.freeze(ORDERSTAGES)


const Order = mongoose.model('Orders', OrdersSchema);

module.exports = {Order}

