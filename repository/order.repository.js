const {Order,OrderDetails,PlatformPackage,Users,sequelize,Platform} = require("../persistence/mysql");
const {uuid} = require("uuidv4")
const ORDERSTATUS = require("../constants/orderDetails")
const ROLES = require("../models/role")

module.exports ={
    getOrderById:async function (orderId){
        return await Order.findById({where:{"id":orderId}});
        },
    getOrderByPredicate:async function (obj){
        return await Order.findOne({where:obj});
    },
    getOrdersByPredicate:async function (obj){
        return await Order.find({where:obj});
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
   async verifyOrderPayment(orderId){

        const arDevs = await Users.findAll({where:{role:ROLES.ARDEV}})
        ///get one with the least workload
    },
    uploadOrder:async function(orderId,arrayOfLinks){
        // const _order =await Order.findById(orderId);
        // await _order.save();
        // return _order;
    }
}