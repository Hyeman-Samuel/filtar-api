
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




///CategoryPackage
db.category.associate = models=>{
  db.category.belongsToMany(models.Packages,{through:"CategoryPackage"})
}
db.package.associate = models=>{
  db.package.belongsToMany(models.Category,{through:"CategoryPackage"})
}
///


///PlatformPackage
db.package.associate = models=>{
  db.package.belongsToMany(models.Platform,{through:"PlatformPackage"})
}
db.platform.associate = models=>{
  db.platform.belongsToMany(models.Packages,{through:"PlatformPackage"})
} 
////

module.exports = db;