import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../utils/constants'

function CTASection() {
  const navigate = useNavigate()

  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-[0_10px_30px_rgba(15,23,42,0.14)] px-6 md:px-12 py-12 md:py-14 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Mulai pantau kesehatan mental kamu hari ini
          </h2>

          <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-8">
            Bergabunglah bersama ratusan mahasiswa yang mengelola kesejahteraan
            mereka dengan dukungan AI.
          </p>

          <button
            onClick={() => navigate(ROUTES.REGISTER)}
            className="inline-flex items-center justify-center h-11 px-8 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 active:bg-blue-800 active:scale-95 transition-all shadow-md shadow-blue-200"
          >
            Mulai Sekarang
          </button>
        </div>
      </div>
    </section>
  )
}

export default CTASection