import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Sparkles, Moon, BookOpen, Activity, ArrowRight, RotateCcw, ArrowLeft } from 'lucide-react';
import { ROUTES } from '../utils/constants';
import ResultCard from '../components/result/ResultCard';
import FactorBreakdown from '../components/result/FactorBreakdown';
import RecommendationList from '../components/result/RecommendationList';
import burnoutService from '../services/burnout/burnoutService';

// Mock list data riwayat untuk simulasi pencarian detail (sebelum disambung full API)
const MOCK_HISTORY_DETAILS = {
  "1": {
    score: 82, mental_health_index: 7.1,
    ai_insight: 'Analisis 4 Mei 2026: Tingkat stres dan tekanan akademik kamu meningkat signifikan dalam beberapa hari terakhir, yang berkontribusi pada risiko burnout yang lebih tinggi. Fokus pada perbaikan tidur dan istirahat dapat membantu menurunkan skor secara bertahap.',
    factors: [
      { label: 'Stres',         value: 85, level: 'Tinggi', color: 'danger'  },
      { label: 'Tidur',         value: 40, level: 'Rendah', color: 'warning' },
      { label: 'Beban Belajar', value: 60, level: 'Sedang', color: 'indigo'  },
    ],
    recommendations: [
      { icon: Moon,     title: 'Tingkatkan durasi tidur',      desc: 'Usahakan tidur minimal 7 jam per malam.' },
      { icon: BookOpen, title: 'Kurangi beban kerja berlebih', desc: 'Bagi tugas menjadi sesi-sesi yang lebih kecil.' },
      { icon: Activity, title: 'Aktivitas fisik ringan',       desc: 'Jalan santai 15–20 menit setiap hari.' },
      { icon: Sparkles, title: 'Istirahat secara berkala',     desc: 'Ambil jeda 5 menit setiap 1 jam belajar.' },
    ],
  },
  "2": {
    score: 78, mental_health_index: 6.8,
    ai_insight: 'Analisis 3 Mei 2026: Kondisi kelelahan emosional tinggi dikarenakan manajemen waktu belajar yang kurang seimbang. Sempatkan jeda relaksasi.',
    factors: [
      { label: 'Stres',         value: 80, level: 'Tinggi', color: 'danger'  },
      { label: 'Tidur',         value: 45, level: 'Rendah', color: 'warning' },
      { label: 'Beban Belajar', value: 70, level: 'Tinggi', color: 'danger'  },
    ],
    recommendations: [
      { icon: Sparkles, title: 'Metode Pomodoro',          desc: 'Terapkan belajar 25 menit dan istirahat 5 menit.' },
      { icon: Moon,     title: 'Hindari begadang beruntun', desc: 'Batasi penggunaan gawai menjelang jam tidur malam.' },
    ]
  }
};

const DUMMY_RESULT = {
  score: 82,
  mental_health_index: 7.1,
  ai_insight: 'Tingkat stres dan tekanan akademik kamu meningkat signifikan dalam beberapa hari terakhir, yang berkontribusi pada risiko burnout yang lebih tinggi. Fokus pada perbaikan tidur dan istirahat dapat membantu menurunkan skor secara bertahap.',
  factors: [
    { label: 'Stres',         value: 85, level: 'Tinggi', color: 'danger'  },
    { label: 'Tidur',         value: 40, level: 'Rendah', color: 'warning' },
    { label: 'Beban Belajar', value: 60, level: 'Sedang', color: 'indigo'  },
  ],
  recommendations: [
    { icon: Moon,     title: 'Tingkatkan durasi tidur',      desc: 'Usahakan tidur minimal 7 jam per malam.' },
    { icon: BookOpen, title: 'Kurangi beban kerja berlebih', desc: 'Bagi tugas menjadi sesi-sesi yang lebih kecil.' },
    { icon: Activity, title: 'Aktivitas fisik ringan',       desc: 'Jalan santai 15–20 menit setiap hari.' },
    { icon: Sparkles, title: 'Istirahat secara berkala',     desc: 'Ambil jeda 5 menit setiap 1 jam belajar.' },
  ],
};

