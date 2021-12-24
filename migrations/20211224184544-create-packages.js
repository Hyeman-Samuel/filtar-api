'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Packages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      packageName: {
        type: Sequelize.STRING,
        allowNull: false       
      },
      packageAlias: {
        type: Sequelize.STRING,
        allowNull: false
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