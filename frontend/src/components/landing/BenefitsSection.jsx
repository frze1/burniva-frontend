import { CheckCircle, Sparkles } from 'lucide-react'
import Card from '../ui/Card'

const benefits = [
  'Mengurangi risiko burnout sejak dini',
  'Meningkatkan produktivitas dan fokus',
  'Membentuk kebiasaan harian yang lebih baik',
  'Meningkatkan kesadaran diri',
]

function BenefitsSection() {
  return (
    <section id="tentang" className="py-14 md:py-20 bg-white">
      <div className="w-full px-4 md:px-16 lg:px-24">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">

          <div>
            <p className="text-xs md:text-sm font-medium text-primary-600 mb-2">Manfaat</p>
            <h2 className="text-xl md:text-3xl font-bold text-slate-800 mb-4 md:mb-6">
              Bangun kebiasaan sehat setiap hari
            </h2>
            <div className="flex flex-col gap-3">
              {benefits.map(benefit => (
                <div key={benefit} className="flex items-center gap-2 md:gap-3">
                  <CheckCircle className="w-[18px] h-[18px] md:w-5 md:h-5 text-primary-600 flex-shrink-0" />
                  <span className="text-xs md:text-sm text-slate-600">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <Card className="p-5 md:p-6" padding="none">
            <div className="flex items-center gap-2 mb-2 md:mb-3">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg md:rounded-xl bg-primary-50 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary-600" />
              </div>
              <span className="text-xs md:text-sm font-semibold text-primary-600">Analisis AI</span>
            </div>
            <p className="text-xs md:text-sm text-slate-700 leading-relaxed mb-2 md:mb-3">
              "Kamu cenderung belajar hingga larut malam. Tidur 30 menit lebih awal bisa menurunkan skor stres hingga 18%."
            </p>
            <p className="text-[10px] md:text-xs text-slate-400">Dipersonalisasi untuk kamu</p>
          </Card>

        </div>
      </div>
    </section>
  )
}

export default BenefitsSection