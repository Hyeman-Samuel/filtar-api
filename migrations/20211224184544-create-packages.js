'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Packages', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      packageName: {
        type: Sequelize.STRING,
        allowNull: false       
      },
      packageAlias: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
      },
      numberOfHashtags: {
        type: Sequelize.INTEGER
      },
      numberOfSongs: {
        type: Sequelize.INTEGER
      },
      numberOfFrames: {
        type: Sequelize.INTEGER
      },
      numberOfImages: {
        type: Sequelize.INTEGER
      },
      active: {
        type: Sequelize.BOOLEAN
      },
      mustReachOut:{
        type: Sequelize.BOOLEAN
      },
      infographicLink: {
        type: Sequelize.JSON,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Packages');
  }
};