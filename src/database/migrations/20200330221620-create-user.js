'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      phone: {
        allowNull: false,
        type: Sequelize.STRING(15),
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(128),
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(60),
      },
      fullName: {
        allowNull: true,
        type: Sequelize.STRING(128),
      },
      birthDate: {
        allowNull: true,
        type: Sequelize.DATE(),
      },
      cpf: {
        allowNull: true,
        type: Sequelize.STRING(14),
      },
      profilePic: {
        allowNull: true,
        type: Sequelize.STRING(255)
      },
      validatedCode: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN(),
      },
      allowedNotifications: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN(),
      },
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users')
  }
};
