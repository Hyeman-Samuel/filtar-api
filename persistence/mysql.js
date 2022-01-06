
const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
  host: process.env.DATABASE_HOST,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Users = require("../models/user")(sequelize, Sequelize.DataTypes);
db.Category = require("../models/category")(sequelize,Sequelize.DataTypes);
db.Package = require("../models/packages")(sequelize,Sequelize.DataTypes);
db.Platform = require("../models/platform")(sequelize,Sequelize.DataTypes);
db.Order = require("../models/order")(sequelize,Sequelize.DataTypes,db.Users,db.Category,db.Package);
db.OrderDetails = require("../models/orderdetails")(sequelize,Sequelize.DataTypes,db.Order,db.Platform);


db.CategoryPackage = require("../models/join/category_package")(sequelize,Sequelize.DataTypes,db.Category,db.Package);
db.PlatformPackage = require("../models/join/platform_package")(sequelize,Sequelize.DataTypes,db.Platform,db.Package);



///CategoryPackage

db.Category.belongsToMany(db.Package,{through:db.CategoryPackage,uniqueKey:"CategoryId"})
db.Package.belongsToMany(db.Category,{through:db.CategoryPackage,uniqueKey:"PackageId"})
///


///PlatformPackage
db.Package.belongsToMany(db.Platform,{through:db.PlatformPackage,uniqueKey:"PackageId"})
db.Platform.belongsToMany(db.Package,{through:db.PlatformPackage,uniqueKey:"PlatformId"})
////


db.Transaction = {
  create : async ()=>{
    try{
        const t = await sequelize.transaction({
            autocommit:false
        })

        return Promise.resolve({
            status:true,
            data:t
        })
    }catch(error){
        return Promise.reject({
            status:false,
            error
        })
    }
}
,commit :async (transaction)=>{
    try{
        await transaction.commit()
        return Promise.resolve({
            status:true,
            data:t
        })
    }catch(error){
        await transaction.rollback()
        return Promise.reject({
            status:false,
            error
        })

    }
}
,rollback : async (transaction)=>{

    try{
        await transaction.rollback()
        return Promise.resolve({
            status:true
        })
    }catch(error){
        return Promise.reject({
            status:false,
            error
        })

    }

}

}
module.exports = db;