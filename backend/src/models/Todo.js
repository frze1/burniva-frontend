const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Todo = sequelize.define("Todo", {

  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },

  category: {
    type: DataTypes.ENUM(
      "Mental",
      "Tidur",
      "Aktivitas",
      "Akademik"
    ),
    allowNull: false
  },

  priority: {
    type: DataTypes.ENUM(
      "Tinggi",
      "Sedang",
      "Rendah"
    ),
    allowNull: false
  },

  icon: {
    type: DataTypes.STRING,
    allowNull: true
  },

  is_completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },

  is_ai_generated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }

}, {
  timestamps: true,
  tableName: "todos"
});

module.exports = Todo;