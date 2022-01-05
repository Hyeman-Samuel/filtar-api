'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Packages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Packages.init({
    packageName: DataTypes.STRING,
    packageAlias: DataTypes.STRING,
    numberOfHashtags: DataTypes.INTEGER,
    numberOfSongs: DataTypes.INTEGER,
    numberOfFrames: DataTypes.INTEGER,
    numberOfImages: DataTypes.INTEGER,
    infographicLink: DataTypes.JSON,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Packages',
  });
  return Packages;
};