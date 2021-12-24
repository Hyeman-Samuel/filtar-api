
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
//var conn=mysql.createConnection({host:"devtest.mysql.database.azure.com", user:"hyeman", password:"{your_password}", database:"{your_database}", port:3306, ssl:{ca:fs.readFileSync("{ca-cert filename}")}});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("../models/user")(sequelize, Sequelize.DataTypes);
db.category = require("../models/category")(sequelize,Sequelize.DataTypes);
db.package = require("../models/packages")(sequelize,Sequelize.DataTypes);





db.category.associate = models=>{
  db.category.belongsToMany(models.Packages,{through:"CategoryPackage"})
}

db.package.associate = models=>{
  db.package.belongsToMany(models.Category,{through:"CategoryPackage"})
}


module.exports = db;