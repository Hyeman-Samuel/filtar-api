const {Order,OrderDetails,PlatformPackage,Users,sequelize,Platform} = require("../persistence/mysql");
const {uuid} = require("uuidv4")
const ORDERSTAGES = require("../constants/order")
const ORDERSTATUS = require("../constants/orderDetails")
const ROLES = require("../models/role")

module.exports ={
    getOrderById:async function (orderId){
        return await Order.findById({where:{"id":orderId},include:OrderDetails});
        },
    getOrderByPredicate:async function (obj){
        return await Order.findOne({where:obj,include:OrderDetails});
    },
    getOrdersByPredicate:async function (obj){
        return await Order.find({where:obj,include:OrderDetails});
    },
    previewOrder:async function(order,platforms){

    let packagePlatforms = await PlatformPackage.findAll({where:{PlatformId:platforms,PackageId:order.PackageId},include:Platform})
        let totalPrice = 0;
        packagePlatforms.map((packagePlatform) => {
        totalPrice += parseFloat(packagePlatform.price);
        });
        if(packagePlatforms.length>1){
            totalPrice -= (0.1*totalPrice)
        }
        order.price = totalPrice;
        let orderDetails =[];

        packagePlatforms.map((packagePlatform)=>{
            orderDetails.pop({
            price:packagePlatform.price,
            Platform:packagePlatform.Platform
            })
        })

        return {order:order,details:orderDetails};
    },
    createOrder:async function(order,platforms){
        let packagePlatforms = await PlatformPackage.findAll({where:{PlatformId:platforms,PackageId:order.PackageId},include:Platform})
        let totalPrice = 0;
        packagePlatforms.map((packagePlatform) => {
        totalPrice += parseFloat(packagePlatform.price);
        });
        if(packagePlatforms.length>1){
            totalPrice -= (0.1*totalPrice)
        }
        order.price = totalPrice;
        const _order = await (await Order.create(order)).toJSON()
        let orderDetails =[];

        packagePlatforms.map((packagePlatform)=>{
            orderDetails.push({
            id:uuid(),
            price:packagePlatform.price,
            PlatformId:packagePlatform.PlatformId,
            platformName:packagePlatform.Platform.platformName,
            OrderId:_order.id,
            status:ORDERSTATUS.PROCESSING
            })
        })
        const _details = await OrderDetails.bulkCreate(orderDetails);

        return {order:_order,details:_details};
    },
    assignArDeveloper:async function(orderId){
        const order = await Order.findOne({where:{"id":orderId}});
        const arDevs = await Users.findAll({where:{role:ROLES.ARDEV}})
        arDevs.sort((a,b)=>{
        return a.workload - b.workload;
        })
        order.stage = ORDERSTAGES.PENDING_UPLOAD
        order.ArDevId = arDevs[0].id;
        await order.save()
        arDevs[0].workload += 1
        await arDevs[0].save()
    },
    uploadOrderToPlatform:async function(orderId,platformId,link){
        const _orderDetails = await OrderDetails.findOne({where:{"OrderId":orderId,"PlatformId":platformId}});
        if(!_orderDetails) throw new Error("Order not found");

        _orderDetails.link = link
        _orderDetails.status = ORDERSTATUS.UPLOADED
        await _orderDetails.save();
        return _orderDetails;
    },
    submitForDelievery: async function (orderId){
        const order = await Order.findOne({where:{"id":orderId},include:OrderDetails});
        let isReadyToBeSubmitted = true;
        order.OrderDetails.forEach(details => {
            if(details.status != ORDERSTATUS.UPLOADED){
                isReadyToBeSubmitted = false
            }
        });
        if(isReadyToBeSubmitted){
            order.stage = ORDERSTAGES.UPLOADED;
            await order.save()
        }
    },
    sendBackToArDev:async function(orderId,message){
        const order = await Order.findOne({where:{"id":orderId}})
        order.stage = ORDERSTAGES.PENDING_UPLOAD;
        ///set Order DelieveryMessage 

        await order.save()
    },
    setOrderAsDelievered:async function(orderId){
        const order = await Order.findOne({where:{"id":orderId}})   
        order.stage = ORDERSTAGES.DELIVERED;

        await order.save()
        return order
    }
}