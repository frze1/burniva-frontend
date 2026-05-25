import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'
import AdminTopbar from './AdminTopbar'

// Kamu bisa menyesuaikan meta page admin di sini
const adminPageMeta = {
    '/admin/dashboard': { title: 'Admin Dashboard', subtitle: 'Ringkasan sistem dan metrik utama' },
    '/admin/pengguna': { title: 'Kelola Pengguna', subtitle: 'Manajemen data pengguna terdaftar' },
    '/admin/monitoring': { title: 'Monitoring Burnout', subtitle: 'Pantau status mental seluruh pengguna' },
    '/admin/analitik': { title: 'Analitik', subtitle: 'Statistik dan insight sistem' },
    '/admin/profil': { title: 'Profil Admin', subtitle: 'Pengaturan akun admin kamu' },
}

function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const location = useLocation()

    // Mencari meta berdasarkan path saat ini
    const meta = adminPageMeta[location.pathname] || { title: 'BURNIVA Admin', subtitle: '' }

    // PENGAMAN TAMBAHAN: Memaksa area main langsung reset scroll ke koordinat 0 setiap pindah menu
    useEffect(() => {
        const mainElement = document.getElementById('admin-main-content');
        if (mainElement) {
            mainElement.scrollTop = 0;
        }
    }, [location.pathname]);

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">
            {/* Sidebar Admin */}
            <AdminSidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* Area Utama */}
            <div className="flex-1 flex flex-col overflow-hidden min-w-0">
                {/* Topbar Admin */}
                <AdminTopbar
                    onToggleSidebar={() => setSidebarOpen(prev => !prev)}
                    title={meta.title}
                    subtitle={meta.subtitle}
                />

                {/* Konten Utama Admin */}
                <main id="admin-main-content" className="flex-1 overflow-y-auto pb-10 lg:pb-0">
                    <Outlet />
                </main>
            </div>

            {/* Catatan: Admin biasanya tidak pakai BottomNav di mobile, tapi jika butuh bisa ditambahkan */}
        </div>
    )
}

export default AdminLayout
