import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { ROUTES } from '../utils/constants'
import StepIndicator from '../components/form/StepIndicator'
import MentalStep    from '../components/form/MentalStep'
import AcademicStep  from '../components/form/AcademicStep'
import LifestyleStep from '../components/form/LifestyleStep'
import ReviewStep    from '../components/form/ReviewStep'
import burnoutService from '../services/burnout/burnoutService'

// INITIAL DATA DIUPDATE SESUAI DESAIN "TINJAU DATA" DI FIGMA
const initialData = {
  // Mental
  stres: 7, 
  kecemasan: 5, 
  depresi: 5, 
  
  // Akademik
  tekananAkademik: 7, 
  jamBelajar: 6, // 6 Jam 0 Menit
  
  // Gaya Hidup
  jamTidur: 5.5, // 5 Jam 30 Menit
  tekananFinansial: 4,
  ekspektasiKeluarga: 6,
  dukunganSosial: 5,
  aktivitasFisik: 195, // 3 Jam 15 Menit = 195 menit
}

function Input() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [data, setData] = useState(initialData)
  const [loading, setLoading] = useState(false)

  const handleChange = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
    else navigate(ROUTES.DASHBOARD)
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      // Pastikan aktivitasFisik terkirim sebagai angka murni (menit)
      const payload = {
        ...data,
        aktivitasFisik: Number(data.aktivitasFisik) || 0
      }
      await burnoutService.submitInput(payload)
      navigate(ROUTES.RESULT)
    } catch (err) {
      console.error(err)
      navigate(ROUTES.RESULT) // Fallback jika API sedang error di dev
    } finally {
      setLoading(false)
    }
  }

  return (
    // Max-w-4xl agar form tidak melebar raksasa di layar desktop
    <div className="p-6 md:p-10 w-full max-w-4xl mx-auto min-h-screen bg-[#F8FAFC] flex flex-col pt-12">
      
      {/* Step Indicator di luar card */}
      <StepIndicator currentStep={step} />

      {/* Card Form */}
      <div className="bg-white rounded-2xl border-[0.67px] border-gray-200 shadow-sm p-6 md:p-10 flex flex-col gap-10">
        
        {/* Area Render Step */}
        <div className="py-2">
          {step === 1 && <MentalStep    data={data} onChange={handleChange} />}
          {step === 2 && <AcademicStep  data={data} onChange={handleChange} />}
          {step === 3 && <LifestyleStep data={data} onChange={handleChange} />}
          {step === 4 && <ReviewStep    data={data} />}
        </div>

        {/* Footer: Tombol Navigasi (Desain Sesuai Figma) */}
        <div className="flex items-center justify-between pt-6 border-t-[0.67px] border-gray-200">
          
          <button
            onClick={handleBack}
            className="h-11 min-w-[112px] px-6 rounded-[10px] outline outline-[0.67px] outline-offset-[-0.67px] outline-gray-200 text-neutral-950 text-base font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
          >
            {step === 1 ? 'Batal' : 'Kembali'}
          </button>

          {step < 4 ? (
            <button
              onClick={handleNext}
              className="h-11 min-w-[112px] px-6 bg-blue-800 rounded-[10px] text-white text-base font-medium hover:bg-blue-900 transition-all flex items-center justify-center gap-2"
            >
              Lanjut
              {/* Panah dihapus atau dipertahankan? Di Figma Tinjau tidak ada panahnya, tapi untuk UX bagusnya tetap ada panah untuk tombol Lanjut */}
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="h-11 px-8 bg-blue-800 rounded-[10px] text-white text-base font-medium hover:bg-blue-900 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Menganalisis...' : 'Analisis Sekarang'}
            </button>
          )}
          
        </div>
      </div>
    </div>
  )
}

export default Input