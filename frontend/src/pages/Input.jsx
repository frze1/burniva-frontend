import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { ROUTES } from '../utils/constants'
import StepIndicator from '../components/form/StepIndicator'
import MentalStep from '../components/form/MentalStep'
import AcademicStep from '../components/form/AcademicStep'
import LifestyleStep from '../components/form/LifestyleStep'
import ReviewStep from '../components/form/ReviewStep'
import { createAssessment } from '../services/assessmentService'

function Input() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    stress: 5,
    anxiety: 5,
    emotional_pressure: 5,

    academic_pressure: 5,
    study_hours: 0,

    sleep_hours: 0,
    financial_pressure: 5,
    family_expectation: 5,
    social_support: 5,
    activity_hours: 0,
  });


  const handleNext = () => {
    if (step < 4) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
    else navigate(ROUTES.DASHBOARD)
  }

  const handleAnalysis = async () => {
    try {
      setLoading(true);
      const result = await createAssessment(formData);

      localStorage.setItem("analysisResult", JSON.stringify(result));

      navigate(ROUTES.RESULT);
    } catch (error) {
      console.log(error);
      alert("Gagal melakukan analisis");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Max-w-4xl agar form tidak melebar raksasa di layar desktop
    <div className="p-3 pb-24 md:p-10 md:pb-10 w-full max-w-4xl mx-auto min-h-screen bg-[#F8FAFC] flex flex-col pt-6 md:pt-12">

      {/* Step Indicator di luar card */}
      <StepIndicator currentStep={step} />

      {/* Card Form */}
      <div className="bg-white rounded-2xl border-[0.67px] border-gray-200 shadow-sm p-4 md:p-10 flex flex-col gap-5 md:gap-10">

        {/* Area Render Step */}
        <div className="py-2">
          {step === 1 && <MentalStep formData={formData} setFormData={setFormData} />}
          {step === 2 && <AcademicStep formData={formData} setFormData={setFormData} />}
          {step === 3 && <LifestyleStep formData={formData} setFormData={setFormData} />}
          {step === 4 && <ReviewStep formData={formData} />}
        </div>

        {/* Footer: Tombol Navigasi (Desain Sesuai Figma) */}
        <div className="flex items-center justify-between pt-6 border-t-[0.67px] border-gray-200">

          <button
            onClick={handleBack}
            className="h-10 md:h-11 min-w-[90px] md:min-w-[112px] px-4 md:px-6 rounded-lg md:rounded-[10px] outline outline-[0.67px] outline-offset-[-0.67px] outline-gray-200 text-neutral-950 text-sm md:text-base font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
          >
            {step === 1 ? 'Batal' : 'Kembali'}
          </button>

          {step < 4 ? (
            <button
              onClick={handleNext}
              className="h-10 md:h-11 min-w-[90px] md:min-w-[112px] px-4 md:px-6 bg-primary-500 rounded-lg md:rounded-[10px] text-white text-sm md:text-base font-medium hover:bg-primary-700 transition-all flex items-center justify-center gap-2"
            >
              Lanjut
              {/* Panah dihapus atau dipertahankan? Di Figma Tinjau tidak ada panahnya, tapi untuk UX bagusnya tetap ada panah untuk tombol Lanjut */}
            </button>
          ) : (
            <button
              onClick={handleAnalysis}
              disabled={loading}
              className="h-10 md:h-11 px-5 md:px-8 bg-primary-500 rounded-lg md:rounded-[10px] text-white text-sm md:text-base font-medium hover:bg-primary-700 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
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