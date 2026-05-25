import React from 'react'

function FilterGlobal({ 
    selectedPeriod = 'Semua Periode', 
    setSelectedPeriod, 
    selectedUniv = '', 
    setSelectedUniv, 
    selectedProdi = '', 
    setSelectedProdi 
}) {
    return (
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Filter Global</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Filter Tanggal */}
                <div className="relative">
                    <select 
                        value={selectedPeriod}
                        onChange={(e) => setSelectedPeriod && setSelectedPeriod(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 appearance-none cursor-pointer"
                    >
                        <option value="01 Mei - 20 Mei 2026">01 Mei - 20 Mei 2026</option>
                        <option value="21 Mei - 31 Mei 2026">21 Mei - 31 Mei 2026</option>
                        <option value="Semua Periode">Semua Periode</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>

                {/* Filter Universitas */}
                <div className="relative">
                    <select 
                        value={selectedUniv}
                        onChange={(e) => setSelectedUniv && setSelectedUniv(e.target.value)}
                        className={`w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 appearance-none cursor-pointer ${selectedUniv ? 'text-slate-700' : 'text-slate-400'}`}
                    >
                        <option value="">Pilih Universitas</option>
                        <option value="ui">Universitas Indonesia</option>
                        <option value="itb">Institut Teknologi Bandung</option>
                        <option value="ugm">Universitas Gadjah Mada</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>

                {/* Filter Program Studi */}
                <div className="relative">
                    <select 
                        value={selectedProdi}
                        onChange={(e) => setSelectedProdi && setSelectedProdi(e.target.value)}
                        className={`w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 appearance-none cursor-pointer ${selectedProdi ? 'text-slate-700' : 'text-slate-400'}`}
                    >
                        <option value="">Pilih Program Studi</option>
                        <option value="ilkom">Ilmu Komputer</option>
                        <option value="te">Teknik Elektro</option>
                        <option value="si">Sistem Informasi</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterGlobal
