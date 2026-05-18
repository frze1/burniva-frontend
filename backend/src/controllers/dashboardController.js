const { DailyInput } = require("../models");

const getDashboard = async (req, res) => {
  try {
    const latest = await DailyInput.findOne({
      where: {
        user_id: req.user.id
      },
      order: [
        ["createdAt","DESC"]
      ]
    });

    const history = await DailyInput.findAll({
      where: {
        user_id: req.user.id
      },
      order: [
        ["createdAt","ASC"]
      ]
    });

    const trend = history.map(item => ({
      date: item.createdAt,
      score: item.burnout_score,
      stress: item.stress
    }));

    res.json({
      latest,
      trend
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};

module.exports = {
  getDashboard
};