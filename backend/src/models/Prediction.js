const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Prediction = sequelize.define("Prediction", {

  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },

  risk_level: {
    type: DataTypes.ENUM(
      "Rendah",
      "Sedang",
      "Tinggi"
    ),
    allowNull: false
  },

  burnout_score: {
    type: DataTypes.FLOAT,
    allowNull: false
  },

  mental_health_index: {
    type: DataTypes.FLOAT,
    allowNull: false
  },

  analysis_text: {
    type: DataTypes.TEXT,
    allowNull: true
  },

  recommendation: {
    type: DataTypes.TEXT,
    allowNull: true
  }

}, {
  timestamps: true,
  tableName: "predictions"
});

module.exports = Prediction;