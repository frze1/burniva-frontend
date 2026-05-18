import React from 'react';
import { getBurnoutLevel } from '../../utils/constants';

function GaugeCircle({ score, colorHex }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (score / 100) * circumference * 0.75;

  return (
    <div className="relative w-36 h-36 flex-shrink-0 flex items-center justify-center">
      {/* Latar Belakang Lingkaran Abu-abu */}
      <svg viewBox="0 0 120 120" className="absolute inset-0 w-full h-full -rotate-[135deg]">
        <circle 
          cx="60" cy="60" r={radius} fill="none" stroke="#F1F5F9" strokeWidth="12"
          strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
          strokeLinecap="round"
        />
        {/* Lingkaran Warna (Sesuai Skor) */}
        <circle 
          cx="60" cy="60" r={radius} fill="none" stroke={colorHex} strokeWidth="12"
          strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="flex flex-col items-center justify-center z-10 pt-2">
        <span className="text-sm text-gray-500 font-normal">Skor</span>
        <span className="text-3xl font-semibold text-blue-800 leading-none">{score}%</span>
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
  const hexColor = isHigh ? '#1e40af' : isMedium ? '#1e40af' : '#1e40af'; // Di desain donatnya tetap warna biru (blue-800)

  return (
    <div className={`w-full bg-white rounded-2xl border-r-[0.67px] border-t-[0.67px] border-b-[0.67px] border-gray-200 border-l-4 ${borderColor} p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm`}>
      
      {/* Teks Kiri */}
      <div className="flex flex-col items-start gap-1 flex-1">
        <div className={`px-3 py-1 rounded-full border-[0.67px] mb-4 ${badgeBg}`}>
          <span className={`text-sm font-medium ${badgeText}`}>Hasil Analisis Kamu</span>
        </div>
        <p className="text-sm text-gray-500 font-normal">Risiko Burnout</p>
        <h2 className="text-4xl font-medium text-neutral-950 mb-2">{level.label}</h2>
        <p className="text-base text-gray-600 leading-relaxed max-w-lg">
          Berdasarkan data hari ini, kamu menunjukkan tanda-tanda kelelahan mental yang signifikan. Mari ambil langkah kecil untuk pulih.
        </p>
      </div>

      {/* Donat Kanan */}
      <GaugeCircle score={score} colorHex={hexColor} />
      
    </div>
  );
}

export default ResultCard;