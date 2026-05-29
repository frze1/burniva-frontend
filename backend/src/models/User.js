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
    },

    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
      allowNull: false
    },

    is_suspended: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },

    reset_token: {
      type: DataTypes.TEXT,
      allowNull: true
    },

    reset_token_expire: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    timestamps: true,
    tableName: "users"
  }
);

module.exports = User;