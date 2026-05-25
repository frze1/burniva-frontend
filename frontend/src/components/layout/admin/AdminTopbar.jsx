import { useState, useRef, useEffect } from 'react'
import { Menu, User, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { classNames, getInitials } from '../../../utils/helpers'
import useAuthStore from '../../../store/auth/useAuthStore'

function AdminTopbar({ onToggleSidebar, title, subtitle }) {
    const navigate = useNavigate()
    const [profileOpen, setProfileOpen] = useState(false)
    const [showLogout, setShowLogout] = useState(false)

    const profileRef = useRef(null)

    const user = useAuthStore(s => s.user)
    // Menampilkan inisial 'A' sebagai default jika belum ada data nama (sesuai gambar)
    const initials = getInitials(user?.name || 'A')

    // Tutup dropdown profile kalau klik di luar
    useEffect(() => {
        const handler = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false)
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    const handleLogout = () => {
        useAuthStore.getState().clearAuth()
        navigate('/login') // Sesuaikan rute login
    }

    return (
        <>
            <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-4 md:px-6 sticky top-0 z-40">

                {/* Kiri: Menu Mobile & Titles */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={onToggleSidebar}
                        className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 lg:hidden"
                    >
                        <Menu size={24} />
                    </button>
                    <div className="flex flex-col justify-center">
                        <h1 className="text-base font-semibold text-slate-800 leading-tight">{title}</h1>
                        {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
                    </div>
                </div>

                {/* Kanan: Icons Sesuai Referensi */}
                <div className="flex items-center gap-4">

                    {/* Icon Profil (Kotak Biru dengan Inisial) */}
                    <div className="relative" ref={profileRef}>
                        <button
                            onClick={() => { setProfileOpen(!profileOpen) }}
                            className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#1e5eb0] hover:bg-blue-800 transition-colors overflow-hidden shrink-0"
                        >
                            {user?.profile_image ? (
                                <img src={user.profile_image} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-white text-xs font-bold tracking-wide">{initials}</span>
                            )}
                        </button>

                        {/* Dropdown Profil */}
                        {profileOpen && (
                            <div className="absolute right-0 top-14 w-44 bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden z-50">
                                <button
                                    onClick={() => { navigate('/admin/profil'); setProfileOpen(false) }}
                                    className="flex items-center gap-2.5 w-full px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                                >
                                    <User size={15} className="text-slate-400" />
                                    Profil Admin
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

            {/* Modal Logout */}
            {showLogout && (
                <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
                        <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
                            <LogOut size={24} className="text-red-500" />
                        </div>
                        <h3 className="text-base font-bold text-slate-800 mb-1">Keluar dari Admin?</h3>
                        <p className="text-sm text-slate-500 mb-6">Kamu perlu masuk lagi untuk mengakses panel admin.</p>
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

export default AdminTopbar