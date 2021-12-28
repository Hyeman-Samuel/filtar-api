'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes,Platform,Package) => {
  class PlatformPackage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  PlatformPackage.init({
    PlatformId: {
        type: DataTypes.UUID,
        references: {
          model: Platform, 
          key: 'id'
        }
      },
    PackageId:{
        type: DataTypes.UUID,
        references: {
          model: Package,
          key: 'id'
        }
      },
    price:DataTypes.DECIMAL

  }, {
    sequelize,
    modelName: 'Platform_Package',
    tableName: 'PlatformPackage'
  });
  return PlatformPackage;
};