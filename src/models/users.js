'use strict'

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('users', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER(),
    },
    phone: {
      allowNull: false,
      type: DataTypes.STRING(15),
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING(128),
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING(60),
    },
    fullName: {
      allowNull: true,
      type: DataTypes.STRING(128),
    },
    birthDate: {
      allowNull: true,
      type: DataTypes.DATE(),
    },
    photo: {
      allowNull: true,
      type: DataTypes.STRING(255),
    },
    validatedCode: {
      allowNull: false,
      defaultValue: false,
      type: DataTypes.BOOLEAN(),
    },
  }, {
    timestamps: false
  })
  Users.associate = function (models) {
    // associations can be defined here
  }
  return Users
}
