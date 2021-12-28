
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
db.users = require("../models/user")(sequelize, Sequelize.DataTypes);
db.category = require("../models/category")(sequelize,Sequelize.DataTypes);
db.package = require("../models/packages")(sequelize,Sequelize.DataTypes);
db.platform = require("../models/platform")(sequelize,Sequelize.DataTypes);

db.CategoryPackage = require("../models/join/category_package")(sequelize,Sequelize.DataTypes,db.category,db.package);
db.PlatformPackage = require("../models/join/platform_package")(sequelize,Sequelize.DataTypes,db.platform,db.package);



///CategoryPackage

db.category.belongsToMany(db.package,{through:db.CategoryPackage,uniqueKey:"CategoryId"})
db.package.belongsToMany(db.category,{through:db.CategoryPackage,uniqueKey:"PackageId"})
///


///PlatformPackage
db.package.belongsToMany(db.platform,{through:db.PlatformPackage,uniqueKey:"PackageId"})
db.platform.belongsToMany(db.package,{through:db.PlatformPackage,uniqueKey:"PlatformId"})
////

module.exports = db;