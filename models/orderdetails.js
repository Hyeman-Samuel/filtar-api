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
    price: DataTypes.STRING,
    status: DataTypes.STRING,
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