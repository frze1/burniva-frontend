import { useNavigate } from 'react-router-dom'
import { Calendar, ArrowRight } from 'lucide-react'
import { ROUTES } from '../../utils/constants'
import { getTodayString } from '../../utils/helpers'

function BurnoutCard({ score = 0, levelStr = 'Belum ada', insight = 'Kondisimu saat ini menunjukkan tanda-tanda kelelahan. Ingat, mengambil jeda bukan berarti kamu berhenti. Yuk, pantau terus kesejahteraan mentalmu!', userName = '' }) {
  const navigate = useNavigate()
  const today = getTodayString()

  return (
    <div className="relative w-full bg-blue-800 rounded-3xl overflow-hidden shadow-[0px_10px_15px_-3px_rgba(28,57,142,0.10)] p-8 md:p-10 text-white">
      
      {/* Dekorasi Background Blur */}
      <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-[-20%] left-[-5%] w-56 h-56 bg-blue-400/20 rounded-full blur-2xl z-0" />

      <div className="relative z-10 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8">
        
        {/* Teks Kiri */}
        <div className="flex flex-col gap-4 max-w-lg">
          <div className="flex items-center gap-2 text-blue-200 text-sm font-medium">
            <Calendar size={14} />
            <span>Hari Ini, {today}</span>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
              Halo, {userName || 'User'} 👋
            </h2>
            <p className="text-blue-200 text-base font-medium">
              Mari cek kondisi mental kamu hari ini
            </p>
          </div>
          <p className="text-blue-100 text-base leading-relaxed">
            {insight}
          </p>
        </div>

        {/* Widget Skor (Kanan) */}
        <div className="flex flex-col sm:flex-row items-center gap-6 bg-white/10 p-5 rounded-2xl border border-white/20 backdrop-blur-md shadow-xl w-full xl:w-auto">
          
          {/* Skor */}
          <div className="flex flex-col items-center sm:items-start">
            <span className="text-blue-200 text-xs font-semibold uppercase tracking-wide mb-1">Skor Burnout</span>
            <div className="flex items-baseline">
              <span className="text-4xl font-bold">{score}</span>
              <span className="text-2xl font-bold text-blue-200">%</span>
            </div>
          </div>
          
          <div className="hidden sm:block w-px h-12 bg-white/20" />
          
          {/* Status */}
          <div className="flex flex-col items-center sm:items-start">
            <span className="text-blue-200 text-xs font-semibold uppercase tracking-wide mb-2">Status Saat Ini</span>
            <div className="bg-red-500/20 px-3 py-1.5 rounded-full border border-red-400/30 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-100 outline outline-1 outline-red-300" />
              <span className="text-red-100 text-sm font-medium whitespace-nowrap">{levelStr}</span>
            </div>
          </div>

          <div className="hidden sm:block w-px h-12 bg-white/20" />
          
          {/* Tombol */}
          <button
            onClick={() => navigate(ROUTES.RESULT)}
            className="w-full sm:w-auto bg-white text-blue-800 hover:bg-gray-100 text-sm font-medium px-5 py-3 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            Lihat Analisis <ArrowRight size={16} />
          </button>

        </div>
      </div>
    </div>
  )
}

export default BurnoutCard