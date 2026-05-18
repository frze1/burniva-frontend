import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Play,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

import { ROUTES } from '../../utils/constants'
import Button from '../ui/Button'

import hero1 from '../../assets/illustrations/hero-1.png'
import hero2 from '../../assets/illustrations/hero-2.png'
import hero3 from '../../assets/illustrations/hero-3.png'
import hero4 from '../../assets/illustrations/hero-4.png'

const SLIDES = [
  {
    id: 1,
    title: (
      <>
        Pantau Kesehatan Mental,{' '}
        <span className="text-primary-600">Cegah Burnout Sejak Dini</span>
      </>
    ),
    desc: 'BURNIVA adalah platform berbasis AI yang membantu mahasiswa memantau kondisi mental harian, mendeteksi risiko burnout sejak dini, dan memberikan rekomendasi yang dipersonalisasi.',
    image: hero1,
  },
  {
    id: 2,
    title: (
      <>
        Catat Aktivitas Harian dengan{' '}
        <span className="text-primary-600">Cara yang Sederhana</span>
      </>
    ),
    desc: 'Pantau jam tidur, mood, stres, dan kebiasaan belajar dalam satu dashboard yang mudah digunakan setiap hari.',
    image: hero2,
  },
  {
    id: 3,
    title: (
      <>
        AI Menganalisis Kondisi Mentalmu secara{' '}
        <span className="text-primary-600">Real-Time</span>
      </>
    ),
    desc: 'Model AI mengevaluasi pola aktivitas dan memberikan prediksi tingkat risiko burnout secara otomatis berdasarkan data harianmu.',
    image: hero3,
  },
  {
    id: 4,
    title: (
      <>
        Dapatkan Insight dan{' '}
        <span className="text-primary-600">Rekomendasi Personal</span>
      </>
    ),
    desc: 'Terima saran kebiasaan sehat, pengaturan waktu belajar, dan pola istirahat berdasarkan kondisi mental serta beban akademikmu.',
    image: hero4,
  },
]

const COUNT = SLIDES.length

// Extended: [last, ...original, first] — satu clone di tiap ujung
const EXTENDED_SLIDES = [SLIDES[COUNT - 1], ...SLIDES, SLIDES[0]]

