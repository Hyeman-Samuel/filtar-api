'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('OrderDetails', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      price: {
        type: Sequelize.DECIMAL(10,2)
      },
      status: {
        type: Sequelize.STRING
      },
      platformName: {
        type: Sequelize.STRING
      },
      link: {
        type: Sequelize.STRING,
        allowNull: true
      },
      PlatformId: {
        type: Sequelize.UUID,
        references: {
            model: 'Platforms',
            key: 'id',
          },
        onDelete: 'RESTRICT',
        allowNull: false,
      },
      OrderId: {
        type: Sequelize.UUID,
        references: {
            model: 'Orders',
            key: 'id',
          },
        onDelete: 'cascade',
        allowNull: false,
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
    await queryInterface.dropTable('OrderDetails');
  }
};