function Result() {
  const navigate = useNavigate();
  const { id } = useParams(); // REVISI: Ambil parameter ID dari URL jika diakses via detail riwayat

  // Logika Pemilihan Sumber Data: Jika ada parameter ID, cari dari riwayat lama, jika tidak ada pakai hasil baru
  const isDetailMode = !!id;
  const result = isDetailMode 
    ? (MOCK_HISTORY_DETAILS[id] || DUMMY_RESULT) 
    : (burnoutService.getLastResult() || DUMMY_RESULT);

  return (
    <div className="p-6 md:p-10 md:px-20 lg:px-32 bg-[#F8FAFC] min-h-screen flex flex-col gap-6">
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-6">
        
        {/* Kartu Utama */}
        <ResultCard score={result.score} />

        {/* Grid Skor Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border-[0.67px] border-gray-200 p-6 shadow-sm flex flex-col">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-neutral-950 leading-7 mb-1">Skor Detail</h3>
              <p className="text-sm text-gray-500">
                {isDetailMode ? 'Metrik tersimpan dari riwayat lama' : 'Metrik utama dari hasil analisis'}
              </p>
            </div>
            <div className="flex flex-col gap-4 flex-1">
              <div className="bg-slate-50 rounded-[10px] border-[0.67px] border-gray-200 p-4 flex flex-col gap-1">
                <span className="text-sm text-gray-500">Skor Burnout</span>
                <span className="text-3xl font-normal text-neutral-950">{result.score}%</span>
              </div>
              <div className="bg-slate-50 rounded-[10px] border-[0.67px] border-gray-200 p-4 flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-gray-500">Indeks Kesehatan Mental</span>
                  <span className="text-3xl font-normal text-neutral-950">{result.mental_health_index} / 10</span>
                </div>
                <div className="px-3 py-1 bg-orange-50 border-[0.67px] border-orange-300 rounded-lg">
                  <span className="text-xs font-medium text-orange-500">Sedang</span>
                </div>
              </div>
            </div>
          </div>

          <FactorBreakdown factors={result.factors} />
        </div>

        {/* Kartu Analisis AI */}
        <div className="bg-white rounded-2xl border-[0.67px] border-gray-200 p-6 shadow-sm flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-[10px] bg-blue-50 flex items-center justify-center">
              <Sparkles size={16} className="text-blue-800" />
            </div>
            <h3 className="text-base font-medium text-blue-800">Analisis AI</h3>
          </div>
          <p className="text-base text-gray-700 leading-relaxed">
            {result.ai_insight}
          </p>
        </div>

        {/* Rekomendasi List */}
        <RecommendationList recommendations={result.recommendations} />

        {/* Footer Buttons — Kondisional Menyesuaikan Asal Halaman */}
        <div className="flex items-center justify-end gap-4 mt-2">
          {isDetailMode ? (
            // TAMPILAN FOOTER JIKA DIAKSES DARI DETAIL RIWAYAT
            <button
              onClick={() => navigate(ROUTES.HISTORY)}
              className="h-11 px-6 bg-slate-800 text-white rounded-[10px] text-base font-medium hover:bg-slate-900 transition-colors flex items-center gap-2"
            >
              <ArrowLeft size={16} /> Kembali ke Riwayat
            </button>
          ) : (
            // TAMPILAN FOOTER JIKA DIAKSES SETELAH BARU INPUT DATA
            <>
              <button
                onClick={() => navigate(ROUTES.HISTORY)}
                className="h-11 px-6 rounded-[10px] outline outline-[0.67px] outline-offset-[-0.67px] outline-gray-200 text-neutral-950 text-base font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                Lihat Riwayat <ArrowRight size={16} />
              </button>
              <button
                onClick={() => navigate(ROUTES.INPUT)}
                className="h-11 px-6 bg-blue-800 rounded-[10px] text-white text-base font-medium hover:bg-blue-900 transition-colors flex items-center gap-2"
              >
                <RotateCcw size={16} /> Input Lagi
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
}

export default Result;