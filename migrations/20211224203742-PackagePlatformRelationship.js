'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'PlatformPackage',
      {
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        price: {
          allowNull: false,
          type: Sequelize.DECIMAL(10,2),
        },
        PlatformId: {
          type: Sequelize.UUID,
          primaryKey: true,
          allowNull: false,
        },
        PackageId: {
          type: Sequelize.UUID,
          primaryKey: true,
          allowNull: false,
        },
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PlatformPackage');
  }
};
