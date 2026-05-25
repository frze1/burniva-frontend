import React, { useState } from 'react'
import FilterGlobal from '../../components/admin/analitik/FilterGlobal'
import DistribusiBurnoutChart from '../../components/admin/analitik/DistribusiBurnoutChart'
import TrenBurnoutChart from '../../components/admin/analitik/TrenBurnoutChart'
import SemesterBurnoutChart from '../../components/admin/analitik/SemesterBurnoutChart'
import TidurBurnoutChart from '../../components/admin/analitik/TidurBurnoutChart'
import PertumbuhanPenggunaChart from '../../components/admin/analitik/PertumbuhanPenggunaChart'

function AnalitikAdmin() {
    const [selectedPeriod, setSelectedPeriod] = useState('Semua Periode')
    const [selectedUniv, setSelectedUniv] = useState('')
    const [selectedProdi, setSelectedProdi] = useState('')

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
            />

            {/* Baris Pertama: Distribusi & Tren */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DistribusiBurnoutChart />
                <TrenBurnoutChart />
            </div>

            {/* Baris Kedua: Semester & Korelasi Tidur */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SemesterBurnoutChart />
                <TidurBurnoutChart />
            </div>

            {/* Baris Ketiga: Pertumbuhan Pengguna */}
            <div className="w-full">
                <PertumbuhanPenggunaChart />
            </div>
        </div>
    )
}

export default AnalitikAdmin
