import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Lock, ArrowLeft, CheckCircle } from 'lucide-react'
import { ROUTES } from '../utils/constants'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import authService from '../services/auth/authService'
import bgLogin from "../assets/bg-login.png"
import logoW from '../assets/icons/Logo-W.svg'
import logoCol from '../assets/icons/Logo.svg'

function ResetPassword() {
  const { token } = useParams()
  const navigate = useNavigate()
  
  const [form, setForm] = useState({ password: '', confirmPassword: '' })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const isDisabled = !form.password || !form.confirmPassword

  const validate = () => {
    if (form.password.length < 6) return 'Kata sandi minimal 6 karakter'
    if (form.password !== form.confirmPassword) return 'Konfirmasi password tidak cocok'
    return null
  }

  const handleSubmit = async () => {
    const errorMsg = validate()
    if (errorMsg) {
      setStatus({ type: 'error', message: errorMsg })
      return
    }

    try {
      setLoading(true)
      setStatus({ type: '', message: '' })
      
      const res = await authService.resetPassword(token, form.password, form.confirmPassword)
      setSuccess(true)
      setStatus({ type: 'success', message: res.message || 'Password berhasil diubah!' })
      
      setTimeout(() => {
        navigate(ROUTES.LOGIN)
      }, 3000)
      
    } catch (error) {
      console.error(error)
      setStatus({
        type: 'error',
        message: error.response?.data?.message || 'Terjadi kesalahan saat mereset password'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (status.type === 'error') setStatus({ type: '', message: '' })
  }

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex w-[52%] relative flex-col overflow-hidden flex-shrink-0">
        <img src={bgLogin} alt="Background" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/35" />

        <div className="relative z-10 flex items-start justify-between p-10">
          <img src={logoW} alt="Logo" className="w-12 h-12 object-contain shrink-0" />
          <div className="max-w-xs">
            <h2 className="text-2xl font-bold text-white leading-snug mb-2">
              Kendalikan perjalanan<br />kesehatan mental kamu.
            </h2>
          </div>
        </div>

        <div className="flex-1" />
        <p className="relative z-10 px-10 pb-6 text-xs text-white/40">© 2026 BURNIVA</p>
      </div>

      <div className="flex-1 flex flex-col bg-white relative">
        {!success && (
          <div className="hidden lg:block absolute top-10 left-10">
            <Link to={ROUTES.LOGIN} className="inline-flex items-center gap-2 text-sm text-[#6A7282] hover:text-[#0a0a0a] transition-colors">
              <ArrowLeft size={16} /> Kembali ke Login
            </Link>
          </div>
        )}

        <div className="flex-1 flex flex-col items-center justify-center px-8 py-10">
          <div className="w-full max-w-md">
            {!success && (
              <div className="block lg:hidden">
                <Link to={ROUTES.LOGIN} className="inline-flex items-center gap-2 text-sm text-[#6A7282] hover:text-[#0a0a0a] transition-colors mb-4 w-fit">
                  <ArrowLeft size={16} /> Kembali ke Login
                </Link>
              </div>
            )}

            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-sm"
              onKeyDown={e => { if (e.key === 'Enter' && !isDisabled && !loading && !success) handleSubmit() }}>
              
              <div className="flex lg:hidden items-center gap-2.5 mb-6">
                <img src={logoCol} alt="BURNIVA" className="w-8 h-8 object-contain shrink-0" />
                <span className="text-xl font-bold text-primary-700">BURNIVA</span>
              </div>

              {success ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} />
                  </div>
                  <h2 className="text-2xl font-bold text-[#0a0a0a] mb-2">Berhasil!</h2>
                  <p className="text-sm text-[#6A7282] mb-6">
                    Kata sandi Anda telah berhasil diubah. Mengalihkan ke halaman login...
                  </p>
                  <Button fullWidth onClick={() => navigate(ROUTES.LOGIN)}>
                    Ke Halaman Login Sekarang
                  </Button>
                </div>
              ) : (
                <>
                  <h1 className="text-2xl font-bold text-[#0a0a0a] mb-1">Buat Password Baru</h1>
                  <p className="text-sm text-[#6A7282] mb-6">
                    Silakan masukkan kata sandi baru Anda.
                  </p>

                  {status.message && (
                    <div className={`border rounded-xl px-4 py-3 mb-4 ${status.type === 'error' ? 'bg-red-50 border-red-200 text-red-600' : 'bg-green-50 border-green-200 text-green-700'}`}>
                      <p className="text-xs">{status.message}</p>
                    </div>
                  )}

                  <div className="mb-4">
                    <Input
                      label="Password Baru"
                      type="password"
                      placeholder="••••••••"
                      value={form.password}
                      onChange={e => handleChange('password', e.target.value)}
                      leftIcon={<Lock size={16} />}
                    />
                  </div>

                  <div className="mb-6">
                    <Input
                      label="Konfirmasi Password"
                      type="password"
                      placeholder="••••••••"
                      value={form.confirmPassword}
                      onChange={e => handleChange('confirmPassword', e.target.value)}
                      leftIcon={<Lock size={16} />}
                    />
                  </div>

                  <Button fullWidth size="lg" loading={loading} disabled={isDisabled} onClick={handleSubmit}>
                    Simpan Password Baru
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
