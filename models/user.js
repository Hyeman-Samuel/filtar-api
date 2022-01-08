'use strict';
const {
  Model,DataTypes
} = require('sequelize');
module.exports = (sequelize, DataType) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    hash: DataTypes.STRING(10000),
    salt: DataTypes.STRING,
    role: DataTypes.STRING,
    workload: DataTypes.INTEGER
  }, {
    sequelize: sequelize,
    modelName: 'User',
  });
  return User;
};