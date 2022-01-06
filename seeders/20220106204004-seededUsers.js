'use strict';
const { uuid } = require('uuidv4');
const ROLES = require("../models/role");
const crypto = require('crypto');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salt = crypto.randomBytes(16).toString('hex');
    return queryInterface.bulkInsert('Users', [
      {
        id:uuid(),
        email: 'admin@filtar.africa',
        hash:crypto.pbkdf2Sync("admin", salt, 10000, 512, 'sha512').toString('hex'),
        firstName:'Admin',
        lastName:'User',
        salt:salt,
        role:ROLES.ADMIN,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
      id:uuid(),
      email: 'wusudanny@gmail.com',
      hash:crypto.pbkdf2Sync("admin", salt, 10000, 512, 'sha512').toString('hex'),
      firstName:'Daniel',
      lastName:'Wusu',
      salt:salt,
      role:ROLES.ARDEV,
      createdAt:new Date(),
      updatedAt:new Date()
    },
    {
      id:uuid(),
      email: 'bshobanke2@gmail.com',
      hash:crypto.pbkdf2Sync("admin", salt, 10000, 512, 'sha512').toString('hex'),
      firstName:'Tito',
      lastName:'Shobanke',
      salt:salt,
      role:ROLES.ARDEV,
      createdAt:new Date(),
      updatedAt:new Date()
    },
    {
      id:uuid(),
      email: 'victoryleke@gmail.com',
      hash:crypto.pbkdf2Sync("admin", salt, 10000, 512, 'sha512').toString('hex'),
      firstName:'Seyi',
      lastName:'Adebanjo',
      salt:salt,
      role:ROLES.ARDEV,
      createdAt:new Date(),
      updatedAt:new Date()
    },
    {
      id:uuid(),
      email: 'fasanmijoel@gmail.com',
      hash:crypto.pbkdf2Sync("admin", salt, 10000, 512, 'sha512').toString('hex'),
      firstName:'Joel',
      lastName:'Fasanmi',
      salt:salt,
      role:ROLES.ARDEV,
      createdAt:new Date(),
      updatedAt:new Date()
    },
    {
      id:uuid(),
      email: 'fasanmidaniel@gmail.com',
      hash:crypto.pbkdf2Sync("admin", salt, 10000, 512, 'sha512').toString('hex'),
      firstName:'Daniel',
      lastName:'Fasanmi',
      salt:salt,
      role:ROLES.DELIVERY,
      createdAt:new Date(),
      updatedAt:new Date()
    },
    {
      id:uuid(),
      email: 'oluchiogbonnaya410@gmail.com',
      hash:crypto.pbkdf2Sync("admin", salt, 10000, 512, 'sha512').toString('hex'),
      firstName:'Oluchi',
      lastName:'Ogbonanya',
      salt:salt,
      role:ROLES.DELIVERY,
      createdAt:new Date(),
      updatedAt:new Date()
    }

  ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
