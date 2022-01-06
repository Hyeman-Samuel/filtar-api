'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4

      },
      orderNumber: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      stage: {
        type: Sequelize.STRING
      },
      images: {
        type: Sequelize.JSON,
        allowNull: false
      },
      songs: {
        type: Sequelize.JSON,
        allowNull: true
      },
      arFilterLink: {
        type: Sequelize.JSON,
        allowNull: false
      },
      PackageId: {
        type: Sequelize.UUID,
        references: {
            model: 'Packages',
            key: 'id',
          },
        onDelete: 'RESTRICT',
        allowNull: false,
      },
      CategoryId: {
        type: Sequelize.UUID,
        references: {
            model: 'Categories',
            key: 'id',
          },
        onDelete: 'RESTRICT',
        allowNull: false,
      },
      ArDevId: {
        type: Sequelize.UUID,
        references: {
            model: 'Users',
            key: 'id',
          },
        onDelete: 'SET NULL',
        allowNull: true,
      },
      CustomerId: {
        type: Sequelize.UUID,
        references: {
            model: 'Users',
            key: 'id',
          },
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('Orders');
  }
};