import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, ArrowLeft } from 'lucide-react'
import { ROUTES } from '../utils/constants'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import authService from '../services/auth/authService'
import bgLogin from "../assets/bg-login.png"
import logoW from '../assets/icons/Logo-W.svg'
import logoCol from '../assets/icons/Logo.svg'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState({ type: '', message: '' })
  const [loading, setLoading] = useState(false)

  const isDisabled = !email

  const handleSubmit = async () => {
    if (!email.includes('@')) {
      setStatus({ type: 'error', message: 'Format email tidak valid' })
      return
    }

    try {
      setLoading(true)
      setStatus({ type: '', message: '' })
      
      const res = await authService.forgotPassword(email)
      setStatus({ type: 'success', message: res.message || 'Email reset password telah dikirim. Silakan cek kotak masuk Anda.' })
      
    } catch (error) {
      console.error(error)
      setStatus({
        type: 'error',
        message: error.response?.data?.message || 'Terjadi kesalahan saat mengirim email'
      })
    } finally {
      setLoading(false)
    }
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
        <div className="hidden lg:block absolute top-10 left-10">
          <Link to={ROUTES.LOGIN} className="inline-flex items-center gap-2 text-sm text-[#6A7282] hover:text-[#0a0a0a] transition-colors">
            <ArrowLeft size={16} /> Kembali ke Login
          </Link>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-8 py-10">
          <div className="w-full max-w-md">
            <div className="block lg:hidden">
              <Link to={ROUTES.LOGIN} className="inline-flex items-center gap-2 text-sm text-[#6A7282] hover:text-[#0a0a0a] transition-colors mb-4 w-fit">
                <ArrowLeft size={16} /> Kembali ke Login
              </Link>
            </div>

            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-sm"
              onKeyDown={e => { if (e.key === 'Enter' && !isDisabled && !loading) handleSubmit() }}>
              
              <div className="flex lg:hidden items-center gap-2.5 mb-6">
                <img src={logoCol} alt="BURNIVA" className="w-8 h-8 object-contain shrink-0" />
                <span className="text-xl font-bold text-primary-700">BURNIVA</span>
              </div>

              <h1 className="text-2xl font-bold text-[#0a0a0a] mb-1">Lupa Password</h1>
              <p className="text-sm text-[#6A7282] mb-6">
                Masukkan email akun Anda untuk mendapatkan tautan reset kata sandi.
              </p>

              {status.message && (
                <div className={`border rounded-xl px-4 py-3 mb-4 ${status.type === 'error' ? 'bg-red-50 border-red-200 text-red-600' : 'bg-green-50 border-green-200 text-green-700'}`}>
                  <p className="text-xs">{status.message}</p>
                </div>
              )}

              <div className="mb-6">
                <Input
                  label="Email"
                  type="email"
                  placeholder="nama@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  leftIcon={<Mail size={16} />}
                />
              </div>

              <Button fullWidth size="lg" loading={loading} disabled={isDisabled} onClick={handleSubmit}>
                Kirim Link Reset
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
