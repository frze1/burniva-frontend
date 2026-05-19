import { useState, useRef, useEffect } from 'react'
import { Bell, Menu, User, LogOut, ChevronDown, Check } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../utils/constants'
import { classNames, formatTime } from '../../utils/helpers'
import useAuthStore from '../../store/auth/useAuthStore'
import { getInitials } from '../../utils/helpers'

// Dummy notifikasi — nanti diganti dari API
const DUMMY_NOTIFS = [
  { id: 1, message: 'Jangan lupa input data harianmu hari ini!', time: new Date().toISOString(), read: false },
  { id: 2, message: 'Streak kamu 3 hari berturut-turut! Pertahankan 💪', time: new Date(Date.now() - 3600000).toISOString(), read: false },
  { id: 3, message: 'Hasil analisis kemarin sudah tersedia.', time: new Date(Date.now() - 86400000).toISOString(), read: true },
]

function Topbar({ onToggleSidebar, title, subtitle }) {
  const navigate = useNavigate()
  const [notifOpen, setNotifOpen]   = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [notifs, setNotifs]         = useState(DUMMY_NOTIFS)
  const [showLogout, setShowLogout] = useState(false)

  const notifRef   = useRef(null)
  const profileRef = useRef(null)

  const unreadCount = notifs.filter(n => !n.read).length

  const user = useAuthStore(s => s.user)
  const initials = getInitials(user?.name || 'U')

  // Tutup dropdown kalau klik di luar
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false)
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })))
  const markRead = (id) => setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))

  const handleLogout = () => {
    useAuthStore.getState().clearAuth()
    navigate(ROUTES.LOGIN)
  }

  return (
    <>
      {/* REVISI DI SINI: Mengubah z-10 menjadi z-40 agar mengambang di atas semua konten halaman */}
      <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-4 md:px-6 sticky top-0 z-40">

        {/* Kiri */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 lg:hidden"
          >
            <Menu size={20} />
          </button>
          <div>
            <h1 className="text-base font-semibold text-slate-800 leading-tight">{title}</h1>
            {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
          </div>
        </div>

        {/* Kanan */}
        <div className="flex items-center gap-1">

          {/* Notifikasi */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false) }}
              className="relative p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>

            {notifOpen && (
              <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden z-50">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-700">Notifikasi</span>
                    {unreadCount > 0 && (
                      <span className="bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full leading-none">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button onClick={markAllRead} className="text-xs text-primary-600 hover:underline flex items-center gap-1">
                      <Check size={12} />
                      Tandai semua
                    </button>
                  )}
                </div>

                {/* List */}
                <div className="max-h-72 overflow-y-auto">
                  {notifs.length === 0 ? (
                    <div className="py-10 text-center">
                      <Bell size={24} className="text-slate-300 mx-auto mb-2" />
                      <p className="text-sm text-slate-400">Tidak ada notifikasi</p>
                    </div>
                  ) : (
                    notifs.map(notif => (
                      <div
                        key={notif.id}
                        onClick={() => markRead(notif.id)}
                        className={classNames(
                          'flex gap-3 px-4 py-3 border-b border-slate-50 cursor-pointer',
                          'hover:bg-slate-50 transition-colors',
                          !notif.read && 'bg-primary-50/50'
                        )}
                      >
                        <div className={classNames(
                          'w-2 h-2 rounded-full mt-1.5 flex-shrink-0',
                          !notif.read ? 'bg-primary-500' : 'bg-transparent'
                        )} />
                        <div className="flex-1 min-w-0">
                          <p className={classNames(
                            'text-xs leading-relaxed',
                            !notif.read ? 'font-medium text-slate-700' : 'text-slate-500'
                          )}>
                            {notif.message}
                          </p>
                          <p className="text-xs text-slate-400 mt-0.5">{formatTime(notif.time)}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Avatar & Profile dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false) }}
              className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <div className="w-8 h-8 rounded-xl bg-primary-600 flex items-center justify-center overflow-hidden shrink-0">
                {user?.profile_image ? (
                  <img src={user.profile_image} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white text-xs font-bold">{initials}</span>
                )}
              </div>
              <ChevronDown
                size={14}
                className={classNames(
                  'text-slate-400 transition-transform duration-200',
                  profileOpen && 'rotate-180'
                )}
              />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-12 w-44 bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden z-50">
                <button
                  onClick={() => { navigate(ROUTES.PROFILE); setProfileOpen(false) }}
                  className="flex items-center gap-2.5 w-full px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  <User size={15} className="text-slate-400" />
                  Profil
                </button>
                <div className="h-px bg-slate-100" />
                <button
                  onClick={() => { setShowLogout(true); setProfileOpen(false) }}
                  className="flex items-center gap-2.5 w-full px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={15} />
                  Keluar
                </button>
              </div>
            )}
          </div>

        </div>
      </header>

      {/* REVISI DI SINI: Mengubah modal logout z-50 ke z-[100] atau tetap z-50 namun berada di luar posisi hierarki header */}
      {showLogout && (
        <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
              <LogOut size={24} className="text-red-500" />
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-1">Keluar dari BURNIVA?</h3>
            <p className="text-sm text-slate-500 mb-6">Kamu perlu masuk lagi untuk mengakses aplikasi.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogout(false)}
                className="flex-1 h-10 rounded-xl border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 h-10 rounded-xl bg-red-500 text-sm text-white font-medium hover:bg-red-600 transition-colors"
              >
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Topbar