import { Brain, ClipboardList, Sparkles } from 'lucide-react'

const features = [
  {
    icon: Brain,
    color: 'bg-primary-600 text-primary-50',
    title: 'Deteksi Berbasis AI',
    description: 'Analisis kondisi mental kamu menggunakan model AI cerdas yang mendeteksi risiko burnout secara real-time.',
  },
  {
    icon: ClipboardList,
    color: 'bg-primary-600 text-primary-50',
    title: 'Pelacakan Harian',
    description: 'Catat aktivitas harian, tingkat stres, dan kebiasaan hidup dengan cara yang sederhana dan intuitif.',
  },
  {
    icon: Sparkles,
    color: 'bg-primary-600 text-primary-50',
    title: 'Insight & Rekomendasi',
    description: 'Dapatkan insight yang dipersonalisasi dan saran konkret untuk meningkatkan kesejahteraan mental kamu.',
  },
]

function FeaturesSection() {
  return (
    <section id="fitur" className="py-14 md:py-20 bg-white">
      <div className="w-full px-4 md:px-16 lg:px-24">

        <div className="text-center mb-10 md:mb-12">
          <p className="text-xs md:text-sm font-medium text-primary-600 mb-2">Fitur</p>
          <h2 className="text-xl md:text-4xl font-bold text-slate-800">
            Semua yang kamu butuhkan untuk tetap seimbang
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {features.map(({ icon: Icon, color, title, description }) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-5 md:p-6 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-200 cursor-default"
            >
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl ${color} flex items-center justify-center mb-3 md:mb-4`}>
                <Icon className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <h3 className="text-sm md:text-base font-semibold text-slate-800 mb-1 md:mb-2">{title}</h3>
              <p className="text-xs md:text-sm text-slate-500 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default FeaturesSection