function HeroSection() {
  const navigate = useNavigate()

  // index di dalam EXTENDED_SLIDES; 1..COUNT adalah slide asli
  const [index, setIndex] = useState(1)
  const [animated, setAnimated] = useState(true)
  const isJumping = useRef(false)
  const touchStartX = useRef(null)
  const autoplayRef = useRef(null)

  // -- helpers --

  const startAutoplay = useCallback(() => {
    clearInterval(autoplayRef.current)
    autoplayRef.current = setInterval(() => {
      setAnimated(true)
      setIndex((prev) => prev + 1)
    }, 6000)
  }, [])

  useEffect(() => {
    startAutoplay()
    return () => clearInterval(autoplayRef.current)
  }, [startAutoplay])

  // Setelah transisi selesai, kalau posisi kita di klon, lompat tanpa animasi
  const handleTransitionEnd = useCallback(() => {
    if (isJumping.current) return

    if (index === EXTENDED_SLIDES.length - 1) {
      // klon awal (paling kanan) → lompat ke slide pertama asli
      isJumping.current = true
      setAnimated(false)
      setIndex(1)
    } else if (index === 0) {
      // klon akhir (paling kiri) → lompat ke slide terakhir asli
      isJumping.current = true
      setAnimated(false)
      setIndex(COUNT)
    }
  }, [index])

  // Setelah jump (animated=false), aktifkan lagi animasi di frame berikutnya
  useEffect(() => {
    if (!animated && isJumping.current) {
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimated(true)
          isJumping.current = false
        })
      })
      return () => cancelAnimationFrame(id)
    }
  }, [animated])

  const goNext = useCallback(() => {
    if (isJumping.current) return
    setAnimated(true)
    setIndex((prev) => prev + 1)
    startAutoplay()
  }, [startAutoplay])

  const goPrev = useCallback(() => {
    if (isJumping.current) return
    setAnimated(true)
    setIndex((prev) => prev - 1)
    startAutoplay()
  }, [startAutoplay])

  const goTo = useCallback((i) => {
    if (isJumping.current) return
    setAnimated(true)
    setIndex(i + 1) // i adalah 0-based dari SLIDES
    startAutoplay()
  }, [startAutoplay])

  // dot aktif: index 1..COUNT → 0..COUNT-1
  const activeDot = index <= 0 ? COUNT - 1 : index >= EXTENDED_SLIDES.length - 1 ? 0 : index - 1

  // touch
  const onTouchStart = (e) => { touchStartX.current = e.targetTouches[0].clientX }
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (diff > 60) goNext()
    else if (diff < -60) goPrev()
    touchStartX.current = null
  }

  const scrollToHowItWorks = () => {
    document.querySelector('#cara-kerja')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="beranda"
      className="relative overflow-hidden bg-white"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Track */}
      <div
        className="flex"
        style={{
          transform: `translateX(-${index * 100}%)`,
          transition: animated ? 'transform 700ms cubic-bezier(0.4,0,0.2,1)' : 'none',
          willChange: 'transform',
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {EXTENDED_SLIDES.map((slide, i) => (
          <div
            key={`${slide.id}-${i}`}
            className="min-w-full relative overflow-hidden bg-white"
            style={{ minHeight: 'min(560px, calc(100svh - 64px))' }}
          >
            {/* Background ilustrasi — desktop */}
            <div className="absolute inset-0 hidden md:flex justify-center">
              <div className="w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-12 xl:px-16 relative">
                <div className="absolute inset-y-0 right-6 md:right-10 lg:right-12 xl:right-16 w-[64%] lg:w-[68%]">
                  <img
                    src={slide.image}
                    alt={`Ilustrasi ${slide.id}`}
                    className="w-full h-full object-cover object-left"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(to right, white 25%, rgba(255,255,255,0.55) 50%, transparent 98%)',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Konten */}
            <div className="relative max-w-7xl mx-auto px-6 md:px-10 lg:px-12 xl:px-16 flex flex-col justify-center py-16 md:py-20" style={{ minHeight: 'min(560px, calc(100svh - 64px))' }}>
              <div className="max-w-[650px]">
                <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-3 py-1.5 mb-5">
                  <Sparkles size={14} className="text-blue-500" />
                  <span className="text-xs md:text-sm text-blue-600 font-medium">
                    Platform Kesehatan Mental Berbasis AI
                  </span>
                </div>

                <h1 className="max-w-[720px] text-4xl md:text-5xl lg:text-[52px] xl:text-[56px] font-bold text-slate-900 leading-tight mb-4">
                  {slide.title}
                </h1>

                <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-7 max-w-[560px]">
                  {slide.desc}
                </p>

                <div className="flex flex-wrap gap-3 mb-8">
                  <Button
                    size="lg"
                    onClick={() => navigate(ROUTES.REGISTER)}
                    rightIcon={<ArrowRight size={18} />}
                  >
                    Mulai Sekarang
                  </Button>

                  <button
                    onClick={scrollToHowItWorks}
                    className="inline-flex items-center gap-2 px-6 py-3 text-slate-700 font-medium text-base hover:text-slate-900 transition-colors"
                  >
                    <Play size={16} className="text-slate-500" />
                    Pelajari Lebih Lanjut
                  </button>
                </div>

                {/* Gambar mobile */}
                <div className="md:hidden">
                  <img
                    src={slide.image}
                    alt={`Ilustrasi ${slide.id}`}
                    className="w-full max-w-xs mx-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-6 z-20 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Pindah ke slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              activeDot === i
                ? 'w-8 h-2 bg-primary-600'
                : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>

      {/* Arrow — desktop */}
      <button
        onClick={goPrev}
        aria-label="Slide sebelumnya"
        className="hidden lg:flex absolute left-6 xl:left-10 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/90 border border-slate-200 shadow-md rounded-full items-center justify-center text-slate-500 hover:text-primary-600 hover:border-primary-200 transition-all z-20"
      >
        <ChevronLeft size={22} />
      </button>

      <button
        onClick={goNext}
        aria-label="Slide berikutnya"
        className="hidden lg:flex absolute right-6 xl:right-10 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/90 border border-slate-200 shadow-md rounded-full items-center justify-center text-slate-500 hover:text-primary-600 hover:border-primary-200 transition-all z-20"
      >
        <ChevronRight size={22} />
      </button>
    </section>
  )
}

export default HeroSection