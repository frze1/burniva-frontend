const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },

    name: {
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

    gender: {
      type: DataTypes.STRING,
      allowNull: true
    },

    age: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    university: {
      type: DataTypes.STRING,
      allowNull: true
    },

    major: {
      type: DataTypes.STRING,
      allowNull: true
    },

    semester: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    profile_image: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    timestamps: true,
    tableName: "users"
  }
);

module.exports = User;