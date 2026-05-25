import { useState, useMemo } from 'react'
import PenggunaFilters from '../../components/admin/pengguna/PenggunaFilters'
import PenggunaTable from '../../components/admin/pengguna/PenggunaTable'
import PenggunaPagination from '../../components/admin/pengguna/PenggunaPagination'
import PrivacyBanner from '../../components/admin/pengguna/PrivacyBanner'
import UserDetailModal from '../../components/admin/pengguna/UserDetailModal'

// --- DATA DUMMY ---
const DUMMY_USERS = [
    { id: 1, name: 'Naufal Pratama', email: 'naufal@kampus.ac.id', univ: 'Universitas Indonesia', prodi: 'Ilmu Komputer', semester: 6, lastBurnout: 78, risk: 'Tinggi', isSuspended: false },
    { id: 2, name: 'Aisyah Putri', email: 'aisyah@kampus.ac.id', univ: 'ITB', prodi: 'Teknik Informatika', semester: 4, lastBurnout: 45, risk: 'Sedang', isSuspended: false },
    { id: 3, name: 'Rizky Maulana', email: 'rizky@kampus.ac.id', univ: 'UGM', prodi: 'Sistem Informasi', semester: 8, lastBurnout: 22, risk: 'Rendah', isSuspended: true },
    { id: 4, name: 'Putri Anjani', email: 'putri@kampus.ac.id', univ: 'Universitas Padjadjaran', prodi: 'Psikologi', semester: 2, lastBurnout: 64, risk: 'Sedang', isSuspended: false },
    { id: 5, name: 'Dewi Lestari', email: 'dewi@kampus.ac.id', univ: 'UI', prodi: 'Akuntansi', semester: 5, lastBurnout: 81, risk: 'Tinggi', isSuspended: false },
    { id: 6, name: 'Bagas Saputra', email: 'bagas@kampus.ac.id', univ: 'ITS', prodi: 'Teknik Mesin', semester: 3, lastBurnout: 30, risk: 'Rendah', isSuspended: false },
    { id: 7, name: 'Dika Ramadhan', email: 'dika@kampus.ac.id', univ: 'UGM', prodi: 'Manajemen', semester: 7, lastBurnout: 55, risk: 'Sedang', isSuspended: false },
    { id: 8, name: 'Siti Aminah', email: 'siti@kampus.ac.id', univ: 'ITB', prodi: 'Teknik Elektro', semester: 1, lastBurnout: 15, risk: 'Rendah', isSuspended: false },
];

function PenggunaAdmin() {
    const [users, setUsers] = useState(DUMMY_USERS)

    // States untuk filter & pencarian
    const [searchTerm, setSearchTerm] = useState('')
    const [filterUniv, setFilterUniv] = useState('')
    const [filterRisk, setFilterRisk] = useState('')

    // State detail user modal
    const [selectedUser, setSelectedUser] = useState(null)

    // States untuk pagination
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 6 // Diubah menjadi 6 agar pas dengan mockup "Menampilkan 6 dari 8 pengguna"

    // Fungsi suspend user
    const toggleSuspend = (id) => {
        setUsers(users.map(user =>
            user.id === id ? { ...user, isSuspended: !user.isSuspended } : user
        ))
        // Update selectedUser state if it is currently being viewed
        setSelectedUser(prev => prev && prev.id === id ? { ...prev, isSuspended: !prev.isSuspended } : prev)
    }

    // Fungsi hapus user
    const deleteUser = (id) => {
        if (window.confirm('Yakin ingin menghapus pengguna ini?')) {
            setUsers(users.filter(user => user.id !== id))
            // Reset ke halaman 1 jika menghapus data
            setCurrentPage(1)
            if (selectedUser && selectedUser.id === id) {
                setSelectedUser(null)
            }
        }
    }

    // Menghitung data yang sudah difilter
    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            const matchSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
            const matchUniv = filterUniv ? user.univ === filterUniv : true
            const matchRisk = filterRisk ? user.risk === filterRisk : true

            return matchSearch && matchUniv && matchRisk
        })
    }, [users, searchTerm, filterUniv, filterRisk])

    // Memotong data sesuai pagination
    const paginatedUsers = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage
        return filteredUsers.slice(startIndex, startIndex + itemsPerPage)
    }, [filteredUsers, currentPage, itemsPerPage])

    // Reset pagination ketika filter berubah
    useMemo(() => {
        setCurrentPage(1)
    }, [searchTerm, filterUniv, filterRisk])


    return (
        <div className="p-4 md:p-8 max-w-[1400px] mx-auto space-y-6">

            {/* KONTEN UTAMA */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">

                {/* Top Controls: Search & Filters */}
                <PenggunaFilters
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    filterUniv={filterUniv}
                    setFilterUniv={setFilterUniv}
                    filterRisk={filterRisk}
                    setFilterRisk={setFilterRisk}
                />

                {/* Tabel Data */}
                <PenggunaTable
                    users={paginatedUsers}
                    toggleSuspend={toggleSuspend}
                    deleteUser={deleteUser}
                    onViewDetail={setSelectedUser}
                />

                {/* Pagination Footer */}
                <PenggunaPagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalItems={filteredUsers.length}
                    itemsPerPage={itemsPerPage}
                />

            </div>

            {/* Info Privacy Banner */}
            <PrivacyBanner />

            {/* Modal Detail Pengguna */}
            {selectedUser && (
                <UserDetailModal
                    user={selectedUser}
                    onClose={() => setSelectedUser(null)}
                    onToggleSuspend={toggleSuspend}
                    onDelete={deleteUser}
                />
            )}

        </div>
    )
}

export default PenggunaAdmin