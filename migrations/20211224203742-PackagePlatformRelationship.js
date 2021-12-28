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
          references: {
            model: 'Platforms',
            key: 'id',
          },
          onDelete: 'cascade',
          primaryKey: true,
          allowNull: false,
        },
        PackageId: {
          type: Sequelize.UUID,
          references: {
            model: 'Packages',
            key: 'id',
          },
          onDelete: 'cascade',
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
