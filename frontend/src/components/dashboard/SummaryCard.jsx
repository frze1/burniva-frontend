function SummaryCard({ icon, label, value, iconBg = 'bg-slate-100' }) {
  return (
    <div className="bg-white rounded-2xl p-4 md:p-6 border-[0.67px] border-gray-100 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.10)] relative overflow-hidden flex flex-col gap-3 md:gap-4">
      
      {/* Icon decorative background blur */}
      <div className="absolute -top-2 left-[50%] w-24 h-24 bg-current opacity-[0.03] rounded-full blur-xl pointer-events-none" />

      {/* Di HP: Ikon di atas, teks di bawahnya (flex-col). Di PC: Sejajar (sm:flex-row) */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 relative z-10">
        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl flex flex-shrink-0 items-center justify-center ${iconBg}`}>
          {icon}
        </div>
        <span className="text-xs md:text-sm text-gray-500 font-medium leading-tight">{label}</span>
      </div>
      
      <p className="text-xl md:text-2xl font-semibold text-slate-800 relative z-10">{value}</p>
    </div>
  )
}

export default SummaryCard