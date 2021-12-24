
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
const userModel = require("../models/user")
db.users = userModel(sequelize, Sequelize.DataTypes);

module.exports = db;