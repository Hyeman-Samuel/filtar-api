'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes,Order,Platform) => {
  class OrderDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  OrderDetails.init({
    price: DataTypes.DECIMAL(10,2),
    status: DataTypes.STRING,
    link:DataTypes.STRING,
    platformName:DataTypes.STRING,
    OrderId: {
      type: DataTypes.UUID,
      references: {
        model: Order, 
        key: 'id'
      }
    },
    PlatformId: {
      type: DataTypes.UUID,
      references: {
        model: Platform, 
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'OrderDetails',
  });
  return OrderDetails;
};