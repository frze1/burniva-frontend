const generatePrediction =
(data)=>{

  const {

    stress_level,
    anxiety_level,
    emotional_pressure,
    academic_pressure,

    sleep_duration,

    social_support

  } = data;

  let score = 0;

  // NEGATIF
  score +=
  stress_level * 8;

  score +=
  anxiety_level * 6;

  score +=
  emotional_pressure * 7;

  score +=
  academic_pressure * 5;

  // TIDUR
  if(sleep_duration < 360){

    score += 15;

  }

  // SUPPORT
  score -=
  social_support * 3;

  // LIMIT
  if(score > 100){

    score = 100;

  }

  if(score < 0){

    score = 0;

  }

  // RISK LEVEL
  let riskLevel;

  if(score <= 35){

    riskLevel =
    "Rendah";

  }

  else if(score <= 70){

    riskLevel =
    "Sedang";

  }

  else{

    riskLevel =
    "Tinggi";

  }

  // MENTAL INDEX
  const mentalHealthIndex =
  (10 - (
    score / 10
  )).toFixed(1);

  // ANALYSIS
  let analysisText =
  "";

  if(riskLevel ===
    "Tinggi"
  ){

    analysisText =
    "Tingkat stres dan tekanan akademik kamu cukup tinggi. Disarankan untuk mulai mengatur waktu istirahat dan mengurangi tekanan berlebih.";

  }

  else if(
    riskLevel ===
    "Sedang"
  ){

    analysisText =
    "Kondisi mental kamu cukup stabil, tetapi ada beberapa faktor yang perlu diperhatikan agar tidak meningkat menjadi burnout.";

  }

  else{

    analysisText =
    "Kondisi mental kamu cukup baik. Tetap jaga keseimbangan aktivitas dan pola hidup sehat.";

  }

  // RECOMMENDATION
  let recommendation =
  "";

  if(score > 70){

    recommendation =
    "Tidur minimal 7 jam, kurangi beban belajar berlebih, dan lakukan aktivitas relaksasi.";

  }

  else{

    recommendation =
    "Pertahankan pola hidup sehat dan tetap kelola waktu belajar dengan baik.";

  }

  return {

    risk_level:
    riskLevel,

    burnout_score:
    score,

    mental_health_index:
    parseFloat(
      mentalHealthIndex
    ),

    analysis_text:
    analysisText,

    recommendation:
    recommendation

  };

};

module.exports =
generatePrediction;