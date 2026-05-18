import React from 'react'

function Slider({ label, hint, value, onChange, min = 1, max = 10, minLabel = "Rendah", maxLabel = "Tinggi" }) {
  // Hitung persentase untuk background gradient track
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="w-full bg-white rounded-2xl p-5 border-[0.67px] border-gray-200 flex flex-col gap-5">
      
      {/* Header: Label & Value Box */}
      <div className="flex justify-between items-start gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-medium text-gray-900">{label}</h3>
          {hint && <p className="text-sm text-gray-500">{hint}</p>}
        </div>
        
        {/* Value Box (Kotak Biru) */}
        <div className="w-16 h-10 bg-blue-50 rounded-[10px] border-[0.67px] border-blue-100 flex items-center justify-center flex-shrink-0">
          <span className="text-xl font-medium text-blue-800">{value}</span>
        </div>
      </div>

      {/* Slider Track Area */}
      <div className="flex flex-col gap-4 pt-2">
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
            background: `linear-gradient(to right, #1e40af 0%, #1e40af ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`
          }}
        />
        
        {/* Label Bawah (Min, Mid, Max) */}
        <div className="flex justify-between items-center w-full">
          <div className="bg-gray-50 rounded-lg border-[0.67px] border-gray-200 px-3 py-1">
            <span className="text-xs text-gray-500">{min} · {minLabel}</span>
          </div>
          <span className="text-xs text-gray-400">{Math.round((max + min) / 2)}</span>
          <div className="bg-gray-50 rounded-lg border-[0.67px] border-gray-200 px-3 py-1">
            <span className="text-xs text-gray-500">{max} · {maxLabel}</span>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Slider