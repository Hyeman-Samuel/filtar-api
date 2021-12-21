const {Order} = require("../model/order");


module.exports ={
    getOrderById:async function (orderId){
        return await Order.findById(orderId);
        },
    getOrderByPredicate:async function (obj){
        return await Event.findOne(obj);
    },
    getOrdersByPredicate:async function (obj){
        return await Event.find(obj);
    },
    createOrder:async function(order){
        const _order = new Order(order)
        await _order.save();
        return _order;
    },
    uploadOrder:async function(orderId,arrayOfLinks){
        const _order =await Order.findById(orderId);
        await _order.save();
        return _order;
    }
}