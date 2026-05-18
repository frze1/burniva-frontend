const { DailyInput, Todo } = require("../models");
const { Op } = require("sequelize");

const getHistory = async (req, res) => {
  try {
    const history = await DailyInput.findAll({
      where: {
        user_id: req.user.id
      },
      order: [
        ["createdAt", "DESC"]
      ]
    });

    res.json(history);
  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};

const getHistoryById = async (req, res) => {
  try {
    const history = await DailyInput.findOne({
      where: {
        id: req.params.id,
        user_id: req.user.id
      }
    });

    if (!history) {
      return res.status(404).json({ message: "Riwayat tidak ditemukan" });
    }

    // Ambil Todo yang dibuat pada hari yang sama dengan history ini
    const startOfDay = new Date(history.createdAt);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(history.createdAt);
    endOfDay.setHours(23, 59, 59, 999);

    const todos = await Todo.findAll({
      where: {
        user_id: req.user.id,
        generated_by_ai: true,
        createdAt: {
          [Op.between]: [startOfDay, endOfDay]
        }
      }
    });

    res.json({
      history,
      todos
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

module.exports = {
  getHistory,
  getHistoryById
};