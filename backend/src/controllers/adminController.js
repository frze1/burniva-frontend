const { User, DailyInput, Todo } = require("../models");
const { Op } = require("sequelize");

// GET STATS (Dashboard)
const getStats = async (req, res) => {
  try {
    const totalUsers = await User.count({ where: { role: 'user' } });
    
    // Asumsi pengguna aktif = ada DailyInput hari ini
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    
    const activeToday = await DailyInput.count({
      distinct: true,
      col: 'user_id',
      where: {
        createdAt: {
          [Op.between]: [startOfDay, endOfDay]
        }
      }
    });

    const totalAssessments = await DailyInput.count();
    
    // AI Predictions Today = Assessment hari ini
    const aiPredictions = await DailyInput.count({
      where: {
        createdAt: {
          [Op.between]: [startOfDay, endOfDay]
        }
      }
    });

    const burnoutTinggi = await DailyInput.count({ where: { burnout_level: 'Tinggi' } });
    const burnoutSedang = await DailyInput.count({ where: { burnout_level: 'Sedang' } });
    const burnoutRendah = await DailyInput.count({ where: { burnout_level: 'Rendah' } });

    res.json({
      totalUsers,
      activeToday,
      totalAssessments,
      aiPredictions,
      burnoutTinggi,
      burnoutSedang,
      burnoutRendah
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET ALL USERS
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { role: 'user' },
      attributes: ['id', 'name', 'email', 'university', 'major', 'is_suspended', 'createdAt'],
      order: [['createdAt', 'DESC']]
    });

    // Cari last burnout score tiap user (bisa dioptimasi dengan query yang lebih baik nanti, ini simple approach)
    const usersWithStats = await Promise.all(users.map(async (user) => {
      const lastInput = await DailyInput.findOne({
        where: { user_id: user.id },
        order: [['createdAt', 'DESC']]
      });
      
      const assessmentsCount = await DailyInput.count({ where: { user_id: user.id } });

      return {
        ...user.toJSON(),
        last_burnout_score: lastInput ? lastInput.burnout_score : null,
        last_burnout_level: lastInput ? lastInput.burnout_level : null,
        total_assessments: assessmentsCount
      };
    }));

    res.json(usersWithStats);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET USER BY ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id, role: 'user' },
      attributes: { exclude: ['password'] }
    });

    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// SUSPEND USER
const suspendUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

    if (user.role === 'admin') {
      return res.status(403).json({ message: "Tidak dapat menangguhkan admin" });
    }

    user.is_suspended = !user.is_suspended;
    await user.save();

    res.json({ message: user.is_suspended ? "User ditangguhkan" : "Status suspend dicabut", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// DELETE USER
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

    if (user.role === 'admin') {
      return res.status(403).json({ message: "Tidak dapat menghapus admin" });
    }

    // Cascade delete via hooks/DB atau manual
    await DailyInput.destroy({ where: { user_id: user.id } });
    await Todo.destroy({ where: { user_id: user.id } });
    await user.destroy();

    res.json({ message: "User berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET MONITORING DATA (MOCK FOR NOW, BISA DIKEMBANGKAN LEBIH LANJUT)
const getMonitoringData = async (req, res) => {
  try {
    const { period } = req.query; // 'hari_ini', 'mingguan', 'bulanan'
    
    // Mock simple query, get 50 last inputs
    const inputs = await DailyInput.findAll({
      include: [{ model: User, as: 'user', attributes: ['name', 'email'] }],
      order: [['createdAt', 'DESC']],
      limit: 50
    });

    const formatted = inputs.map(input => ({
      id: input.id,
      name: input.user?.name || 'Unknown',
      score: input.burnout_score,
      risk: input.burnout_level,
      date: input.createdAt.toISOString().split('T')[0]
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET ANALYTICS DATA (MOCK DUMMY DATA AGAR SESUAI DENGAN CHART)
const getAnalyticsData = async (req, res) => {
  try {
    // Sebagai permulaan (MVP), kembalikan data statis agar Frontend tidak rusak.
    // Di phase berikutnya bisa diganti query agregasi kompleks
    res.json({
      trendData: [
        { name: 'Sen', value: 105 },
        { name: 'Sel', value: 110 },
        { name: 'Rab', value: 115 },
        { name: 'Kam', value: 125 },
        { name: 'Jum', value: 120 },
        { name: 'Sab', value: 140 },
        { name: 'Min', value: 135 }
      ],
      distributionData: [
        { name: 'Rendah', value: await DailyInput.count({where: {burnout_level:'Rendah'}}), color: '#10b981' },
        { name: 'Sedang', value: await DailyInput.count({where: {burnout_level:'Sedang'}}), color: '#f59e0b' },
        { name: 'Tinggi', value: await DailyInput.count({where: {burnout_level:'Tinggi'}}), color: '#ef4444' }
      ]
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET RECENT ACTIVITIES
const getRecentActivities = async (req, res) => {
  try {
    const recentInputs = await DailyInput.findAll({
      include: [{ model: User, as: 'user', attributes: ['name'] }],
      order: [['createdAt', 'DESC']],
      limit: 5
    });

    const activities = recentInputs.map(input => ({
      id: input.id,
      name: input.user?.name || 'User',
      action: 'menyelesaikan assessment',
      time: input.createdAt.toISOString(),
      initial: (input.user?.name || 'U').charAt(0).toUpperCase(),
      color: 'bg-primary-500'
    }));

    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getStats,
  getAllUsers,
  getUserById,
  suspendUser,
  deleteUser,
  getMonitoringData,
  getAnalyticsData,
  getRecentActivities
};
