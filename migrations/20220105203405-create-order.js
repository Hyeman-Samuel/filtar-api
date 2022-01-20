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
        type: Sequelize.DECIMAL(10,2)
      },
      stage: {
        type: Sequelize.STRING
      },
      deliveryMessage: {
        type: Sequelize.STRING,
        allowNull: true
      },
      externalTransactionId: {
        type: Sequelize.STRING,
        allowNull: true
      },
      images: {
        type: Sequelize.JSON,
        allowNull: false
      },
      hashtags: {
        type: Sequelize.JSON,
        allowNull: false
      },
      songs: {
        type: Sequelize.JSON,
        allowNull: true
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