import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, ArrowLeft } from 'lucide-react'
import { ROUTES } from '../utils/constants'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import useAuthStore from '../store/auth/useAuthStore'
import authService from '../services/auth/authService'
import bgLogin from "../assets/bg-login.png"
import logoW from '../assets/icons/Logo-W.svg'
import logoCol from '../assets/icons/Logo.svg'

function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const isDisabled = !form.email || !form.password

  const validate = () => {
    const e = {}
    if (!form.email.includes('@')) e.email = 'Format email tidak valid'
    if (form.password.length < 6) e.password = 'Kata sandi minimal 6 karakter'
    return e
  }

  const handleSubmit = async () => {
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      setLoading(true)
      const user = await authService.login({
        email: form.email,
        password: form.password
      })
      if (user.role === 'admin') {
        navigate('/admin/dashboard')
      } else {
        navigate(ROUTES.DASHBOARD)
      }
    } catch (error) {
      console.error(error)
      setErrors({
        general:
          error.response?.data?.message ||
          'Login gagal'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  return (
    <div className="flex min-h-screen">

      <div className="hidden lg:flex w-[52%] relative flex-col overflow-hidden flex-shrink-0">
        <img
          src={bgLogin}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/35" />

        <div className="relative z-10 flex items-start justify-between p-10">
          <img src={logoW} alt="Logo" className="w-12 h-12 object-contain shrink-0" />

          <div className="max-w-xs">
            <h2 className="text-2xl font-bold text-white leading-snug mb-2">
              Kendalikan perjalanan<br />kesehatan mental kamu.
            </h2>
            <p className="text-sm text-white/70 leading-relaxed">
              Deteksi burnout berbasis AI, pelacakan harian, dan rekomendasi yang dipersonalisasi. Semua dalam satu tempat yang tenang dan fokus.
            </p>
          </div>
        </div>

        <div className="flex-1" />
        <p className="relative z-10 px-10 pb-6 text-xs text-white/40">© 2026 BURNIVA</p>
      </div>

      <div className="flex-1 flex flex-col bg-white relative">

        <div className="hidden lg:block absolute top-10 left-10">
          <Link
            to={ROUTES.HOME}
            className="inline-flex items-center gap-2 text-sm text-[#6A7282] hover:text-[#0a0a0a] transition-colors"
          >
            <ArrowLeft size={16} />
            Kembali ke beranda
          </Link>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-8 py-10">
          <div className="w-full max-w-md">

            <div className="block lg:hidden">
              <Link
                to={ROUTES.HOME}
                className="inline-flex items-center gap-2 text-sm text-[#6A7282] hover:text-[#0a0a0a] transition-colors mb-4 w-fit"
              >
                <ArrowLeft size={16} />
                Kembali ke beranda
              </Link>
            </div>

            <div
              className="bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-sm"
              onKeyDown={e => { if (e.key === 'Enter' && !isDisabled && !loading) handleSubmit() }}
            >
              <div className="flex lg:hidden items-center gap-2.5 mb-6">
                <img src={logoCol} alt="BURNIVA" className="w-8 h-8 object-contain shrink-0" />
                <span className="text-xl font-bold text-primary-700">BURNIVA</span>
              </div>

              <h1 className="text-2xl font-bold text-[#0a0a0a] mb-1">
                Selamat Datang Kembali
              </h1>
              <p className="text-sm text-[#6A7282] mb-6">
                Masuk untuk melanjutkan menggunakan BURNIVA
              </p>

              {errors.general && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4">
                  <p className="text-xs text-red-600">{errors.general}</p>
                </div>
              )}

              <div className="mb-4">
                <Input
                  label="Email"
                  type="email"
                  placeholder="nama@email.com"
                  value={form.email}
                  onChange={e => handleChange('email', e.target.value)}
                  error={errors.email}
                  leftIcon={<Mail size={16} />}
                />
              </div>

              <div className="mb-6">
                <Input
                  label="Kata Sandi"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => handleChange('password', e.target.value)}
                  error={errors.password}
                  leftIcon={<Lock size={16} />}
                />
                <div className="flex justify-end mt-2">
                  <Link 
                    to="/forgot-password" 
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
                  >
                    Lupa Password?
                  </Link>
                </div>
              </div>

              <Button
                fullWidth
                size="lg"
                loading={loading}
                disabled={isDisabled}
                onClick={handleSubmit}
              >
                Masuk
              </Button>

              <p className="text-center text-sm text-[#6A7282] mt-5">
                Belum punya akun?{' '}
                <Link
                  to={ROUTES.REGISTER}
                  className="text-primary-600 font-semibold hover:text-primary-700 transition-colors"
                >
                  Daftar
                </Link>
              </p>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

export default Login