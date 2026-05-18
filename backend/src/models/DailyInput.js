const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const DailyInput = sequelize.define("DailyInput", {

  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },

  // MENTAL
  stress_level: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  anxiety_level: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  emotional_pressure: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  // AKADEMIK
  academic_pressure: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  study_duration: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  // GAYA HIDUP
  sleep_duration: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  financial_pressure: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  family_expectation: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  social_support: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  exercise_duration: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }

}, {
  timestamps: true,
  tableName: "daily_inputs"
});

module.exports = DailyInput;