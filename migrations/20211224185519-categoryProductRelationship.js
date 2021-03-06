'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    return queryInterface.createTable(
      'CategoryPackage',
      {
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        CategoryId: {
          type: Sequelize.UUID,
          references: {
              model: 'Categories',
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
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     return queryInterface.dropTable('CategoryPackage');
  }
};
