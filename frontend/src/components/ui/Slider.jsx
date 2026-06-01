import React from 'react'

function Slider({ label, hint, value, onChange, min = 1, max = 10, minLabel = "Rendah", maxLabel = "Tinggi" }) {
  // Hitung persentase untuk background gradient track
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="w-full bg-white rounded-2xl p-4 md:p-5 border-[0.67px] border-gray-200 flex flex-col gap-4 md:gap-5">

      {/* Header: Label & Value Box */}
      <div className="flex justify-between items-start gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm md:text-base font-medium text-gray-900">{label}</h3>
          {hint && <p className="text-xs md:text-sm text-gray-500">{hint}</p>}
        </div>

        {/* Value Box (Kotak Biru) */}
        <div className="w-12 h-9 md:w-16 md:h-10 bg-primary-50 rounded-[10px] border-[0.67px] border-primary-100 flex items-center justify-center flex-shrink-0">
          <span className="text-sm md:text-xl font-medium text-primary-500">{value}</span>
        </div>
      </div>

      {/* Slider Track Area */}
      <div className="flex flex-col gap-3 md:gap-4 pt-1 md:pt-2">
        {/* Input Range Native yang di-styling */}
        <input
          type="range"
          min={min}
          max={max}
          step="1"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-1.5 appearance-none rounded-full outline-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #006d5b 0%, #006d5b ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`
          }}
        />

        {/* Label Bawah (Min, Max) */}
        <div className="flex justify-between items-center w-full pt-1">
          <span className="text-[11px] md:text-sm font-medium text-gray-500">{min} - {minLabel}</span>
          <span className="text-[11px] md:text-sm font-medium text-gray-500">{max} - {maxLabel}</span>
        </div>
      </div>

    </div>
  )
}

export default Slider