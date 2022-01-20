'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes,User,Category,Package) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Order.init({
    orderNumber: DataTypes.STRING,
    price: DataTypes.DECIMAL(10,2),
    stage: DataTypes.STRING,
    deliveryMessage: DataTypes.STRING,
    externalTransactionId: DataTypes.STRING,
    images: DataTypes.JSON,
    hashtags: DataTypes.JSON,
    songs: DataTypes.JSON,
    PackageId: {
      type: DataTypes.UUID,
      references: {
        model: Package, 
        key: 'id'
      }
    },
    CategoryId: {
      type: DataTypes.UUID,
      references: {
        model: Category, 
        key: 'id'
      }
    },
    ArDevId: {
      type: DataTypes.UUID,
      allowNull:true,
      references: {
        model: User, 
        key: 'id'
      }
    },
    CustomerId: {
      type: DataTypes.UUID,
      references: {
        model: User, 
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};