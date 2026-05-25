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

import hero1 from '../../assets/illustrations/hero-1.webp'
import hero2 from '../../assets/illustrations/hero-2.webp'
import hero3 from '../../assets/illustrations/hero-3.webp'
import hero4 from '../../assets/illustrations/hero-4.webp'

const SLIDES = [
  {
    id: 1,
    title: (
      <>
        Pantau Kesehatan Mental, Cegah{' '}
        <span className="text-accent-600">Burnout</span> Sejak Dini
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
        <span className="text-accent-600">Cara yang Sederhana</span>
      </>
    ),
    desc: 'Pantau jam tidur, mood, stres, dan kebiasaan belajar dalam satu dashboard yang mudah digunakan setiap hari.',
    image: hero2,
  },
  {
    id: 3,
    title: (
      <>
        <span className="text-accent-600">AI</span> Menganalisis Kondisi Mentalmu secara{' '}
        <span className="text-accent-600">Real-Time</span>
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
        <span className="text-accent-600">Rekomendasi Personal</span>
      </>
    ),
    desc: 'Terima saran kebiasaan sehat, pengaturan waktu belajar, dan pola istirahat berdasarkan kondisi mental serta beban akademikmu.',
    image: hero4,
  },
]

const COUNT = SLIDES.length

const EXTENDED_SLIDES = [SLIDES[COUNT - 1], ...SLIDES, SLIDES[0]]

function HeroSection() {
  const navigate = useNavigate()
  const [index, setIndex] = useState(1)
  const [animated, setAnimated] = useState(true)
  const isJumping = useRef(false)
  const touchStartX = useRef(null)
  const autoplayRef = useRef(null)

  const startAutoplay = useCallback(() => {
    clearInterval(autoplayRef.current)
    autoplayRef.current = setInterval(() => {
      if (document.visibilityState === 'hidden' || document.hidden) return;

      setIndex((prev) => {
        if (prev >= EXTENDED_SLIDES.length - 1) return prev;
        setAnimated(true);
        return prev + 1;
      })
    }, 6000)
  }, [])

  useEffect(() => {
    startAutoplay()
    return () => clearInterval(autoplayRef.current)
  }, [startAutoplay])

  const handleTransitionEnd = useCallback(() => {
    if (isJumping.current) return

    if (index === EXTENDED_SLIDES.length - 1) {
      isJumping.current = true
      setAnimated(false)
      setIndex(1)
    } else if (index === 0) {
      isJumping.current = true
      setAnimated(false)
      setIndex(COUNT)
    }
  }, [index])

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
    setIndex((prev) => {
      if (prev >= EXTENDED_SLIDES.length - 1) return prev;
      setAnimated(true)
      return prev + 1
    })
    startAutoplay()
  }, [startAutoplay])

  const goPrev = useCallback(() => {
    if (isJumping.current) return
    setIndex((prev) => {
      if (prev <= 0) return prev;
      setAnimated(true)
      return prev - 1
    })
    startAutoplay()
  }, [startAutoplay])

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
      className="relative overflow-hidden bg-white w-full h-[220px] sm:h-[300px] md:h-[calc(100svh-64px)] mt-16"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="flex h-full"
        style={{
          transform: `translateX(-${index * 100}%)`,
          transition: animated ? 'transform 350ms ease-out' : 'none',
          willChange: 'transform',
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {EXTENDED_SLIDES.map((slide, i) => (
          <div
            key={`${slide.id}-${i}`}
            className="min-w-full h-full relative overflow-hidden bg-white"
          >
            <div className="absolute inset-0 w-full h-full">
              <img
                src={slide.image}
                alt={`Ilustrasi ${slide.id}`}
                className="w-full h-full object-cover object-[70%_center] md:object-right"
              />

              <div
                className="absolute inset-0 w-full h-full md:hidden"
                style={{ background: 'linear-gradient(to right, #FFFFFF 0%, #FFFFFF 45%, rgba(255,255,255,0) 75%)' }}
              />

              <div
                className="absolute inset-0 w-full h-full hidden md:block"
                style={{ background: 'linear-gradient(to right, #FFFFFF 0%, #FFFFFF 35%, rgba(255,255,255,0) 60%)' }}
              />
            </div>

            <div className="absolute inset-0 z-10 flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-24">

              <div className="w-full max-w-[220px] sm:max-w-[320px] md:max-w-[550px] lg:max-w-[650px]">

                <div className="inline-flex max-w-full items-start sm:items-center gap-1 sm:gap-1.5 md:gap-2 bg-primary-50 border border-primary-200 rounded-sm px-1.5 py-0.5 sm:px-3 sm:py-1 md:px-4 md:py-2 mb-3 sm:mb-4 md:mb-6">
                  <Sparkles size={10} className="text-primary-500 shrink-0 mt-0.5 sm:mt-0 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5" />
                  <span className="text-[8px] sm:text-[10px] md:text-sm text-primary-600 font-bold whitespace-normal sm:whitespace-nowrap leading-snug tracking-wide">
                    Platform Kesehatan Mental Berbasis AI
                  </span>
                </div>

                <div className="min-h-[55px] sm:min-h-[70px] md:min-h-[130px] lg:min-h-[150px] flex items-start">
                  <h1 className="text-base sm:text-xl md:text-[38px] lg:text-[44px] xl:text-[48px] font-extrabold text-slate-900 leading-[1.15] md:leading-[1.1]">
                    {slide.title}
                  </h1>
                </div>

                <div className="min-h-[40px] sm:min-h-[50px] md:min-h-[80px] lg:min-h-[100px] flex items-start mb-2 sm:mb-4 md:mb-7">
                  <p className="text-[8px] sm:text-[10px] md:text-base lg:text-lg text-slate-600 leading-[1.3] md:leading-relaxed max-w-[95%]">
                    {slide.desc}
                  </p>
                </div>

                <div className="inline-grid grid-cols-2 sm:flex sm:flex-row gap-1.5 sm:gap-2 md:gap-3 w-max">
                  <Button
                    onClick={() => navigate(ROUTES.REGISTER)}
                    size="hero"
                    rightIcon={<ArrowRight size={10} className="sm:w-3 sm:h-3 md:w-5 md:h-5 shrink-0" />}
                  >
                    Mulai Sekarang
                  </Button>

                  <Button
                    onClick={scrollToHowItWorks}
                    variant="secondary"
                    size="hero"
                    leftIcon={<Play size={8} className="text-slate-500 shrink-0 sm:w-2.5 sm:h-2.5 md:w-4 md:h-4" />}
                  >
                    Pelajari Lebih Lanjut
                  </Button>
                </div>

              </div>
            </div>

          </div>
        ))}
      </div>

      <button
        onClick={goPrev}
        aria-label="Slide sebelumnya"
        className="flex absolute left-1 sm:left-2 md:left-4 lg:left-6 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 bg-white/90 border border-slate-200 shadow-lg rounded-full items-center justify-center text-slate-500 hover:text-primary-600 hover:border-primary-200 transition-all z-20 before:absolute before:-inset-3 before:content-['']"
      >
        <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 md:w-7 md:h-7" />
      </button>

      <button
        onClick={goNext}
        aria-label="Slide berikutnya"
        className="flex absolute right-1 sm:right-2 md:right-4 lg:right-6 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 bg-white/90 border border-slate-200 shadow-lg rounded-full items-center justify-center text-slate-500 hover:text-primary-600 hover:border-primary-200 transition-all z-20 before:absolute before:-inset-3 before:content-['']"
      >
        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-7 md:h-7" />
      </button>
    </section>
  )
}

export default HeroSection