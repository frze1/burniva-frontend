import React from 'react';

function FactorBreakdown({ factors }) {
  return (
    <div className="bg-white rounded-2xl border-[0.67px] border-gray-200 p-4 md:p-6 shadow-sm flex flex-col h-full">
      <div className="mb-4 md:mb-6">
        <h3 className="text-lg font-medium text-neutral-950 leading-7 mb-1">Visualisasi Faktor</h3>
        <p className="text-sm text-gray-500">Faktor utama yang memengaruhi skor</p>
      </div>

      <div className="flex flex-col gap-4 md:gap-5 justify-center flex-1">
        {factors.map((f, idx) => {
          // Mapping warna custom (tailwind style)
          const bgColor = f.color === 'danger' ? 'bg-red-500' : f.color === 'warning' ? 'bg-amber-500' : 'bg-indigo-500';
          
          return (
            <div key={idx} className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-sm md:text-base text-gray-700">{f.label}</span>
                <span className="text-xs md:text-sm text-gray-500">{f.level}</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${bgColor} transition-all duration-1000`} 
                  style={{ width: `${f.value}%` }} 
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FactorBreakdown;