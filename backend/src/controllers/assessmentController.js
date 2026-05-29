const {
  DailyInput,
  Todo
} = require('../models')

const generateTodos = async (userId, data) => {
  const todos = [];

  if (data.sleep_hours < 6) {
    todos.push({
      user_id: userId,
      title: "Tidur lebih awal",
      description: "Usahakan tidur minimal 7 jam malam ini",
      priority: "high",
    });
  }

  if (data.stress >= 7) {
    todos.push({
      user_id: userId,
      title: "Istirahat mental",
      description: "Luangkan waktu 15 menit untuk relaksasi",
      priority: "high",
    });
  }

  if (data.academic_pressure >= 7) {
    todos.push({
      user_id: userId,
      title: "Atur waktu belajar",
      description: "Bagi waktu belajar dengan metode Pomodoro",
      priority: "high",
    });
  }

  if (data.social_support <= 4) {
    todos.push({
      user_id: userId,
      title: "Hubungi teman",
      description: "Coba ngobrol dengan teman dekat hari ini",
      priority: "medium",
    });
  }

  if (data.activity_hours < 1) {
    todos.push({
      user_id: userId,
      title: "Aktivitas fisik",
      description: "Lakukan olahraga ringan 15 menit",
      priority: "medium",
    });
  }

  if (todos.length === 0) {
    todos.push({
      user_id: userId,
      title: "Pertahankan kebiasaan sehat",
      description: "Kondisi mentalmu baik, tetap jaga pola hidup sehat",
      priority: "low",
    });
  }

  await Todo.bulkCreate(todos);
};

const createAssessment =
  async (req, res) => {
    try {
      const userId =
        req.user.id

      const {
        stress,
        anxiety,
        emotional_pressure,
        academic_pressure,
        study_hours,
        sleep_hours,
        financial_pressure,
        family_expectation,
        social_support,
        activity_hours,
      } = req.body

      // =================
      // AI INTEGRATION
      // =================
      const { predictMentalHealth } = require('../services/aiPredictionService');
      const { Prediction } = require('../models');

      // Tetap hitung totalScore untuk persentase visualisasi frontend (0-100%)
      const totalScore = stress + anxiety + emotional_pressure + academic_pressure + financial_pressure + family_expectation + (10 - social_support);

      // Panggil API AI
      const aiResult = await predictMentalHealth(req.body);
      
      let burnoutLevel = 'Rendah';
      let mentalHealthPred = 'Normal';

      if (aiResult.success && !aiResult.fallback) {
        // Translasi response AI ("High", "Medium", "Low") ke format DB ("Tinggi", "Sedang", "Rendah")
        const rawPrediction = aiResult.data.burnout_prediction;
        if (rawPrediction === 'High' || rawPrediction === 'Tinggi') burnoutLevel = 'Tinggi';
        else if (rawPrediction === 'Medium' || rawPrediction === 'Sedang') burnoutLevel = 'Sedang';
        else burnoutLevel = 'Rendah';

        mentalHealthPred = aiResult.data.mental_health_prediction;
      } else {
        // Fallback Logic (jika API AI Railway mati/timeout)
        if (totalScore >= 40) burnoutLevel = 'Tinggi';
        else if (totalScore >= 25) burnoutLevel = 'Sedang';
        mentalHealthPred = 'Tidak dapat diakses (Fallback)';
      }

      // Rekomendasi berdasarkan level (Tetap menggunakan IF-ELSE karena AI tidak mengembalikan rekomendasi)
      let recommendation = [];
      if (burnoutLevel === 'Tinggi') {
        recommendation = ['Tidur cukup minimal 7 jam', 'Kurangi beban belajar', 'Istirahat berkala', 'Pertimbangkan konsultasi'];
      } else if (burnoutLevel === 'Sedang') {
        recommendation = ['Perbaiki manajemen waktu', 'Kurangi screen time', 'Tambah aktivitas fisik'];
      } else {
        recommendation = ['Pertahankan kebiasaan sehat'];
      }

      // =================
      // SAVE DATABASE
      // =================

      // 1. Simpan ke DailyInput (Agar Result.jsx dan History.jsx tetap aman & kompatibel)
      const assessment = await DailyInput.create({
        user_id: userId,
        stress, anxiety, emotional_pressure, academic_pressure, study_hours,
        sleep_hours, financial_pressure, family_expectation, social_support, activity_hours,
        burnout_score: totalScore,
        burnout_level: burnoutLevel,
        recommendation,
      });

      // 2. Simpan ke tabel Predictions (Instruksi Phase 4 & Phase 5)
      await Prediction.create({
        daily_input_id: assessment.id,
        user_id: userId,
        risk_level: burnoutLevel,
        burnout_score: totalScore,
        mental_health_index: 0, // Placeholder, AI saat ini tidak mereturn index numerical
        analysis_text: mentalHealthPred,
        recommendation: recommendation.join(', '),
        burnout_prediction: aiResult.success && !aiResult.fallback ? aiResult.data.burnout_prediction : 'N/A',
        mental_health_prediction: mentalHealthPred,
        raw_assessment_input: req.body
      });

      await generateTodos(userId, req.body);

      res.status(201).json(
        assessment
      )
    } catch (error) {
      console.log(
        error
      )

      res.status(500).json(
        {
          message:
            'Server error',
          error:
            error.message,
        }
      )
    }
  }

module.exports = {
  createAssessment,
}