import React, { useState, useMemo } from 'react'
import MonitoringStats from '../../components/admin/monitoring/MonitoringStats'
import MonitoringTable from '../../components/admin/monitoring/MonitoringTable'

// --- DATASET PERIODE ---
const DATA_TODAY = [
    { id: 1, name: 'Naufal Pratama', score: 78, risk: 'Tinggi', date: '2026-05-21' },
    { id: 2, name: 'Rizky Maulana', score: 22, risk: 'Rendah', date: '2026-05-21' },
    { id: 3, name: 'Bagas Saputra', score: 30, risk: 'Rendah', date: '2026-05-21' }
]

const DATA_WEEKLY = [
    { id: 1, name: 'Naufal Pratama', score: 78, risk: 'Tinggi', date: '2026-05-19' },
    { id: 2, name: 'Aisyah Putri', score: 45, risk: 'Sedang', date: '2026-05-18' },
    { id: 3, name: 'Rizky Maulana', score: 22, risk: 'Rendah', date: '2026-05-19' },
    { id: 4, name: 'Putri Anjani', score: 64, risk: 'Sedang', date: '2026-05-15' },
    { id: 5, name: 'Dewi Lestari', score: 81, risk: 'Tinggi', date: '2026-05-17' },
    { id: 6, name: 'Bagas Saputra', score: 30, risk: 'Rendah', date: '2026-05-19' },
    { id: 7, name: 'Sari Widya', score: 55, risk: 'Sedang', date: '2026-05-18' },
    { id: 8, name: 'Fajar Nugroho', score: 18, risk: 'Rendah', date: '2026-05-16' }
]

const DATA_MONTHLY = [
    { id: 1, name: 'Naufal Pratama', score: 78, risk: 'Tinggi', date: '2026-05-19' },
    { id: 2, name: 'Aisyah Putri', score: 45, risk: 'Sedang', date: '2026-05-18' },
    { id: 3, name: 'Rizky Maulana', score: 22, risk: 'Rendah', date: '2026-05-19' },
    { id: 4, name: 'Putri Anjani', score: 64, risk: 'Sedang', date: '2026-05-15' },
    { id: 5, name: 'Dewi Lestari', score: 81, risk: 'Tinggi', date: '2026-05-17' },
    { id: 6, name: 'Bagas Saputra', score: 30, risk: 'Rendah', date: '2026-05-19' },
    { id: 7, name: 'Sari Widya', score: 55, risk: 'Sedang', date: '2026-05-18' },
    { id: 8, name: 'Fajar Nugroho', score: 18, risk: 'Rendah', date: '2026-05-16' },
    { id: 9, name: 'Dika Ramadhan', score: 58, risk: 'Sedang', date: '2026-05-10' },
    { id: 10, name: 'Siti Aminah', score: 15, risk: 'Rendah', date: '2026-05-08' },
    { id: 11, name: 'Hendra Wijaya', score: 89, risk: 'Tinggi', date: '2026-05-05' },
    { id: 12, name: 'Clara Shinta', score: 62, risk: 'Sedang', date: '2026-05-03' },
    { id: 13, name: 'Budi Santoso', score: 40, risk: 'Sedang', date: '2026-05-01' },
    { id: 14, name: 'Linda Permata', score: 73, risk: 'Tinggi', date: '2026-04-28' },
    { id: 15, name: 'Rian Hidayat', score: 25, risk: 'Rendah', date: '2026-04-25' }
]

function MonitoringAdmin() {
    // State untuk periode filter (default 'mingguan' sesuai mockup gambar)
    const [activePeriod, setActivePeriod] = useState('mingguan')

    // Dapatkan data yang sesuai dengan periode aktif
    const activeData = useMemo(() => {
        switch (activePeriod) {
            case 'hari_ini':
                return DATA_TODAY
            case 'mingguan':
                return DATA_WEEKLY
            case 'bulanan':
                return DATA_MONTHLY
            default:
                return []
        }
    }, [activePeriod])

    // Hitung jumlah statistik secara dinamis berdasarkan data aktif
    const stats = useMemo(() => {
        return activeData.reduce((acc, curr) => {
            if (curr.risk === 'Tinggi') acc.tinggi++
            else if (curr.risk === 'Sedang') acc.sedang++
            else if (curr.risk === 'Rendah') acc.rendah++
            return acc
        }, { tinggi: 0, sedang: 0, rendah: 0 })
    }, [activeData])

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-300">
            {/* Kartu Statistik Burnout */}
            <MonitoringStats 
                tinggiCount={stats.tinggi} 
                sedangCount={stats.sedang} 
                rendahCount={stats.rendah} 
            />

            {/* Tabel Monitoring Burnout */}
            <MonitoringTable 
                data={activeData} 
                activePeriod={activePeriod} 
                onPeriodChange={setActivePeriod} 
            />
        </div>
    )
}

export default MonitoringAdmin
