import React from 'react';
import { getBurnoutLevel } from '../../utils/constants';

function GaugeCircle({ score, colorHex, textColorClass = "text-blue-800" }) {
  const [animatedScore, setAnimatedScore] = React.useState(0);

  React.useEffect(() => {
    // Trigger animasi dari 0 ke skor akhir setelah komponen di-mount
    const timer = setTimeout(() => setAnimatedScore(score), 100);
    return () => clearTimeout(timer);
  }, [score]);

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  // Panjang garis aktual sesuai persentase dari lingkaran penuh (100%)
  const strokeLength = (animatedScore / 100) * circumference;

  return (
    <div className="relative w-32 h-32 md:w-36 md:h-36 flex-shrink-0 flex items-center justify-center">
      {/* Rotasi -90 derajat agar garis dimulai dari jam 12 (atas) */}
      <svg viewBox="0 0 120 120" className="absolute inset-0 w-full h-full -rotate-90">
        {/* Latar Belakang Lingkaran Penuh (Abu-abu) */}
        <circle 
          cx="60" cy="60" r={radius} fill="none" stroke="#F1F5F9" strokeWidth="12"
        />
        {/* Lingkaran Warna (Sesuai Skor) */}
        <circle 
          cx="60" cy="60" r={radius} fill="none" stroke={colorHex} strokeWidth="12"
          strokeDasharray={`${strokeLength} ${circumference}`}
          strokeDashoffset="0"
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="flex flex-col items-center justify-center z-10 pt-2">
        <span className="text-sm text-gray-500 font-normal">Skor</span>
        <span className={`text-2xl md:text-3xl font-semibold ${textColorClass} leading-none`}>{score}%</span>
      </div>
    </div>
  );
}

function ResultCard({ score }) {
  const level = getBurnoutLevel(score) || { label: 'Tinggi' }; // Fallback
  
  // Logika dinamis untuk warna berdasarkan tingkat risiko
  const isHigh = score >= 70;
  const isMedium = score >= 40 && score < 70;
  
  const borderColor = isHigh ? 'border-red-500' : isMedium ? 'border-orange-400' : 'border-emerald-500';
  const badgeBg = isHigh ? 'bg-red-50 border-red-100' : isMedium ? 'bg-orange-50 border-orange-100' : 'bg-emerald-50 border-emerald-100';
  const badgeText = isHigh ? 'text-red-700' : isMedium ? 'text-orange-700' : 'text-emerald-700';
  const hexColor = isHigh ? '#ef4444' : isMedium ? '#f97316' : '#10b981'; // Sesuai warna red-500, orange-500, emerald-500
  const textColorClass = isHigh ? 'text-red-600' : isMedium ? 'text-orange-600' : 'text-emerald-600';

  return (
    <div className={`w-full bg-white rounded-2xl border-r-[0.67px] border-t-[0.67px] border-b-[0.67px] border-gray-200 border-l-4 ${borderColor} p-5 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 shadow-sm`}>
      
      {/* Teks Kiri */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1 flex-1">
        <div className={`px-3 py-1 rounded-full border-[0.67px] mb-3 md:mb-4 ${badgeBg}`}>
          <span className={`text-xs md:text-sm font-medium ${badgeText}`}>Hasil Analisis Kamu</span>
        </div>
        <p className="text-sm text-gray-500 font-normal">Risiko Burnout</p>
        <h2 className="text-3xl md:text-4xl font-medium text-neutral-950 mb-1 md:mb-2">{level.label}</h2>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-lg">
          Berdasarkan data hari ini, kamu menunjukkan tanda-tanda kelelahan mental yang signifikan. Mari ambil langkah kecil untuk pulih.
        </p>
      </div>

      {/* Donat Kanan */}
      <GaugeCircle score={score} colorHex={hexColor} textColorClass={textColorClass} />
      
    </div>
  );
}

export default ResultCard;