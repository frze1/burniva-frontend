const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },

  fullname: {
    type: DataTypes.STRING,
    allowNull: false
  },

  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false
  },

  profile_image: {
    type: DataTypes.TEXT,
    allowNull: true
  },

  is_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }

}, {
  timestamps: true,
  tableName: "users"
});

module.exports = User;