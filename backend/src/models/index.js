const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = require("./User");
const DailyInput = require("./DailyInput")(sequelize, DataTypes);
const Prediction = require("./Prediction");
const Todo = require("./Todo")(sequelize, DataTypes);

// USER → DAILY INPUT
User.hasMany(DailyInput, {
  foreignKey: "user_id"
});

DailyInput.belongsTo(User, {
  foreignKey: "user_id"
});

// DAILY INPUT → PREDICTION
DailyInput.hasOne(Prediction, {
  foreignKey: "daily_input_id"
});

Prediction.belongsTo(DailyInput, {
  foreignKey: "daily_input_id"
});

// USER → TODO
User.hasMany(Todo, {
  foreignKey: "user_id"
});

Todo.belongsTo(User, {
  foreignKey: "user_id"
});

module.exports = {
  User,
  DailyInput,
  Prediction,
  Todo
};