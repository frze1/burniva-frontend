import React, { useState, useEffect, useMemo } from 'react'
import MonitoringStats from '../../components/admin/monitoring/MonitoringStats'
import MonitoringTable from '../../components/admin/monitoring/MonitoringTable'
import adminService from '../../services/admin/adminService'

function MonitoringAdmin() {
    const [activePeriod, setActivePeriod] = useState('mingguan')
    const [activeData, setActiveData] = useState([])

    useEffect(() => {
        const fetchMonitoringData = async () => {
            try {
                const data = await adminService.getMonitoringData(activePeriod)
                setActiveData(data)
            } catch (error) {
                console.error("Gagal mengambil data monitoring", error)
            }
        }
        fetchMonitoringData()
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
