'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes,Category,Package) => {
  class CategoryPackage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  CategoryPackage.init({
    CategoryId: {
        type: DataTypes.UUID,
        references: {
          model: Category, 
          key: 'id'
        }
      },
    PackageId:{
        type: DataTypes.UUID,
        references: {
          model: Package,
          key: 'id'
        }
      }

  }, {
    sequelize,
    modelName: 'Category_Package',
    tableName: 'CategoryPackage'
  });
  return CategoryPackage;
};