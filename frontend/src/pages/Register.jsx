import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, User, ArrowLeft, Activity } from 'lucide-react'
import { ROUTES } from '../utils/constants'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import authService from '../services/auth/authService'

function Register() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    nama: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const validateStep1 = () => {
    const e = {}
    if (!form.nama.trim()) e.nama = 'Nama lengkap wajib diisi'
    if (!form.email.includes('@')) e.email = 'Format email tidak valid'
    return e
  }

  const validateStep2 = () => {
    const e = {}
    if (form.password.length < 8) e.password = 'Kata sandi minimal 8 karakter'
    if (form.password !== form.confirmPassword) {
      e.confirmPassword = 'Konfirmasi kata sandi tidak cocok'
    }
    return e
  }

  const handleNext = () => {
    const newErrors = validateStep1()
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return }
    setStep(2)
  }

  const handleSubmit = async () => {
    const newErrors = validateStep2()
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return }
    setLoading(true)
    try {
      await authService.register({
        nama: form.nama,
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword
      })
      navigate(ROUTES.LOGIN)
    } catch (err) {
      setErrors({ general: err.message || 'Pendaftaran gagal, coba lagi' })
    } finally {
      setLoading(false)
    }
  }

  const isStep1Disabled = !form.nama || !form.email
  const isStep2Disabled = !form.password || !form.confirmPassword

  return (
    <div className="flex min-h-screen">

      {/* Panel Kiri — Ilustrasi (Desktop Only) */}
      <div className="hidden lg:flex w-[52%] relative flex-col overflow-hidden flex-shrink-0">
        <img
          src="/src/assets/bg-register.png"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/35" />

        <div className="relative z-10 flex items-start justify-between p-10">
          <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center flex-shrink-0">
            <Activity size={20} className="text-white" />
          </div>

          <div className="max-w-xs">
            <h2 className="text-2xl font-bold text-white leading-snug mb-2">
              Kendalikan perjalanan<br />kesehatan mental kamu.
            </h2>
            <p className="text-sm text-white/70 leading-relaxed">
              Deteksi burnout berbasis AI, pelacakan harian, dan rekomendasi yang dipersonalisasi — semua dalam satu tempat yang tenang dan fokus.
            </p>
          </div>
        </div>

        <div className="flex-1" />
        <p className="relative z-10 px-10 pb-6 text-xs text-white/40">© 2026 BURNIVA</p>
      </div>

      {/* Panel Kanan — Form */}
      <div className="flex-1 flex flex-col bg-white relative">
        
        {/* DESKTOP VIEW: Tombol Kembali di Pojok Kiri Atas (Tampilan Awal) */}
        <div className="hidden lg:block absolute top-10 left-10">
          <button
            onClick={step === 2 ? () => setStep(1) : () => navigate(ROUTES.HOME)}
            className="inline-flex items-center gap-2 text-sm text-[#6A7282] hover:text-[#0a0a0a] transition-colors"
          >
            <ArrowLeft size={16} />
            {step === 1 ? 'Kembali ke beranda' : 'Kembali'}
          </button>
        </div>

        {/* Kontainer Utama Form */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 py-8">
          <div className="w-full max-w-md">

            {/* MOBILE VIEW: Tombol Kembali Tepat di Atas Card */}
            <div className="block lg:hidden">
              <button
                onClick={step === 2 ? () => setStep(1) : () => navigate(ROUTES.HOME)}
                className="inline-flex items-center gap-2 text-sm text-[#6A7282] hover:text-[#0a0a0a] transition-colors mb-4 w-fit"
              >
                <ArrowLeft size={16} />
                {step === 1 ? 'Kembali ke beranda' : 'Kembali'}
              </button>
            </div>

            {/* Card Form — Deteksi Enter Otomatis */}
            <div
              className="bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-sm"
              onKeyDown={e => {
                if (e.key === 'Enter' && !loading) {
                  if (step === 1 && !isStep1Disabled) handleNext()
                  if (step === 2 && !isStep2Disabled) handleSubmit()
                }
              }}
            >
              {/* MOBILE VIEW: Logo di Dalam Card */}
              <div className="flex lg:hidden items-center gap-2.5 mb-6">
                <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
                  <Activity size={18} className="text-white" />
                </div>
                <span className="text-xl font-bold text-primary-700">BURNIVA</span>
              </div>

              <h1 className="text-2xl font-bold text-[#0a0a0a] mb-0.5">
                Buat Akun Kamu
              </h1>
              
              <p className="text-sm text-[#6A7282] mb-4">
                Langkah {step} dari 2 —{' '}
                {step === 1 ? 'Informasi Akun' : 'Informasi Keamanan'}
              </p>

              <div className="h-1 bg-[#E5E7EB] rounded-full mb-6 overflow-hidden">
                <div
                  className="h-full bg-primary-600 rounded-full transition-all duration-500"
                  style={{ width: step === 1 ? '50%' : '100%' }}
                />
              </div>

              {errors.general && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4">
                  <p className="text-xs text-red-600">{errors.general}</p>
                </div>
              )}

              {/* Step 1 — Informasi Akun (Nama & Email) */}
              {step === 1 && (
                <div className="flex flex-col gap-4">
                  <Input
                    label="Nama Lengkap"
                    placeholder="Nama Lengkap"
                    value={form.nama}
                    onChange={e => handleChange('nama', e.target.value)}
                    error={errors.nama}
                    leftIcon={<User size={16} />}
                  />
                  <Input
                    label="Email"
                    type="email"
                    placeholder="nama@kampus.ac.id"
                    value={form.email}
                    onChange={e => handleChange('email', e.target.value)}
                    error={errors.email}
                    leftIcon={<Mail size={16} />}
                  />
                  <Button 
                    fullWidth 
                    size="lg" 
                    onClick={handleNext} 
                    disabled={isStep1Disabled} 
                    className="mt-2"
                  >
                    Lanjut
                  </Button>
                  <p className="text-center text-sm text-[#6A7282]">
                    Sudah punya akun?{' '}
                    <Link
                      to={ROUTES.LOGIN}
                      className="text-primary-600 font-semibold hover:text-primary-700 transition-colors"
                    >
                      Masuk
                    </Link>
                  </p>
                </div>
              )}

              {/* Step 2 — Informasi Keamanan (Kata Sandi & Konfirmasi) */}
              {step === 2 && (
                <div className="flex flex-col gap-4">
                  <Input
                    label="Buat Kata Sandi"
                    type="password"
                    placeholder="Minimal 8 karakter"
                    value={form.password}
                    onChange={e => handleChange('password', e.target.value)}
                    error={errors.password}
                    leftIcon={<Lock size={16} />}
                  />
                  <Input
                    label="Konfirmasi Kata Sandi"
                    type="password"
                    placeholder="Ulangi kata sandi"
                    value={form.confirmPassword}
                    onChange={e => handleChange('confirmPassword', e.target.value)}
                    error={errors.confirmPassword}
                    leftIcon={<Lock size={16} />}
                  />
                  <Button 
                    fullWidth 
                    size="lg" 
                    loading={loading} 
                    disabled={isStep2Disabled} 
                    onClick={handleSubmit} 
                    className="mt-2"
                  >
                    Buat Akun
                  </Button>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Register