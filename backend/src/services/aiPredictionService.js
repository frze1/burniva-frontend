const axios = require('axios');
require('dotenv').config();

/**
 * Memetakan (mapping) input dari format Burniva Frontend ke format yang diharapkan API AI.
 * Memastikan semua nilai dikonversi ke tipe data Number.
 */
const mapToAiInput = (burnivaData) => {
  return {
    stress_level: Number(burnivaData.stress) || 0,
    anxiety_score: Number(burnivaData.anxiety) || 0,
    depression_score: Number(burnivaData.emotional_pressure) || 0,
    exam_pressure: Number(burnivaData.academic_pressure) || 0,
    sleep_hours: Number(burnivaData.sleep_hours) || 0,
    study_hours_per_day: Number(burnivaData.study_hours) || 0,
    financial_stress: Number(burnivaData.financial_pressure) || 0,
    family_expectation: Number(burnivaData.family_expectation) || 0,
    social_support: Number(burnivaData.social_support) || 0,
    physical_activity: Number(burnivaData.activity_hours) || 0
  };
};

/**
 * Melakukan panggilan ke AI Endpoint Railway untuk memprediksi tingkat burnout.
 * Memiliki mekanisme timeout dan graceful fallback jika API gagal dihubungi.
 * 
 * @param {Object} assessmentData - Data mentah dari frontend
 * @returns {Object} - Hasil prediksi AI atau fallback response
 */
const predictMentalHealth = async (assessmentData) => {
  try {
    const aiInput = mapToAiInput(assessmentData);
    const apiUrl = process.env.AI_API_URL || 'https://capstonee.up.railway.app';
    
    // Timeout 10 detik agar tidak menyebabkan server hang jika Railway sedang sleep
    const response = await axios.post(`${apiUrl}/predict`, aiInput, {
      timeout: 10000 
    });

    return {
      success: true,
      data: response.data // Format JSON: { burnout_prediction: "...", mental_health_prediction: "..." }
    };
  } catch (error) {
    console.error("❌ AI Prediction Service Error:", error.message);
    
    // Graceful error handling: kembalikan fallback object agar controller bisa menggunakan DUMMY LOGIC
    return {
      success: false,
      fallback: true,
      message: "AI service unavailable, using fallback logic"
    };
  }
};

module.exports = {
  predictMentalHealth,
  mapToAiInput // diexport untuk keperluan testing
};
