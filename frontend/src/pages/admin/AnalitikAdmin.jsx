import React, { useState, useEffect } from 'react'
import FilterGlobal from '../../components/admin/analitik/FilterGlobal'
import DistribusiBurnoutChart from '../../components/admin/analitik/DistribusiBurnoutChart'
import TrenBurnoutChart from '../../components/admin/analitik/TrenBurnoutChart'
import SemesterBurnoutChart from '../../components/admin/analitik/SemesterBurnoutChart'
import TidurBurnoutChart from '../../components/admin/analitik/TidurBurnoutChart'
import PertumbuhanPenggunaChart from '../../components/admin/analitik/PertumbuhanPenggunaChart'
import adminService from '../../services/admin/adminService'

function AnalitikAdmin() {
    const [selectedPeriod, setSelectedPeriod] = useState('Semua Periode')
    const [selectedUniv, setSelectedUniv] = useState('')
    const [selectedProdi, setSelectedProdi] = useState('')
    const [analytics, setAnalytics] = useState(null)
    const [filterOptions, setFilterOptions] = useState({ universities: [], majors: [] })

    const fetchAnalytics = async (period = selectedPeriod, univ = selectedUniv, prodi = selectedProdi) => {
        try {
            const data = await adminService.getAnalyticsData(period, univ, prodi)
            setAnalytics(data)
        } catch (error) {
            console.error("Gagal mengambil data analitik", error)
        }
    }

    const fetchOptions = async () => {
        try {
            const data = await adminService.getFilterOptions()
            setFilterOptions(data)
        } catch (error) {
            console.error("Gagal mengambil opsi filter", error)
        }
    }

    useEffect(() => {
        fetchAnalytics()
        fetchOptions()
    }, [])

    const handleApplyFilter = (period, univ, prodi) => {
        fetchAnalytics(period, univ, prodi)
    }

    return (
        <div className="p-4 md:p-8 max-w-[1400px] mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
            {/* Filter Global */}
            <FilterGlobal 
                selectedPeriod={selectedPeriod}
                setSelectedPeriod={setSelectedPeriod}
                selectedUniv={selectedUniv}
                setSelectedUniv={setSelectedUniv}
                selectedProdi={selectedProdi}
                setSelectedProdi={setSelectedProdi}
                univOptions={filterOptions.universities}
                prodiOptions={filterOptions.majors}
                onApply={handleApplyFilter}
            />

            {/* Baris Pertama: Distribusi & Tren */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DistribusiBurnoutChart distributionData={analytics?.distributionData || []} />
                <TrenBurnoutChart trendData={analytics?.trendData || []} />
            </div>

            {/* Baris Kedua: Semester & Korelasi Tidur */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SemesterBurnoutChart semesterData={analytics?.semesterData || []} />
                <TidurBurnoutChart sleepData={analytics?.sleepCorrelationData || []} />
            </div>

            {/* Baris Ketiga: Pertumbuhan Pengguna */}
            <div className="w-full">
                <PertumbuhanPenggunaChart growthData={analytics?.userGrowthData || []} />
            </div>
        </div>
    )
}

export default AnalitikAdmin
